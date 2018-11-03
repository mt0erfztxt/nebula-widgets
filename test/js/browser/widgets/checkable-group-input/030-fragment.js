/**
 * Checkable group input fragment doesn't represent concrete widget and used to
 * aggregate common functionality, and because of that it tested using checkbox
 * group input fragment.
 */

import expect from 'unexpected';

import CheckboxGroupInput from '../../../../../src/js/widgets/checkbox-group-input';
import CheckboxGroupInputCheckedItem from '../../../../../src/js/widgets/checkbox-group-input/checked-item';
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
  const group = new CheckboxGroupInput({
    idx: 0,
    parent: parent || await getInteractiveExample()
  });
  await group.expectIsExist();
  return group;
}

async function getHelperFragments(knobCid) {
  let knob;
  const parent = await getInteractiveExample();

  if (knobCid) {
    knob = await getKnob(knobCid, parent);
  }

  return {
    knob,
    parent,
    sut: await getSut(parent)
  };
}

fixture `Widgets :: Checkable Group Input :: 030 Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input');

test("010 It should allow assert on checked item existence using `#expectHasCheckedItem()`", async () => {
  const { sut } = await getHelperFragments();
  await sut.hover();

  // -- Successful case

  const item = sut.getItem({ label: 'option5' });
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsChecked();

  const checkedItem = await sut.expectHasCheckedItem({ label: 'option5' });
  await checkedItem.expectIsEqual(new CheckboxGroupInputCheckedItem({ label: 'option5' }));

  // -- Failing case

  let isThrown = false;

  await item.constructor.reloadBrowserPage();
  await item.hoverLabel();
  await item.expectIsExist();
  await item.expectIsNotChecked();

  try {
    await sut.expectHasCheckedItem({ label: 'option5' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.checked-item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
