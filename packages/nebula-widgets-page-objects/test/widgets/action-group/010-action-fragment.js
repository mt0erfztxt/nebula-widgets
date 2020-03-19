import expect from 'unexpected';
import { camelCase } from 'change-case';

import Action from '../../../../../src/js/widgets/action-group/action';
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
 * @returns {Promise<Action>}
 */
async function getSut(parent) {
  const sut = new Action({ idx: 0 }, {
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

fixture('Widgets :: Action Group :: 010 Action Fragment')
  .page('http://localhost:3449/widgets/action-group-action');

test("010 It should allow obtain action", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new Action({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow assert that action has specified icon using 'expectIconIs()'", async () => {
  const { knob, sut } = await getHelperFragments('icon');
  await knob.clickItem({ value: 'yes' });

  // -- Successful case

  await sut.expectIconIs('pencil');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectIconIs('mouse');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.action-group\.action's icon is not 'mouse'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow assert that action has specified text using 'expectTextIs()'", async () => {
  const { knob, sut } = await getHelperFragments('text');

  // -- Successful case

  await knob.clickItem({ value: 'Title case' });
  await sut.expectTextIs('Action');

  await knob.clickItem({ value: 'Upper case' });
  await sut.expectTextIs('ACTION');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectTextIs('Action');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.action-group\.action.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
