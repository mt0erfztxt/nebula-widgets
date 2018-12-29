import expect from 'unexpected';
import { camelCase } from 'change-case';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import CheckableGroupInputFormField from '../../../../../src/js/widgets/checkable-group-input-form-field';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

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
 * @returns {Promise<CheckableGroupInputFormField>}
 */
async function getSut(parent) {
  const sut = new CheckableGroupInputFormField({ idx: 0 }, {
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

fixture('Widgets :: Checkable Group Input Form Field :: 010 Fragment')
  .page('http://localhost:3449/widgets/checkable-group-input-form-field');

test("005 It should have checkable group input available as '#input'", async () => {
  const sut = await getSut();
  await sut.hover();

  const cgi = sut.input;
  await cgi.expectIsExist();
  await cgi.hover();
  expect(cgi, 'to be a', CheckableGroupInput);
});

test("010 It should allow get field's 'Input' part of state using '#getInputPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('disabled');
  await sut.hover();

  await knob.clickItem({ value: 'false' });
  const inputPartOfState = await sut.getInputPartOfState();
  expect(inputPartOfState, 'to equal', {
    // Input
    disabled: false,
    invalid: false,
    size: 'normal',
    value: ['option1', 'option4'],
    widget: 'checkbox',
    // GroupInput
    columns: '5',
    equidistant: false,
    inline: true, // because of columns
    items: [...Array(9).keys()].map(value => {
      const v = ++value;
      return {
        // Input
        disabled: false,
        invalid: false,
        size: 'normal',
        value: `option${v}`,
        widget: 'checkbox',
        // CheckableInput
        checked: [1, 4].includes(v),
        labelShrinked: false
      }
    }),
    noRowGap: false,
    softColumns: false,
    stackedOnMobile: false,
    // CheckableGroupInput
    labelShrinked: false,
    multiCheckable: true
  });
});

test("020 It should allow set field's 'Input' part of state using '#setInputPartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  for (const idx of [0, 3, 4]) {
    await (sut.input.getItem({ idx })).setCheckedPartOfState(true);
  }

  await sut.input.expectValuePartOfStateIs(['option1', 'option4', 'option5']);

  const newInputPartOfState = ['option7', 'option8'];
  const result = await sut.setInputPartOfState({ value: newInputPartOfState });
  await sut.input.expectValuePartOfStateIs(newInputPartOfState);
  expect(result, 'to equal', { value: newInputPartOfState });
});

test("030 It should allow assert on value of field's 'Input' part of state using '#expectInputPartOfStateIs()'", async () => {
  const sut = await getSut();
  await sut.hover();

  for (const idx of [0, 3, 4]) {
    await (sut.input.getItem({ idx })).setCheckedPartOfState(true);
  }

  await sut.input.expectValuePartOfStateIs(['option1', 'option4', 'option5']);

  // -- Successful case

  await sut.expectInputPartOfStateIs({
    // Input
    disabled: false,
    invalid: false,
    size: 'normal',
    value: ['option1', 'option4', 'option5'],
    widget: 'checkbox',
    // GroupInput
    columns: '5',
    equidistant: false,
    inline: true, // because of columns
    items: [...Array(9).keys()].map(value => {
      const v = ++value;
      return {
        // Input
        disabled: false,
        invalid: false,
        size: 'normal',
        value: `option${v}`,
        widget: 'checkbox',
        // CheckableInput
        checked: [1, 4, 5].includes(v),
        labelShrinked: false
      }
    }),
    noRowGap: false,
    softColumns: false,
    stackedOnMobile: false,
    // CheckableGroupInput
    labelShrinked: false,
    multiCheckable: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectInputPartOfStateIs({ value: ['option1'] });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'nebula-widgets.widgets.checkable-group-input' fragment's current state doesn't match expected.*/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
