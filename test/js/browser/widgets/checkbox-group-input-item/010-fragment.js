import expect from 'unexpected';

import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import CheckboxGroupInputItem from '../../../../../src/js/widgets/checkbox-group-input/item';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

fixture `Widgets :: Checkbox Group Input Item :: 010 Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input-item');

test("010 It should allow obtain checkbox group input item", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();
  await item.hoverLabel();
});

test("020 It should allow obtain checkbox group input item - case of custom 'checked' spec", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'checked', parent });
  await rgi.expectIsExist();

  // -- Unchecked item case

  const uncheckedItem = new CheckboxGroupInputItem({ checked: false, parent });
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hoverLabel();

  // -- Checked item case

  await rgi.clickItem({ label: 'true' });
  const checkedItem = new CheckboxGroupInputItem({ checked: true, parent });
  await checkedItem.expectIsExist();
  await checkedItem.hoverLabel();
});

test("030 It should allow obtain checkbox group input item - case of custom 'label' spec", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const label = 'option1';
  const item1 = new CheckboxGroupInputItem({ label, parent });
  await item1.expectExistsAndConformsRequirements({ textContent: label });

  const item5 = new CheckboxGroupInputItem({ label: 'option5', parent });
  await item5.expectIsNotExist();
});

test("040 It should allow get item's 'Checked' part of state using `#getCheckedPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'checked', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Unchecked item case

  await item.hoverLabel();
  expect(await item.getCheckedPartOfState(), 'to be false');

  // -- Checked item case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  expect(await item.getCheckedPartOfState(), 'to be true');
});

test("050 It should allow set item's 'Checked' part of state using `#setCheckedPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();
  await item.hoverLabel();

  // -- Check that unchecked item can be checked and new value for part of
  // -- state returned

  expect(await item.getCheckedPartOfState(), 'to be false');
  expect(await item.setCheckedPartOfState(true), 'to be true');
  expect(await item.getCheckedPartOfState(), 'to be true');
});

test("060 It should allow assert on whether item is checked using `#expectIsChecked()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'checked', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  await item.expectIsChecked();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hoverLabel();

  try {
    await item.expectIsChecked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'checked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether item isn't checked using `#expectIsNotChecked()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'checked', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hoverLabel();
  await item.expectIsNotChecked();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();

  try {
    await item.expectIsNotChecked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'checked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow get item's 'Disabled' part of state using `#getDisabledPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Check when enabled

  await item.hoverLabel();
  expect(await item.getDisabledPartOfState(), 'to be false');

  // -- Check when disabled

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  expect(await item.getDisabledPartOfState(), 'to be true');
});

test("900 It should allow assert on whether item is disabled using `#expectIsDisabled()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  await item.expectIsDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hoverLabel();

  try {
    await item.expectIsDisabled();
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

test("100 It should allow assert on whether item isn't disabled using `#expectIsNotDisabled()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hoverLabel();
  await item.expectIsNotDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();

  try {
    await item.expectIsNotDisabled();
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

test("110 It should allow assert on whether item is enabled using `#expectIsEnabled()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hoverLabel();
  await item.expectIsEnabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();

  try {
    await item.expectIsEnabled();
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

test("120 It should allow assert on whether item isn't enabled using `#expectIsNotEnabled()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  await item.expectIsNotEnabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hoverLabel();

  try {
    await item.expectIsNotEnabled();
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

test("130 It should allow get item's 'Invalid' part of state using `#getInvalidPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'invalid', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Check when valid

  await item.hoverLabel();
  expect(await item.getInvalidPartOfState(), 'to be false');

  // -- Check when invalid

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  expect(await item.getInvalidPartOfState(), 'to be true');
});

test("140 It should allow assert on whether item is invalid using `#expectIsInvalid()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'invalid', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  await item.expectIsInvalid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hoverLabel();

  try {
    await item.expectIsInvalid();
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

test("150 It should allow assert on whether item isn't invalid using `#expectIsNotInvalid()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'invalid', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hoverLabel();
  await item.expectIsNotInvalid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();

  try {
    await item.expectIsNotInvalid();
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

test("160 It should allow assert on whether item is valid using `#expectIsValid()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'invalid', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hoverLabel();
  await item.expectIsValid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();

  try {
    await item.expectIsValid();
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

test("170 It should allow assert on whether item isn't valid using `#expectIsNotValid()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'invalid', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  await item.expectIsNotValid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hoverLabel();

  try {
    await item.expectIsNotValid();
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

test("180 It should allow get item's 'LabelShrinked' part of state using `#getLabelShrinkedPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'label-shrinked', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Check when not shrinked

  await item.hoverLabel();
  expect(await item.getLabelShrinkedPartOfState(), 'to be false');

  // -- Check when shrinked

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  expect(await item.getLabelShrinkedPartOfState(), 'to be true');
});

test("190 It should allow assert on whether item's label is shrinked using `#expectIsLabelShrinked()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'label-shrinked', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();
  await item.expectIsLabelShrinked();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hoverLabel();

  try {
    await item.expectIsLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'labelShrinked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("200 It should allow assert on whether item's label isn't shrinked using `#expectIsNotLabelShrinked()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'label-shrinked', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hoverLabel();
  await item.expectIsNotLabelShrinked();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hoverLabel();

  try {
    await item.expectIsNotLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'labelShrinked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("210 It should allow get item's 'Widget' part of state using `#getWidgetPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'widget', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Check when icon

  await item.hoverLabel();
  expect(await item.getWidgetPartOfState(), 'to equal', 'icon');

  // -- Check when button

  await rgi.clickItem({ label: 'button' });
  await item.hoverLabel();
  expect(await item.getWidgetPartOfState(), 'to equal', 'button');

  // -- Check when native

  await rgi.clickItem({ label: 'native' });
  await item.hoverLabel();
  expect(await item.getWidgetPartOfState(), 'to equal', 'native');
});

test("220 It should allow assert on item's 'Widget' part of state value using `#expectWidgetPartOfStateIs()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'widget', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'icon' });
  await item.hoverLabel();
  await item.expectWidgetPartOfStateIs('icon');

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'button' });
  await item.hoverLabel();

  try {
    await item.expectWidgetPartOfStateIs('icon');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must have BEM modifier 'widget,icon'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("230 It should allow assert on item's 'Widget' part of state value using `#expectWidgetPartOfStateIs()` - with 'isNot' option set", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'widget', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'icon' });
  await item.hoverLabel();
  await item.expectWidgetPartOfStateIs('native', { isNot: true });

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'native' });
  await item.hoverLabel();

  try {
    await item.expectWidgetPartOfStateIs('native', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input\.item.+must not have BEM modifier 'widget,native'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
