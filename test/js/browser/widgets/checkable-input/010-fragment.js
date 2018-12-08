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
  const sut = new CheckableInput({ idx: 0 }, {
    parent: parent || await getInteractiveExample().viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    parent: parent.viewElementSelector,
    sut: await getSut(parent.viewElementSelector)
  };
}

fixture('Widgets :: Checkable Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/checkable-input');

test("010 It should allow obtain checkable input fragment - case of 'checked' selector tranformation", async () => {
  const { knob, parent } = await getHelperFragments('checked');

  // -- Unchecked input case

  const uncheckedInput = new CheckableInput({ checked: false }, { parent });
  await uncheckedInput.expectIsExist();
  await uncheckedInput.hover();

  // -- Checked input case

  await knob.clickItem({ value: 'true' });

  const checkedInput = new CheckableInput({ checked: true }, { parent });
  await checkedInput.expectIsExist();
  await checkedInput.hover();
});

test("020 It should allow obtain checkable input fragment - case of 'value' selector tranformation", async () => {
  const parent = await getInteractiveExample().viewElementSelector;

  // -- Fragment with specified value (label) exists

  const input1 = new CheckableInput({ value: 'Checkable input label' }, { parent });
  await input1.expectIsExist();
  await input1.hover();

  // -- Fragment with specified value (label) not exists

  const input2 = new CheckableInput({ value: 'Non-existent' }, { parent });
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

test("035 It should allow set input's 'Checked' part of state using '#setCheckedPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('checked');
  await knob.clickItem({ value: 'true' });

  // -- Check when checked

  await sut.setCheckedPartOfState(true);
  expect(await sut.getCheckedPartOfState(), 'to be true');

  await sut.setCheckedPartOfState(false);
  expect(await sut.getCheckedPartOfState(), 'to be false');

  // -- Check when not checked

  await sut.setCheckedPartOfState(false);
  expect(await sut.getCheckedPartOfState(), 'to be false');

  await sut.setCheckedPartOfState(true);
  expect(await sut.getCheckedPartOfState(), 'to be true');
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
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'checked,'.+but it doesn't/
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
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'checked,'.+but it does/
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

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'labelShrinked,'.+but it doesn't/
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

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'labelShrinked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("090 It should allow get input's 'SelectionMode' part of state using '#getSelectionModePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('selection-mode');

  // -- Check when multi

  await knob.clickItem({ value: 'multi' });
  await sut.hover();
  expect(await sut.getSelectionModePartOfState(), 'to equal', 'multi');

  // -- Check when single

  await knob.clickItem({ value: 'single' });
  await sut.hover();
  expect(await sut.getSelectionModePartOfState(), 'to equal', 'single');
});

test("100 It should allow assert on input's 'SelectionMode' part of state using '#expectSelectionModePartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('selection-mode');

  // -- Successful case

  await knob.clickItem({ value: 'single' });
  await sut.hover();
  await sut.expectSelectionModePartOfStateIs('single');

  // -- Failing case

  await knob.clickItem({ value: 'multi' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectSelectionModePartOfStateIs('single');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must have BEM modifier 'selectionMode,single'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow assert on input's 'SelectionMode' part of state using '#expectSelectionModePartOfStateIs()' - with 'isNot' option set", async () => {
  const { knob, sut } = await getHelperFragments('selection-mode');

  // -- Successful case

  await knob.clickItem({ value: 'multi' });
  await sut.hover();
  await sut.expectSelectionModePartOfStateIs('single', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectSelectionModePartOfStateIs('multi', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-input.+must not have BEM modifier 'selectionMode,multi'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("120 It should allow get input's 'Value' part of state using '#getValuePartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();
  expect(await sut.getValuePartOfState(), 'to equal', 'Checkable input label');
});

test("130 It should allow assert on input's 'Value' part of state using '#expectValuePartOfStateIs()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectValuePartOfStateIs('Checkable input label');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs('Non-existent');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: expected 'Checkable input label' to deeply equal 'Non-existent'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow assert on input's 'Value' part of state using '#expectValuePartOfStateIs()' - with 'isNot' option set", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectValuePartOfStateIs('Non-existent', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs('Checkable input label', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: expected 'Checkable input label' to not deeply equal 'Checkable input label'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
