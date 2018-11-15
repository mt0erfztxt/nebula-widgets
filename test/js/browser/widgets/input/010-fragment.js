/**
 * Input fragment doesn't represent concrete widget and used to aggregate
 * common functionality of fragments for concrete input widgets, and because
 * of that it tested using checkbox group input item fragment.
 */

import expect from 'unexpected';

import CheckboxGroupInputItem from '../../../../../src/js/widgets/checkbox-group-input/item';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getRgi(cid, parent) {
  const rgi = new RadioGroupInput({ cid, parent });
  await rgi.expectIsExist();
  return rgi;
}

async function getSut(parent) {
  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();
  return item;
}

async function getHelperFragments(rgiCid) {
  const ie = await getInteractiveExample();
  return [
    await getSut(ie),
    await getRgi(rgiCid, ie),
    ie
  ];
}

fixture `Widgets :: Input :: 010 Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input-item');

test("010 It should allow get input's 'Disabled' part of state using `#getDisabledPartOfState()`", async () => {
  const [sut, rgi] = await getHelperFragments('disabled');

  // -- Check when enabled

  await sut.hoverLabel();
  expect(await sut.getDisabledPartOfState(), 'to be false');

  // -- Check when disabled

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();
  expect(await sut.getDisabledPartOfState(), 'to be true');
});

test("020 It should allow assert on whether input is disabled using `#expectIsDisabled()`", async () => {
  const [sut, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();
  await sut.expectIsDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await sut.hoverLabel();

  try {
    await sut.expectIsDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow assert on whether input isn't disabled using `#expectIsNotDisabled()`", async () => {
  const [sut, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await sut.hoverLabel();
  await sut.expectIsNotDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();

  try {
    await sut.expectIsNotDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether input is enabled using `#expectIsEnabled()`", async () => {
  const [sut, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await sut.hoverLabel();
  await sut.expectIsEnabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();

  try {
    await sut.expectIsEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on whether input isn't enabled using `#expectIsNotEnabled()`", async () => {
  const [sut, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();
  await sut.expectIsNotEnabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await sut.hoverLabel();

  try {
    await sut.expectIsNotEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("060 It should allow get input's 'Invalid' part of state using `#getInvalidPartOfState()`", async () => {
  const [sut, rgi] = await getHelperFragments('invalid');

  // -- Check when valid

  await sut.hoverLabel();
  expect(await sut.getInvalidPartOfState(), 'to be false');

  // -- Check when invalid

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();
  expect(await sut.getInvalidPartOfState(), 'to be true');
});

test("070 It should allow assert on whether input is invalid using `#expectIsInvalid()`", async () => {
  const [sut, rgi] = await getHelperFragments('invalid');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();
  await sut.expectIsInvalid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await sut.hoverLabel();

  try {
    await sut.expectIsInvalid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'invalid,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on whether input isn't invalid using `#expectIsNotInvalid()`", async () => {
  const [sut, rgi] = await getHelperFragments('invalid');

  // -- Successful case

  await sut.hoverLabel();
  await sut.expectIsNotInvalid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();

  try {
    await sut.expectIsNotInvalid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'invalid,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("090 It should allow assert on whether input is valid using `#expectIsValid()`", async () => {
  const [sut, rgi] = await getHelperFragments('invalid');

  // -- Successful case

  await sut.hoverLabel();
  await sut.expectIsValid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();

  try {
    await sut.expectIsValid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'invalid,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on whether input isn't valid using `#expectIsNotValid()`", async () => {
  const [sut, rgi] = await getHelperFragments('invalid');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await sut.hoverLabel();
  await sut.expectIsNotValid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await sut.hoverLabel();

  try {
    await sut.expectIsNotValid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'invalid,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
