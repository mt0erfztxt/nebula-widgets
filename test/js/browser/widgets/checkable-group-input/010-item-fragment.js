/**
 * Checkable group input item fragment doesn't represent concrete widget and
 * used to aggregate common functionality, and because of that it tested using
 * checkbox group input item fragment.
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

async function getKnob(cid, parent) {
  const rgi = new RadioGroupInput({ cid, parent });
  await rgi.expectIsExist();
  return rgi;
}

async function getSut(parent) {
  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();
  return item;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    parent,
    sut: await getSut(parent)
  };
}

fixture `Widgets :: Checkable Group Input :: 010 Item Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input-item');

test("010 It should allow obtain checkable group input item - case of custom 'checked' spec", async () => {
  const { knob, parent } = await getHelperFragments('checked');

  // -- Unchecked item case

  const uncheckedItem = new CheckboxGroupInputItem({ checked: false, parent });
  await uncheckedItem.expectIsExist();
  await uncheckedItem.hoverLabel();

  // -- Checked item case

  await knob.clickItem({ label: 'true' });

  const checkedItem = new CheckboxGroupInputItem({ checked: true, parent });
  await checkedItem.expectIsExist();
  await checkedItem.hoverLabel();
});

test("020 It should allow get item's 'Checked' part of state using `#getCheckedPartOfState()`", async () => {
  const { knob, sut } = await getHelperFragments('checked');

  // -- Check when checked

  await knob.clickItem({ label: 'true' });
  await sut.hoverLabel();
  expect(await sut.getCheckedPartOfState(), 'to be true');

  // -- Check when not checked

  await knob.clickItem({ label: 'false' });
  await sut.hoverLabel();
  expect(await sut.getCheckedPartOfState(), 'to be false');
});

test("030 It should allow assert on whether item is checked using `#expectIsChecked()`", async () => {
  const { knob, sut } = await getHelperFragments('checked');

  // -- Successful case

  await knob.clickItem({ label: 'true' });
  await sut.hoverLabel();
  await sut.expectIsChecked();

  // -- Failing case

  let isThrown = false;

  await knob.clickItem({ label: 'false' });
  await sut.hoverLabel();

  try {
    await sut.expectIsChecked();
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

test("040 It should allow assert on whether item isn't checked using `#expectIsNotChecked()`", async () => {
  const { knob, sut } = await getHelperFragments('checked');

  // -- Successful case

  await knob.clickItem({ label: 'false' });
  await sut.hoverLabel();
  await sut.expectIsNotChecked();

  // -- Failing case

  let isThrown = false;

  await knob.clickItem({ label: 'true' });
  await sut.hoverLabel();

  try {
    await sut.expectIsNotChecked();
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
