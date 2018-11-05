import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import CheckboxGroupInputItem from '../../../../../src/js/widgets/checkbox-group-input/item';
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

fixture `Widgets :: Checkbox Group Input :: 015 Item Widget`
  .page('http://localhost:3449/widgets/checkbox-group-input-item');

test("010 It should allow to check / uncheck item by clicking on it's label", async () => {
  const sut = await getSut()
  await sut.hoverLabel();
  await sut.expectIsExist();
  await sut.expectIsNotChecked();
  await sut.click();
  await sut.expectIsChecked();
  await sut.click();
  await sut.expectIsNotChecked();
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

  await checkedKnob.clickItem({ label: 'true' });
  await sut.expectIsChecked();
  await sut.click();
  await sut.expectIsChecked();
});
