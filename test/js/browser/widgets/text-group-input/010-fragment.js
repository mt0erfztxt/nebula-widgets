import expect from 'unexpected';
import { camelCase } from 'change-case';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import TextGroupInput from '../../../../../src/js/widgets/text-group-input';

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
 * @returns {Promise<TextGroupInput>}
 */
async function getSut(parent) {
  const sut = new TextGroupInput({ idx: 0 }, {
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

fixture('Widgets :: Text Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/text-group-input');

test("010 It should allow obtain text group input", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new TextGroupInput({ idx: 0 }, { parent });
  expect(sut, 'to be a', TextGroupInput);
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow get group's 'MultiLine' part of state using '#getMultiLinePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-line');

  // -- Check when not multi line

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getMultiLinePartOfState(), 'to be false');

  // -- Check when multi line

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getMultiLinePartOfState(), 'to be true');
});

test("030 It should allow assert on whether group is multi line using '#expectIsMultiLine()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-line');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsMultiLine();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsMultiLine();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .*\.text-group-input.+must have BEM modifier 'multiLine,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether group isn't multi line using '#expectIsNotMultiLine()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-line');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectIsNotMultiLine();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotMultiLine();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .*\.text-group-input.+must not have BEM modifier 'multiLine,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
