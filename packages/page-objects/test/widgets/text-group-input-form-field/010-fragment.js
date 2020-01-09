import expect from 'unexpected';
import { camelCase } from 'change-case';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import TextGroupInput from '../../../../../src/js/widgets/text-group-input';
import TextGroupInputFormField from '../../../../../src/js/widgets/text-group-input-form-field';

/**
 * @returns {Promise<InteractiveExample>}
 */
async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

/**
 * @returns {Promise<CheckableGroupInput>}
 */
async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput({ cid }, { parent });
  await knob.expectIsExist();
  return knob;
}

/**
 * @returns {Promise<TextGroupInputFormField>}
 */
async function getSut(parent) {
  const sut = new TextGroupInputFormField({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

/**
 * @returns {Promise<Object>}
 */
async function getHelperFragments(...knobCids) {
  const ie = await getInteractiveExample();
  const result = { ie };

  for (const knobCid of knobCids) {
    result[`${camelCase(knobCid)}Knob`] = await getKnob(knobCid, ie);
  }

  result.knob = result[`${camelCase(knobCids[0])}Knob`];
  result.sut = await getSut(ie.viewElementSelector);

  return result;
}

fixture('Widgets :: Text Group Input Form Field :: 010 Fragment')
  .page('http://localhost:3449/widgets/text-group-input-form-field');

test("010 It should have text group input available as '#input'", async () => {
  const sut = await getSut();
  await sut.hover();

  const tgi = sut.input;
  await tgi.expectIsExist();
  await tgi.hover();
  expect(tgi, 'to be a', TextGroupInput);
});

test("020 It should allow get field's 'Input' part of state using '#getInputPartOfState()'", async () => {
  const {
    disabledKnob,
    multiLineKnob,
    sut
  } = await getHelperFragments('disabled', 'multi-line');
  await sut.hover();

  const inputNewValue = ['foobar', '', '42'];
  await disabledKnob.clickItem({ value: 'false' });
  await multiLineKnob.clickItem({ value: 'true' });
  await sut.input.setValuePartOfState(inputNewValue)
  await disabledKnob.clickItem({ value: 'true' });
  const inputPartOfState = await sut.getInputPartOfState();
  expect(inputPartOfState, 'to equal', {
    // Input
    disabled: true,
    invalid: false,
    size: 'normal',
    value: inputNewValue,
    widget: 'textarea',
    // GroupInput
    equidistant: false,
    inline: false,
    items: [...Array(3).keys()].map(idx => ({
      // Input
      disabled: true,
      invalid: false,
      size: 'normal',
      value: inputNewValue[idx],
      widget: 'textarea',
      // TextInput
      busy: false,
      multiLine: true,
      textAlignment: 'left'
    })),
    noRowGap: false,
    softColumns: false,
    stackedOnMobile: false,
    // TextGroupInput
    multiLine: true
  });
});

test("030 It should allow set field's 'Input' part of state using '#setInputPartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const newInputPartOfState = ['foo', 'bar', '', '30'];
  const result = await sut.setInputPartOfState({ value: newInputPartOfState });
  await sut.input.expectValuePartOfStateIs(newInputPartOfState);
  expect(result, 'to equal', {
    // Text group input have two writable parts of state
    items: newInputPartOfState.map(v => ({
      // Input
      disabled: false,
      invalid: false,
      size: 'normal',
      value: v,
      widget: 'text',
      // TextInput
      busy: false,
      multiLine: false,
      textAlignment: 'left'
    })),
    value: newInputPartOfState
  });
});

test("040 It should allow assert on value of field's 'Input' part of state using '#expectInputPartOfStateIs()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const newInputPartOfState = ['foo', '40', 'bar', ''];
  const result = await sut.setInputPartOfState({ value: newInputPartOfState });
  await sut.input.expectValuePartOfStateIs(newInputPartOfState);

  // -- Successful case

  expect(result, 'to equal', {
    // Text group input have two writable parts of state
    items: newInputPartOfState.map(v => ({
      // Input
      disabled: false,
      invalid: false,
      size: 'normal',
      value: v,
      widget: 'text',
      // TextInput
      busy: false,
      multiLine: false,
      textAlignment: 'left'
    })),
    value: newInputPartOfState
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectInputPartOfStateIs({ items: [], value: ['option1'] });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'nebula-widgets.widgets.text-group-input' fragment's current state doesn't match expected.*/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
