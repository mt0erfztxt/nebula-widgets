import expect from 'unexpected';
import { camelCase } from 'change-case';

import Button from '../../../../../src/js/widgets/button';
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
 * @returns {Promise<CheckableGroupInput>}
 */
async function getSut(parent) {
  const sut = new Button({ idx: 0 }, {
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

fixture('Widgets :: Button :: 010 Fragment')
  .page('http://localhost:3449/widgets/button');

test("010 It should allow obtain button", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new Button({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain button - case of custom 'text' spec", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;

  // -- Successful case

  const btn = new Button({ text: 'BUTTON' }, { parent });
  await btn.expectIsExist();
  await btn.hover();

  // -- Failing case

  let isThrown = false;

  try {
    await (new Button({ text: /button/ }, { parent })).expectIsExist();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /^AssertionError:.+expected 0 to deeply equal 1$/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow get input's 'Kind' part of state using '#getKindPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('kind');

  // -- Check when normal

  await knob.clickItem({ value: 'normal' });
  await sut.hover();
  expect(await sut.getKindPartOfState(), 'to equal', 'normal');

  // -- Check when secondary

  await knob.clickItem({ value: 'secondary' });
  await sut.hover();
  expect(await sut.getKindPartOfState(), 'to equal', 'secondary');
});

test("040 It should allow assert on input's 'Kind' part of state using '#expectKindPartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('kind');

  // -- Successful case

  await knob.clickItem({ value: 'normal' });
  await sut.hover();
  await sut.expectKindPartOfStateIs('normal');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectKindPartOfStateIs('flat');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must have BEM modifier 'kind,flat'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on input's 'Kind' part of state using '#expectKindPartOfStateIs()' - with 'isNot' option set", async () => {
  const { knob, sut } = await getHelperFragments('kind');

  // -- Successful case

  await knob.clickItem({ value: 'secondary' });
  await sut.hover();
  await sut.expectKindPartOfStateIs('primary', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectKindPartOfStateIs('secondary', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must not have BEM modifier 'kind,secondary'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
