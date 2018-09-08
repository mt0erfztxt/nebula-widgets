import expect from 'unexpected';

import ManPageExample from '../../../../../../src/js/kitchen-sink/widgets/man-page/example';
import RadioGroupInput from '../../../../../../src/js/widgets/radio-group-input';
import RadioGroupInputItem from '../../../../../../src/js/widgets/radio-group-input/item';

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
function getRadioInputGroupItem(cid, groupCid, exampleCid) {
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
  const item = new RadioGroupInputItem({ cid: '020-1', parent: example020 });

  await example020.expectIsExist();
  await item.expectIsExist();
});

test("020 It should allow get item's 'Checked' part of state", async () => {
  const checkedItem = getRadioInputGroupItem('020-3', null, '020');
  const uncheckedItem = getRadioInputGroupItem('020-2', null, '020');

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
  const uncheckedItem = getRadioInputGroupItem('020-2', null, '020');

  await uncheckedItem.expectIsExist();
  await uncheckedItem.hover();

  // Check that unchecked item can be checked and new value for part of state
  // returned.
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be false');
  expect(await uncheckedItem.setCheckedPartOfState(true), 'to be true');
  expect(await uncheckedItem.getCheckedPartOfState(), 'to be true');
});
