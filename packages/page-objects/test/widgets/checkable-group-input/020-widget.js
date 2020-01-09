import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import CheckableInput from '../../../../../src/js/widgets/checkable-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput({ cid }, { parent });
  await knob.expectIsExist();
  return knob;
}

async function getSut(parent) {
  const sut = new CheckableGroupInput({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: knobCid ? (await getKnob(knobCid, parent)) : undefined,
    parent,
    sut: await getSut(parent.viewElementSelector)
  };
}

fixture('Widgets :: Checkable Group Input :: 020 Widget')
  .page('http://localhost:3449/widgets/checkable-group-input');

test("010 It should propagate 'disabled' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('disabled');

  // -- Check disabled

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hover();
    await item.expectIsDisabled();
  }

  // -- Check enabled

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hover();
    await item.expectIsNotDisabled();
  }
});

test("020 It should propagate 'label-shrinked' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Check when label shrinked

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hover();
    await item.expectIsLabelShrinked();
  }

  // -- Check when label not shrinked

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hover();
    await item.expectIsNotLabelShrinked();
  }
});

test("030 It should propagate 'widget' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('widget');

  // -- Check when 'button'

  await knob.clickItem({ value: 'button' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hover();
    await item.expectWidgetPartOfStateIs('button');
  }

  // -- Check when not 'button'

  await knob.clickItem({ value: 'checkbox' });
  await sut.hover();
  await sut.expectItemsCountIs(9);

  for (let i = 0; i < 9; i++) {
    const item = sut.getItem({ idx: i });
    await item.expectIsExist();
    await item.hover();
    await item.expectWidgetPartOfStateIs('button', { isNot: true });
  }
});
