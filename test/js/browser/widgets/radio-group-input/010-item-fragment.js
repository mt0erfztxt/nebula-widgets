import expect from 'unexpected';

import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInputItem from '../../../../../src/js/widgets/radio-group-input/item';

async function getSut() {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const group = new RadioGroupInputItem({ idx: 0, parent });
  await group.expectIsExist();

  return group;
}

fixture `Widgets :: Radio Group Input :: 010 Item Fragment`
  .page('http://localhost:3449/widgets/radio-group-input-item');

test("010 It should allow set item's 'Checked' part of state using `#setCheckedPartOfState()`", async () => {
  const sut = await getSut();
  await sut.hoverLabel();

  // Check that unchecked item can be checked and new value for part of state
  // returned.
  expect(await sut.getCheckedPartOfState(), 'to be false');
  expect(await sut.setCheckedPartOfState(true), 'to be true');
  expect(await sut.getCheckedPartOfState(), 'to be true');
});
