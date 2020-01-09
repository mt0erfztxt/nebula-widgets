/**
 * Input fragment doesn't represent concrete widget and used to aggregate
 * common functionality of fragments for concrete input widgets, and because
 * of that it tested using checkable input fragment.
 */

import expect from 'unexpected';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import CheckableInput from '../../../../../src/js/widgets/checkable-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput({ cid }, { parent });
  await knob.expectIsExist();
  return knob;
}

async function getSut(parent) {
  const sut = new CheckableInput({ idx: 0 }, { parent });
  await sut.expectIsExist();
  return sut;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    sut: await getSut(parent.viewElementSelector)
  };
}

fixture('Widgets :: Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/checkable-input');

test("010 It should allow get input's 'Disabled' part of state using '#getDisabledPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Check when enabled

  await sut.hover();
  expect(await sut.getDisabledPartOfState(), 'to be false');

  // -- Check when disabled

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getDisabledPartOfState(), 'to be true');
});

test("020 It should allow assert on whether input is disabled using '#expectIsDisabled()'", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsDisabled();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow assert on whether input isn't disabled using '#expectIsNotDisabled()'", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotDisabled();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether input is enabled using '#expectIsEnabled()'", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Successful case

  await sut.hover();
  await sut.expectIsEnabled();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on whether input isn't enabled using '#expectIsNotEnabled()'", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsNotEnabled();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("060 It should allow get input's 'Invalid' part of state using '#getInvalidPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('invalid');

  // -- Check when valid

  await sut.hover();
  expect(await sut.getInvalidPartOfState(), 'to be false');

  // -- Check when invalid

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getInvalidPartOfState(), 'to be true');
});

test("070 It should allow assert on whether input is invalid using '#expectIsInvalid()'", async () => {
  const { knob, sut } = await getHelperFragments('invalid');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsInvalid();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsInvalid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'invalid,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on whether input isn't invalid using '#expectIsNotInvalid()'", async () => {
  const { knob, sut } = await getHelperFragments('invalid');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotInvalid();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotInvalid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'invalid,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("090 It should allow assert on whether input is valid using '#expectIsValid()'", async () => {
  const { knob, sut } = await getHelperFragments('invalid');

  // -- Successful case

  await sut.hover();
  await sut.expectIsValid();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsValid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'invalid,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on whether input isn't valid using '#expectIsNotValid()'", async () => {
  const { knob, sut } = await getHelperFragments('invalid');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsNotValid();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotValid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'invalid,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow get input's 'Size' part of state using '#getSizePartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();
  expect(await sut.getSizePartOfState(), 'to equal', 'normal');
});

test("120 It should allow assert on input's 'Size' part of state using '#expectSizePartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('size');

  // -- Successful case

  await sut.hover();
  await sut.expectSizePartOfStateIs('normal');

  await knob.clickItem({ value: 'small' });
  await sut.hover();
  await sut.expectSizePartOfStateIs('small');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectSizePartOfStateIs('large');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'size,large'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow assert on input's 'Size' part of state using '#expectSizePartOfStateIs()' - with 'isNot' option set", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectSizePartOfStateIs('small', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectSizePartOfStateIs('normal', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'size,normal'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow get input's 'Widget' part of state using '#getWidgetPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('widget');

  // -- Check when icon

  await knob.clickItem({ value: 'checkbox' });
  await sut.hover();
  expect(await sut.getWidgetPartOfState(), 'to equal', 'checkbox');

  // -- Check when button

  await knob.clickItem({ value: 'button' });
  await sut.hover();
  expect(await sut.getWidgetPartOfState(), 'to equal', 'button');
});

test("150 It should allow assert on input's 'Widget' part of state using '#expectWidgetPartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('widget');

  // -- Successful case

  await knob.clickItem({ value: 'radio' });
  await sut.hover();
  await sut.expectWidgetPartOfStateIs('radio');

  // -- Failing case

  await knob.clickItem({ value: 'button' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectWidgetPartOfStateIs('radio');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'widget,radio'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("160 It should allow assert on input's 'Widget' part of state using '#expectWidgetPartOfStateIs()' - with 'isNot' option set", async () => {
  const { knob, sut } = await getHelperFragments('widget');

  // -- Successful case

  await knob.clickItem({ value: 'checkbox' });
  await sut.hover();
  await sut.expectWidgetPartOfStateIs('button', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectWidgetPartOfStateIs('checkbox', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'widget,checkbox'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
