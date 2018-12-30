import expect from 'unexpected';
import { camelCase } from 'change-case';

import Button from '../../../../../src/js/widgets/button';
import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
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
 * @returns {Promise<CheckableGroupInput>}
 */
async function getSut(parent) {
  const sut = new Button({ idx: 0 }, {
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

fixture('Widgets :: Button :: 010 Fragment')
  .page('http://localhost:3449/widgets/button');

test("010 It should allow obtain button", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new Button({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

// test("020 It should allow obtain button - case of custom 'text' spec", async () => {
//   const example010 = new ManPageExample({ cid: '010' });
//   await example010.expectIsExist();

//   const button1 = new Button({ parent: example010, text: 'DISABLED' });
//   await button1.expectIsExist();
//   await button1.hover();

//   const button2 = new Button({ parent: example010, text: /isable/i });
//   await button2.expectIsExist();
//   await button2.hover();
// });

// test("030 It should allow get button's 'Disabled' part of state using `#getDisabledPartOfState()`", async () => {
//   const example010 = new ManPageExample({ cid: '010' });
//   await example010.expectIsExist();

//   const enabledButton = new Button({ cid: '010', parent: example010 });
//   await enabledButton.expectIsExist();
//   await enabledButton.hover();
//   expect(await enabledButton.getDisabledPartOfState(), 'to be false');

//   const disabledButton = new Button({ cid: '020', parent: example010 });
//   await disabledButton.expectIsExist();
//   await enabledButton.hover();
//   expect(await disabledButton.getDisabledPartOfState(), 'to be true');
// });

// test("040 It should allow assert on whether button is disabled using `#expectIsDisabled()`", async () => {
//   const example010 = new ManPageExample({ cid: '010' });
//   await example010.expectIsExist();

//   const disabledButton = new Button({ cid: '020', parent: example010 });
//   await disabledButton.expectIsExist();
//   await disabledButton.hover();
//   await disabledButton.expectIsDisabled();

//   // -- Failing case

//   let isThrown = false;

//   const enabledButton = new Button({ cid: '010', parent: example010 });
//   await enabledButton.expectIsExist();
//   await enabledButton.hover();

//   try {
//     await enabledButton.expectIsDisabled();
//   }
//   catch (e) {
//     expect(
//       e.errMsg,
//       'to match',
//       /AssertionError:.+\.button.+must have BEM modifier 'disabled,'.+but it doesn't/
//     );

//     isThrown = true;
//   }

//   expect(isThrown, 'to be true');
// });

// test("050 It should allow assert on whether button isn't disabled using `#expectIsNotDisabled()`", async () => {
//   const example010 = new ManPageExample({ cid: '010' });
//   await example010.expectIsExist();

//   const enabledButton = new Button({ cid: '010', parent: example010 });
//   await enabledButton.expectIsExist();
//   await enabledButton.hover();
//   await enabledButton.expectIsNotDisabled();

//   // -- Failing case

//   let isThrown = false;

//   const disabledButton = new Button({ cid: '020', parent: example010 });
//   await disabledButton.expectIsExist();
//   await disabledButton.hover();

//   try {
//     await disabledButton.expectIsNotDisabled();
//   }
//   catch (e) {
//     expect(
//       e.errMsg,
//       'to match',
//       /AssertionError:.+\.button.+must not have BEM modifier 'disabled,'.+but it does/
//     );

//     isThrown = true;
//   }

//   expect(isThrown, 'to be true');
// });

// test("060 It should allow assert on whether button is enabled using `#expectIsEnabled()`", async () => {
//   const example010 = new ManPageExample({ cid: '010' });
//   await example010.expectIsExist();

//   const enabledButton = new Button({ cid: '010', parent: example010 });
//   await enabledButton.expectIsExist();
//   await enabledButton.hover();
//   await enabledButton.expectIsEnabled();

//   // -- Failing case

//   let isThrown = false;

//   const disabledButton = new Button({ cid: '020', parent: example010 });
//   await disabledButton.expectIsExist();
//   await disabledButton.hover();

//   try {
//     await disabledButton.expectIsEnabled();
//   }
//   catch (e) {
//     expect(
//       e.errMsg,
//       'to match',
//       /AssertionError:.+\.button.+must not have BEM modifier 'disabled,'.+but it does/
//     );

//     isThrown = true;
//   }

//   expect(isThrown, 'to be true');
// });

// test("070 It should allow assert on whether button isn't enabled using `#expectIsNotEnabled()`", async () => {
//   const example010 = new ManPageExample({ cid: '010' });
//   await example010.expectIsExist();

//   const disabledButton = new Button({ cid: '020', parent: example010 });
//   await disabledButton.expectIsExist();
//   await disabledButton.hover();
//   await disabledButton.expectIsNotEnabled();

//   // -- Failing case

//   let isThrown = false;

//   const enabledButton = new Button({ cid: '010', parent: example010 });
//   await enabledButton.expectIsExist();
//   await enabledButton.hover();

//   try {
//     await enabledButton.expectIsNotEnabled();
//   }
//   catch (e) {
//     expect(
//       e.errMsg,
//       'to match',
//       /AssertionError:.+\.button.+must have BEM modifier 'disabled,'.+but it doesn't/
//     );

//     isThrown = true;
//   }

//   expect(isThrown, 'to be true');
// });
