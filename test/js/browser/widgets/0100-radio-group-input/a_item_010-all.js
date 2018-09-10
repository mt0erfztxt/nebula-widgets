import expect from 'unexpected';

import Button from '../../../../../src/js/widgets/button';
import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input';
import RadioGroupInputItem from '../../../../../src/js/widgets/radio-group-input/item';

const disableRadioGroupInputButton = new Button({ cid: 'disable' });
const enableRadioGroupInputButton = new Button({ cid: 'enable' });

// TODO Maybe provide defaults for `groupCid` and `exampleCid`?
/**
 * Returns radio group input item fragment with 'cid' equal specified one. By
 * default scope for search is whole page, but it can be narrowed down by
 * providing 'cid' of radio group input and/or by providing 'cid' of man page's
 * example.
 * 
 * @param {String} cid Radio group input item's 'cid'
 * @param {String} [groupCid] 'cid' of radio group input to which item belongs
 * @param {String} [exampleCid] 'cid' of man page's example to which radio group input belongs
 * @returns {RadioGroupInputItem}
 */
function getRadioGroupInputItem(cid, groupCid, exampleCid) {
  // TODO Assert on arguments.

  let example;
  let group;

  if (exampleCid) {
    example = new ManPageExample({ cid: exampleCid });
  }

  if (groupCid) {
    group = new RadioGroupInput({ cid: groupCid, parent: example });
  }

  return new RadioGroupInputItem({ cid, parent: (group || example) });
}

fixture `Widgets :: Radio Group Input :: Item :: 010 All`
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should allow obtain radio group input item", async () => {
  const example020 = new ManPageExample({ cid: '020' });
  await example020.expectIsExist();

  const item = new RadioGroupInputItem({ cid: '020-1', parent: example020 });
  await item.expectIsExist();
});

test("015 It should allow obtain radio group input item - case of custom 'label' spec", async () => {
  const example020 = new ManPageExample({ cid: '020' });
  await example020.expectIsExist();

  const item = new RadioGroupInputItem({ label: 'Option 12', parent: example020 });
  await item.expectExistsAndConformsRequirements({ textContent: 'Option 12' });
});

test("020 It should allow get item's 'Checked' part of state", async () => {
  const checkedItem = getRadioGroupInputItem('020-3', null, '020');
  const uncheckedItem = getRadioGroupInputItem('020-2', null, '020');

  // Checked item case.
  await checkedItem.expectIsExist();
  await checkedItem.hover();
  expect(await checkedItem.getCheckedPartOfState(), 'to be true');

  // Unchecked item case.
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be false');
});

test("030 It should allow set item's 'Checked' part of state", async () => {
  const uncheckedItem = getRadioGroupInputItem('020-2', null, '020');

  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();

  // Check that unchecked item can be checked and new value for part of state
  // returned.
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be false');
  expect(await uncheckedItem.setCheckedPartOfState(true), 'to be true');
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be true');
});

test("040 It should allow assert on whether item is checked using `#expectIsChecked()`", async () => {
  const checkedItem = getRadioGroupInputItem('020-3', null, '020');

  await checkedItem.expectIsExist();
  await checkedItem.hover();

  await checkedItem.expectIsChecked();

  // -- Failing case

  let isThrown = false;
  const uncheckedItem = getRadioGroupInputItem('020-1', null, '020');

  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();

  try {
    await uncheckedItem.expectIsChecked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input\.item.+must have BEM modifier 'checked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on whether item isn't checked using `#expectIsNotChecked()`", async () => {
  const uncheckedItem = getRadioGroupInputItem('020-2', null, '020');

  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();

  await uncheckedItem.expectIsNotChecked();

  // -- Failing case

  let isThrown = false;
  const checkedItem = getRadioGroupInputItem('020-3', null, '020');

  await checkedItem.expectIsExist();
  await checkedItem.hover();

  try {
    await checkedItem.expectIsNotChecked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input\.item.+must not have BEM modifier 'checked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("060 It should allow get item's 'Disabled' part of state", async () => {
  const item = getRadioGroupInputItem('020-1', null, '020');
  await item.expectIsExist();

  await disableRadioGroupInputButton.click();
  await item.hover();
  expect(await item.getDisabledPartOfState(), 'to be true');

  await enableRadioGroupInputButton.click();
  await item.hover();
  expect(await item.getDisabledPartOfState(), 'to be false');
});

test("070 It should allow assert on whether item is disabled using `#expectIsDisabled()`", async () => {
  const item = getRadioGroupInputItem('020-4', null, '020');
  await item.expectIsExist();

  await disableRadioGroupInputButton.click();
  await item.hover();
  await item.expectIsDisabled();

  // -- Failing case

  let isThrown = false;

  await enableRadioGroupInputButton.click();
  await item.hover();

  try {
    await item.expectIsDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input\.item.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on whether item isn't disabled using `#expectIsNotDisabled()`", async () => {
  const item = getRadioGroupInputItem('020-4', null, '020');
  await item.expectIsExist();

  await enableRadioGroupInputButton.click();
  await item.hover();
  await item.expectIsNotDisabled();

  // -- Failing case

  let isThrown = false;

  await disableRadioGroupInputButton.click();
  await item.hover();

  try {
    await item.expectIsNotDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input\.item.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("090 It should allow assert on whether item is enabled using `#expectIsEnabled()`", async () => {
  const item = getRadioGroupInputItem('020-6', null, '020');
  await item.expectIsExist();

  await enableRadioGroupInputButton.click();
  await item.hover();
  await item.expectIsEnabled();

  // -- Failing case

  let isThrown = false;

  await item.hover();
  await disableRadioGroupInputButton.click();

  try {
    await item.expectIsEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input\.item.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on whether item isn't enabled using `#expectIsNotEnabled()`", async () => {
  const item = getRadioGroupInputItem('020-4', null, '020');
  await item.expectIsExist();

  await disableRadioGroupInputButton.click();
  await item.hover();
  await item.expectIsNotEnabled();

  // -- Failing case

  let isThrown = false;

  await enableRadioGroupInputButton.click();
  await item.hover();

  try {
    await item.expectIsNotEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input\.item.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
