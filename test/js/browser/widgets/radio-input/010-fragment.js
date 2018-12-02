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

fixture('Widgets :: Radio Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/radio-input');

test("010 It should allow obtain checkable input fragment - case of 'checked' selector tranformation", async () => {
  const { sut } = await getHelperFragments('checked');
  await sut.hover();

  // -- Unchecked input case

  expect(await sut.getCheckedPartOfState(), 'to be false');
  expect(await sut.setCheckedPartOfState(true), 'to be true');
  expect(await sut.getCheckedPartOfState(), 'to be true');

  // -- Checked input case (ensures that checekd isn't toggled for radio input)

  expect(await sut.getCheckedPartOfState(), 'to be true');
  expect(await sut.setCheckedPartOfState(true), 'to be true');
  expect(await sut.getCheckedPartOfState(), 'to be true');
});
