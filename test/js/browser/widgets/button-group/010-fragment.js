import expect from 'unexpected';
import { camelCase } from 'change-case';

import Button from '../../../../../src/js/widgets/button';
import ButtonGroup from '../../../../../src/js/widgets/button-group';
import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

/**
 * @returns {Promise<InteractiveExample>}
 */
async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

/**
 * @returns {Promise<CheckableGroupInput>}
 */
async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput({ cid }, { parent });
  await knob.expectIsExist();
  return knob;
}

/**
 * @returns {Promise<ButtonGroup>}
 */
async function getSut(parent) {
  const sut = new ButtonGroup({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

/**
 * @returns {Promise<Object>}
 */
async function getHelperFragments(...knobCids) {
  const ie = await getInteractiveExample();
  const result = { ie };

  for (const knobCid of knobCids) {
    result[`${camelCase(knobCid)}Knob`] = await getKnob(knobCid, ie);
  }

  result.knob = result[`${camelCase(knobCids[0])}Knob`];
  result.sut = await getSut(ie.viewElementSelector);

  return result;
}

fixture('Widgets :: Button Group :: 010 Fragment')
  .page('http://localhost:3449/widgets/button-group');

test("010 It should allow obtain button group", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new ButtonGroup({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain button group - case of custom 'alignment' selector transformation", async () => {
  const { ie, knob } = await getHelperFragments('alignment');
  const parent = ie.viewElementSelector;

  // -- Successful case

  await knob.clickItem({ value: 'left' });
  const btnGroup = new ButtonGroup({ alignment: 'left' }, { parent });
  await btnGroup.expectIsExist();
  await btnGroup.hover();

  // -- Failing case

  let isThrown = false;

  try {
    await (new ButtonGroup({ alignment: 'right' }, { parent })).expectIsExist();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /^AssertionError:.+button-group.+expected 0 to deeply equal 1$/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow obtain button using '#getButton()'", async (t) => {
  const sut = await getSut();
  const button = sut.getButton({ idx: 1 });
  expect(button, 'to be a', Button);
  await button.expectIsExist();
  await button.hover();
  await t
    .expect(button.selector.textContent)
    .eql('Button1')
});
