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

// test("035 It should allow set input's 'Checked' part of state using '#setCheckedPartOfState()'", async () => {
//   const { knob, sut } = await getHelperFragments('checked');
//   await knob.clickItem({ value: 'true' });

//   // -- Check when checked

//   await sut.setCheckedPartOfState(true);
//   expect(await sut.getCheckedPartOfState(), 'to be true');

//   await sut.setCheckedPartOfState(false);
//   expect(await sut.getCheckedPartOfState(), 'to be false');

//   // -- Check when not checked

//   await sut.setCheckedPartOfState(false);
//   expect(await sut.getCheckedPartOfState(), 'to be false');

//   await sut.setCheckedPartOfState(true);
//   expect(await sut.getCheckedPartOfState(), 'to be true');
// });

// test("040 It should allow assert on whether input is checked using '#expectIsChecked()'", async () => {
//   const { knob, sut } = await getHelperFragments('checked');

//   // -- Successful case

//   await knob.clickItem({ value: 'true' });
//   await sut.hover();
//   await sut.expectIsChecked();

//   // -- Failing case

//   await knob.clickItem({ value: 'false' });
//   await sut.hover();

//   let isThrown = false;

//   try {
//     await sut.expectIsChecked();
//   }
//   catch (e) {
//     expect(
//       e.errMsg,
//       'to match',
//       /AssertionError:.+\.checkable-input.+must have BEM modifier 'checked,'.+but it doesn't/
//     );

//     isThrown = true;
//   }

//   expect(isThrown, 'to be true');
// });
