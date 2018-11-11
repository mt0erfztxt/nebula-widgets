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
  const group = new RadioGroupInput({ idx: 0, parent });
  await group.expectIsExist();
  return group;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    parent,
    sut: await getSut(parent)
  };
}

fixture `Widgets :: Radio Group Input :: 035 Widget`
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should propagate 'disabled' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Check disabled

  await knob.clickItem({ label: 'true' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hoverLabel();
    await item.expectIsDisabled();
  }

  // -- Check enabled

  await knob.clickItem({ label: 'false' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hoverLabel();
    await item.expectIsNotDisabled();
  }
});

test("020 It should propagate 'invalid' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('invalid');

  // -- Check invalid

  await knob.clickItem({ label: 'true' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hoverLabel();
    await item.expectIsInvalid();
  }

  // -- Check valid

  await knob.clickItem({ label: 'false' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hoverLabel();
    await item.expectIsValid();
  }
});

test("030 It should propagate 'widget' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('widget');

  // -- Check when native

  await knob.clickItem({ label: 'native' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hoverLabel();
    await item.expectWidgetPartOfStateIs('native');
  }

  // -- Check when not native

  await knob.clickItem({ label: 'icon' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hoverLabel();
    await item.expectWidgetPartOfStateIs('native', { isNot: true });
  }
});
