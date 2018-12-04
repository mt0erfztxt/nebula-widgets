/**
 * Checkable input fragment doesn't represent concrete widget and used to
 * aggregate common functionality of fragments for concrete input widgets, and
 * because of that it tested using radio input fragment.
 */

import expect from 'unexpected';

import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input';
import RadioInput from '../../../../../src/js/widgets/radio-input';

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const rgi = new RadioGroupInput({ cid }, { parent });
  await rgi.expectIsExist();
  return rgi;
}

async function getSut(parent) {
  const ri = new RadioInput({ idx: 0 }, { parent });
  await ri.expectIsExist();
  return ri;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    parent: parent.viewElementSelector,
    sut: await getSut(parent)
  };
}

fixture('Widgets :: Checkable Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/radio-input');

test("010 It should allow obtain checkable input fragment - case of 'checked' selector tranformation", async () => {
  const { knob, parent } = await getHelperFragments('checked');

  // -- Unchecked input case

  const uncheckedInput = new RadioInput({ checked: false }, { parent });
  await uncheckedInput.expectIsExist();
  await uncheckedInput.hover();

  // -- Checked input case

  await knob.clickItem({ value: 'true' });

  const checkedInput = new RadioInput({ checked: true }, { parent });
  await checkedInput.expectIsExist();
  await checkedInput.hover();
});

test("020 It should allow obtain checkable input fragment - case of 'value' selector tranformation", async () => {
  const parent = await getInteractiveExample().viewElementSelector;

  // -- Fragment with specified value (label) exists

  const input1 = new RadioInput({ value: 'Radio input label' }, { parent });
  await input1.expectIsExist();
  await input1.hover();

  // -- Fragment with specified value (label) not exists

  const input2 = new RadioInput({ value: 'Checkbox input label' }, { parent });
  await input2.expectIsNotExist();
});

test("030 It should allow get input's 'Checked' part of state using '#getCheckedPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('checked');

  // -- Check when checked

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getCheckedPartOfState(), 'to be true');

  // -- Check when not checked

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getCheckedPartOfState(), 'to be false');
});

test("040 It should allow assert on whether input is checked using '#expectIsChecked()'", async () => {
  const { knob, sut } = await getHelperFragments('checked');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsChecked();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsChecked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-input.+must have BEM modifier 'checked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on whether input isn't checked using '#expectIsNotChecked()'", async () => {
  const { knob, sut } = await getHelperFragments('checked');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectIsNotChecked();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotChecked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-input.+must not have BEM modifier 'checked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("060 It should allow get input's 'LabelShrinked' part of state using '#getLabelShrinkedPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Check when not shrinked

  await sut.hover();
  expect(await sut.getLabelShrinkedPartOfState(), 'to be false');

  // -- Check when shrinked

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getLabelShrinkedPartOfState(), 'to be true');
});

test("070 It should allow assert on whether input's label is shrinked using '#expectIsLabelShrinked()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsLabelShrinked();

  // -- Failing case

  let isThrown = false;

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  try {
    await sut.expectIsLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-input.+must have BEM modifier 'labelShrinked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on whether input's label isn't shrinked using '#expectIsNotLabelShrinked()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotLabelShrinked();

  // -- Failing case

  let isThrown = false;

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  try {
    await sut.expectIsNotLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-input.+must not have BEM modifier 'labelShrinked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
