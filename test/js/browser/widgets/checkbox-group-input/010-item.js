import expect from 'unexpected';

import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import CheckboxGroupInput from '../../../../../src/js/widgets/checkbox-group-input';
import CheckboxGroupInputItem from '../../../../../src/js/widgets/checkbox-group-input/item';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

fixture `Widgets :: Checkbox Group Input :: 010 :: Item`
  .page('http://localhost:3449/widgets/checkbox-group-input');

test("010 It should allow obtain checkbox group input item", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent: parent });
  await item.expectIsExist();
  await item.hover();
});

test("020 It should allow obtain checkbox group input item - case of custom 'checked' spec", async (t) => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const checkedItem = new CheckboxGroupInputItem({ checked: true, parent });
  await checkedItem.expectIsExist({ allowMultiple: true });
  await checkedItem.hover();
  await t.expect(checkedItem.selector.count).eql(3);

  const uncheckedItem = new CheckboxGroupInputItem({ checked: false, parent });
  await uncheckedItem.expectIsExist({ allowMultiple: true });
  await uncheckedItem.hover();
  await t.expect(uncheckedItem.selector.count).eql(6);
});

test("030 It should allow obtain checkbox group input item - case of custom 'label' spec", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const label = 'option5';
  const item = new CheckboxGroupInputItem({ label, parent });
  await item.expectExistsAndConformsRequirements({ textContent: label });
});

test("040 It should allow get item's 'Checked' part of state using `#getCheckedPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  // -- Checked item case

  const checkedItem = new CheckboxGroupInputItem({ label: 'option1', parent });
  await checkedItem.expectIsExist();
  await checkedItem.hover();
  expect(await checkedItem.getCheckedPartOfState(), 'to be true');

  // -- Unchecked item case

  const uncheckedItem = new CheckboxGroupInputItem({ label: 'option5', parent });
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be false');
});

test("050 It should allow set item's 'Checked' part of state using `#setCheckedPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const uncheckedItem = new CheckboxGroupInputItem({ label: 'option5', parent });
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();

  // Check that unchecked item can be checked and new value for part of state
  // returned.
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be false');
  expect(await uncheckedItem.setCheckedPartOfState(true), 'to be true');
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be true');
});

test("060 It should allow assert on whether item is checked using `#expectIsChecked()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const checkedItem = new CheckboxGroupInputItem({ label: 'option1', parent });
  await checkedItem.expectIsExist();
  await checkedItem.hover();
  await checkedItem.expectIsChecked();

  // -- Failing case

  let isThrown = false;

  const uncheckedItem = new CheckboxGroupInputItem({ label: 'option5', parent });
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();

  try {
    await uncheckedItem.expectIsChecked();
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

  const uncheckedItem = new CheckboxGroupInputItem({ label: 'option5', parent });
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();
  await uncheckedItem.expectIsNotChecked();

  // -- Failing case

  let isThrown = false;

  const checkedItem = new CheckboxGroupInputItem({ label: 'option1', parent });
  await checkedItem.expectIsExist();
  await checkedItem.hover();

  try {
    await checkedItem.expectIsNotChecked();
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

  const item = new CheckboxGroupInputItem({ label: 'option3', parent });
  await item.expectIsExist();

  // -- Check when enabled

  await item.hover();
  expect(await item.getDisabledPartOfState(), 'to be false');

  // -- Check when disabled

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });

  await item.hover();
  expect(await item.getDisabledPartOfState(), 'to be true');
});

test("090 It should allow assert on whether item is disabled using `#expectIsDisabled()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();

  const item = new CheckboxGroupInputItem({ label: 'option5', parent });
  await item.expectIsExist();

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await item.hover();
  await item.expectIsDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await item.hover();

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

  const item = new CheckboxGroupInputItem({ label: 'option5', parent });
  await item.expectIsExist();

  // -- Successful case

  await item.hover();
  await item.expectIsNotDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await item.hover();

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
