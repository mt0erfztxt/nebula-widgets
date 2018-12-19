import expect from 'unexpected';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
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

fixture('Widgets :: Checkable Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/checkable-group-input');

test("010 It should allow obtain checkable group input", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new CheckableGroupInput({ idx: 0 }, {
    parent: parent.viewElementSelector
  });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow get group's 'LabelShrinked' part of state using '#getLabelShrinkedPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Check when not shrinked

  await sut.hover();
  expect(await sut.getLabelShrinkedPartOfState(), 'to be false');

  // -- Check when shrinked

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getLabelShrinkedPartOfState(), 'to be true');
});

test("030 It should allow assert on whether group's label is shrinked using '#expectIsLabelShrinked()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsLabelShrinked();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'labelShrinked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether group's label isn't shrinked using '#expectIsNotLabelShrinked()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotLabelShrinked();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'labelShrinked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get group's 'MultiCheckable' part of state using '#getMultiCheckablePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-checkable');

  // -- Check when multi checkable

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getMultiCheckablePartOfState(), 'to be true');

  // -- Check when not multi checkable

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getMultiCheckablePartOfState(), 'to be false');
});

test("060 It should allow assert on whether group is multi checkable using '#expectIsMultiCheckable()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-checkable');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsMultiCheckable();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsMultiCheckable();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'multiCheckable,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether group isn't multi checkable using '#expectIsNotMultiCheckable()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-checkable');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectIsNotMultiCheckable();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotMultiCheckable();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'multiCheckable,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
