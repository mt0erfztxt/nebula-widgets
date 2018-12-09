import expect from 'unexpected';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import TextInput from '../../../../../src/js/widgets/text-input';

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
  const sut = new TextInput({ idx: 0 }, {
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

fixture('Widgets :: Text Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/text-input');

test("010 It should allow obtain text input", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new TextInput({ idx: 0 }, {
    parent: parent.viewElementSelector
  });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow get input's 'Busy' part of state using '#getBusyPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('busy');

  // -- Check when not busy

  await sut.hover();
  expect(await sut.getBusyPartOfState(), 'to be false');

  // -- Check when busy

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getBusyPartOfState(), 'to be true');
});

test("030 It should allow assert on whether input is busy using '#expectIsBusy()'", async () => {
  const { knob, sut } = await getHelperFragments('busy');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsBusy();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsBusy();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.text-input.+must have BEM modifier 'busy,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether input isn't busy using '#expectIsNotBusy()'", async () => {
  const { knob, sut } = await getHelperFragments('busy');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotBusy();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotBusy();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.text-input.+must not have BEM modifier 'busy,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get input's 'MultiLine' part of state using '#getMultiLinePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-line');

  // -- Check when not multi line

  await sut.hover();
  expect(await sut.getMultiLinePartOfState(), 'to be false');

  // -- Check when multi line

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getMultiLinePartOfState(), 'to be true');
});

test("060 It should allow assert on whether input is multi line using '#expectIsMultiLine()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-line');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsMultiLine();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsMultiLine();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.text-input.+must have BEM modifier 'multiLine,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether input isn't multi line using '#expectIsNotMultiLine()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-line');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotMultiLine();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotMultiLine();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.text-input.+must not have BEM modifier 'multiLine,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow get input's 'TextAlingment' part of state using '#getTextAlignmentPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('text-alignment');

  // -- Check when 'center'

  await knob.clickItem({ value: 'center' });
  await sut.hover();
  expect(await sut.getTextAlignmentPartOfState(), 'to equal', 'center');

  // -- Check when 'left'

  await knob.clickItem({ value: 'left' });
  await sut.hover();
  expect(await sut.getTextAlignmentPartOfState(), 'to equal', 'left');
});

test("090 It should allow assert on input's 'TextAlignment' part of state using '#expectTextAlignmentPartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('text-alignment');

  // -- Successful case

  await knob.clickItem({ value: 'center' });
  await sut.hover();
  await sut.expectTextAlignmentPartOfStateIs('center');

  // -- Failing case

  await knob.clickItem({ value: 'right' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectTextAlignmentPartOfStateIs('left');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.text-input.+must have BEM modifier 'textAlignment,left'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on input's 'TextAlignment' part of state using '#expectTextAlignmentPartOfStateIs()' - with 'isNot' option set", async () => {
  const { knob, sut } = await getHelperFragments('text-alignment');

  // -- Successful case

  await knob.clickItem({ value: 'center' });
  await sut.hover();
  await sut.expectTextAlignmentPartOfStateIs('left', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectTextAlignmentPartOfStateIs('center', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.text-input.+must not have BEM modifier 'textAlignment,center'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow get input's 'Value' part of state using '#getValuePartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();
  expect(await sut.getValuePartOfState(), 'to equal', 'foobar');
});

// TODO Add test for supported options.
test("120 It should allow set input's 'Value' part of state using '#setValuePartOfState()'", async () => {
  const sut = await getSut();
  expect(await sut.getValuePartOfState(), 'to equal', 'foobar');

  await sut.setValuePartOfState('42');
  expect(await sut.getValuePartOfState(), 'to equal', '42');
});

test("130 It should allow assert on input's 'Value' part of state using '#expectValuePartOfStateIs()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectValuePartOfStateIs('foobar');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs('42');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: expected 'foobar' to deeply equal '42'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow assert on input's 'Value' part of state using '#expectValuePartOfStateIs()' - with 'isNot' option set", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectValuePartOfStateIs('42', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs('foobar', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: expected 'foobar' to not deeply equal 'foobar'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
