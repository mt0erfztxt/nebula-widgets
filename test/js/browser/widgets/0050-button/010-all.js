import expect from 'unexpected';

import Button from '../../../../../src/js/widgets/button';
import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';

fixture `Widgets :: Button :: 010 All`
  .page('http://localhost:3449/widgets/button');

test("010 It should allow obtain button", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const button = new Button({ cid: '010', parent: example010 });
  await button.expectIsExist();
  await button.hover();
});

test("020 It should allow obtain button - case of custom 'text' spec", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const button1 = new Button({ parent: example010, text: 'DISABLED' });
  await button1.expectIsExist();
  await button1.hover();

  const button2 = new Button({ parent: example010, text: /isable/i });
  await button2.expectIsExist();
  await button2.hover();
});

test("030 It should allow get button's 'Disabled' part of state using `#getDisabledPartOfState()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const enabledButton = new Button({ cid: '010', parent: example010 });
  await enabledButton.expectIsExist();
  await enabledButton.hover();
  expect(await enabledButton.getDisabledPartOfState(), 'to be false');

  const disabledButton = new Button({ cid: '020', parent: example010 });
  await disabledButton.expectIsExist();
  await enabledButton.hover();
  expect(await disabledButton.getDisabledPartOfState(), 'to be true');
});

test("040 It should allow assert on whether button is disabled using `#expectIsDisabled()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const disabledButton = new Button({ cid: '020', parent: example010 });
  await disabledButton.expectIsExist();
  await disabledButton.hover();
  await disabledButton.expectIsDisabled();

  // -- Failing case

  let isThrown = false;

  const enabledButton = new Button({ cid: '010', parent: example010 });
  await enabledButton.expectIsExist();
  await enabledButton.hover();

  try {
    await enabledButton.expectIsDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on whether button isn't disabled using `#expectIsNotDisabled()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const enabledButton = new Button({ cid: '010', parent: example010 });
  await enabledButton.expectIsExist();
  await enabledButton.hover();
  await enabledButton.expectIsNotDisabled();

  // -- Failing case

  let isThrown = false;

  const disabledButton = new Button({ cid: '020', parent: example010 });
  await disabledButton.expectIsExist();
  await disabledButton.hover();

  try {
    await disabledButton.expectIsNotDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("060 It should allow assert on whether button is enabled using `#expectIsEnabled()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const enabledButton = new Button({ cid: '010', parent: example010 });
  await enabledButton.expectIsExist();
  await enabledButton.hover();
  await enabledButton.expectIsEnabled();

  // -- Failing case

  let isThrown = false;

  const disabledButton = new Button({ cid: '020', parent: example010 });
  await disabledButton.expectIsExist();
  await disabledButton.hover();

  try {
    await disabledButton.expectIsEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether button isn't enabled using `#expectIsNotEnabled()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const disabledButton = new Button({ cid: '020', parent: example010 });
  await disabledButton.expectIsExist();
  await disabledButton.hover();
  await disabledButton.expectIsNotEnabled();

  // -- Failing case

  let isThrown = false;

  const enabledButton = new Button({ cid: '010', parent: example010 });
  await enabledButton.expectIsExist();
  await enabledButton.hover();

  try {
    await enabledButton.expectIsNotEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow get button's 'Flat' part of state using `#getFlatPartOfState()`", async () => {
  const example020 = new ManPageExample({ cid: '020' });
  await example020.expectIsExist();

  const flatButton = new Button({ cid: '010', parent: example020 });
  await flatButton.expectIsExist();
  await flatButton.hover();
  expect(await flatButton.getFlatPartOfState(), 'to be true');

  // --

  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notFlatButton = new Button({ cid: '010', parent: example010 });
  await notFlatButton.expectIsExist();
  await flatButton.hover();
  expect(await notFlatButton.getFlatPartOfState(), 'to be false');
});

test("090 It should allow assert on whether button is flat using `#expectIsFlat()`", async () => {
  const example020 = new ManPageExample({ cid: '020' });
  await example020.expectIsExist();

  const flatButton = new Button({ cid: '020', parent: example020 });
  await flatButton.expectIsExist();
  await flatButton.hover();
  await flatButton.expectIsFlat();

  // -- Failing case

  let isThrown = false;

  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notFlatButton = new Button({ cid: '010', parent: example010 });
  await notFlatButton.expectIsExist();
  await notFlatButton.hover();

  try {
    await notFlatButton.expectIsFlat();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must have BEM modifier 'flat,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on whether button isn't flat using `#expectIsNotFlat()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notFlatButton = new Button({ cid: '010', parent: example010 });
  await notFlatButton.expectIsExist();
  await notFlatButton.hover();
  await notFlatButton.expectIsNotFlat();

  // -- Failing case

  let isThrown = false;

  const example020 = new ManPageExample({ cid: '020' });
  await example020.expectIsExist();

  const flatButton = new Button({ cid: '020', parent: example020 });
  await flatButton.expectIsExist();
  await flatButton.hover();

  try {
    await flatButton.expectIsNotFlat();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must not have BEM modifier 'flat,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow get button's 'Primary' part of state using `#getPrimaryPartOfState()`", async () => {
  const example030 = new ManPageExample({ cid: '030' });
  await example030.expectIsExist();

  const primaryButton = new Button({ cid: '010', parent: example030 });
  await primaryButton.expectIsExist();
  await primaryButton.hover();
  expect(await primaryButton.getPrimaryPartOfState(), 'to be true');

  // --

  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notPrimaryButton = new Button({ cid: '010', parent: example010 });
  await notPrimaryButton.expectIsExist();
  await primaryButton.hover();
  expect(await notPrimaryButton.getPrimaryPartOfState(), 'to be false');
});

test("120 It should allow assert on whether button is primary using `#expectIsPrimary()`", async () => {
  const example030 = new ManPageExample({ cid: '030' });
  await example030.expectIsExist();

  const primaryButton = new Button({ cid: '020', parent: example030 });
  await primaryButton.expectIsExist();
  await primaryButton.hover();
  await primaryButton.expectIsPrimary();

  // -- Failing case

  let isThrown = false;

  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notPrimaryButton = new Button({ cid: '010', parent: example010 });
  await notPrimaryButton.expectIsExist();
  await notPrimaryButton.hover();

  try {
    await notPrimaryButton.expectIsPrimary();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must have BEM modifier 'primary,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow assert on whether button isn't primary using `#expectIsNotPrimary()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notPrimaryButton = new Button({ cid: '010', parent: example010 });
  await notPrimaryButton.expectIsExist();
  await notPrimaryButton.hover();
  await notPrimaryButton.expectIsNotPrimary();

  // -- Failing case

  let isThrown = false;

  const example030 = new ManPageExample({ cid: '030' });
  await example030.expectIsExist();

  const primaryButton = new Button({ cid: '020', parent: example030 });
  await primaryButton.expectIsExist();
  await primaryButton.hover();

  try {
    await primaryButton.expectIsNotPrimary();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must not have BEM modifier 'primary,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow get button's 'Secondary' part of state using `#getSecondaryPartOfState()`", async () => {
  const example040 = new ManPageExample({ cid: '040' });
  await example040.expectIsExist();

  const secondaryButton = new Button({ cid: '010', parent: example040 });
  await secondaryButton.expectIsExist();
  await secondaryButton.hover();
  expect(await secondaryButton.getSecondaryPartOfState(), 'to be true');

  // --

  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notsecondaryButton = new Button({ cid: '010', parent: example010 });
  await notsecondaryButton.expectIsExist();
  await notsecondaryButton.hover();
  expect(await notsecondaryButton.getSecondaryPartOfState(), 'to be false');
});

test("150 It should allow assert on whether button is secondary using `#expectIsSecondary()`", async () => {
  const example040 = new ManPageExample({ cid: '040' });
  await example040.expectIsExist();

  const secondaryButton = new Button({ cid: '020', parent: example040 });
  await secondaryButton.expectIsExist();
  await secondaryButton.hover();
  await secondaryButton.expectIsSecondary();

  // -- Failing case

  let isThrown = false;

  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notSecondaryButton = new Button({ cid: '010', parent: example010 });
  await notSecondaryButton.expectIsExist();
  await notSecondaryButton.hover();

  try {
    await notSecondaryButton.expectIsSecondary();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must have BEM modifier 'secondary,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("160 It should allow assert on whether button isn't secondary using `#expectIsNotSecondary()`", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const notSecondaryButton = new Button({ cid: '010', parent: example010 });
  await notSecondaryButton.expectIsExist();
  await notSecondaryButton.hover();
  await notSecondaryButton.expectIsNotSecondary();

  // -- Failing case

  let isThrown = false;

  const example040 = new ManPageExample({ cid: '040' });
  await example040.expectIsExist();

  const secondaryButton = new Button({ cid: '020', parent: example040 });
  await secondaryButton.expectIsExist();
  await secondaryButton.hover();

  try {
    await secondaryButton.expectIsNotSecondary();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.button.+must not have BEM modifier 'secondary,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
