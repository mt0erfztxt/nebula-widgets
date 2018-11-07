import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'
import RadioGroupInputItem from '../../../../../src/js/widgets/radio-group-input/item';

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
  const item = new RadioGroupInputItem({ idx: 0, parent });
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

fixture `Widgets :: Radio Group Input :: 015 Item Widget`
  .page('http://localhost:3449/widgets/radio-group-input-item');

test("010 It should allow to check item by clicking on it's label", async () => {
  const { knob, sut } = await getHelperFragments('checked');
  await knob.clickItem({ label: 'false' });
  await sut.hoverLabel();
  await sut.expectIsNotChecked();
  await sut.click();
  await sut.expectIsChecked();
});

test("020 It should not allow to change item's checked state by click when item is disabled", async () => {
  const { knob: disabledKnob, sut } = await getHelperFragments('disabled');
  const checkedKnob = await getKnob('checked');

  await disabledKnob.clickItem({ label: 'true' });
  await sut.expectIsDisabled();

  await checkedKnob.clickItem({ label: 'false' });
  await sut.expectIsNotChecked();
  await sut.click();
  await sut.expectIsNotChecked();
});

