/**
 * Group input fragment doesn't represent concrete widget and used to aggregate
 * common functionality of fragments for concrete group input widgets, and
 * because of that it tested using checkbox group input fragment.
 */

import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import CheckboxGroupInput from '../../../../../src/js/widgets/checkbox-group-input';
import GroupInputItem from '../../../../../src/js/widgets/group-input/item';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

const expect = unexpected.clone();
expect.use(unexpectedSinon);

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getRgi(cid, parent) {
  const rgi = new RadioGroupInput({ cid, parent });
  await rgi.expectIsExist();
  return rgi;
}

async function getSut(parent) {
  const group = new CheckboxGroupInput({
    idx: 0,
    parent: parent || await getInteractiveExample()
  });

  await group.expectIsExist();
  return group;
}

async function getHelperFragments(rgiCid) {
  const ie = await getInteractiveExample();
  return [
    await getSut(ie),
    await getRgi(rgiCid, ie),
    ie
  ];
}

fixture `Widgets :: Group Input :: 010 Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input');

test("010 It should allow obtain radio group input", async () => {
  const parent = await getInteractiveExample();

  const cgi = new CheckboxGroupInput({ idx: 0, parent });
  await cgi.expectIsExist();
});

test("020 It should allow get group's 'Columns' part of state using `#getColumnsPartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('columns');

  // -- Check when no columns

  await group.hover();
  expect(await group.getColumnsPartOfState(), 'to be undefined');

  // -- Check when button

  await rgi.clickItem({ label: '3' });
  await group.hover();
  expect(await group.getColumnsPartOfState(), 'to equal', '3');

  // -- Check when native

  await rgi.clickItem({ label: '5' });
  await group.hover();
  expect(await group.getColumnsPartOfState(), 'to equal', '5');
});

test("030 It should allow assert on group's 'Columns' part of state value using `#expectColumnsPartOfStateIs()`", async () => {
  const [group, rgi] = await getHelperFragments('columns');

  // -- Successful case

  // TODO Uncomment after https://github.com/mt0erfztxt/nebula-test-fragment/issues/8
  //      resolved.
  //   await rgi.clickItem({ label: 'nil' });
  //   await group.hover();
  //   await group.expectColumnsPartOfStateIs(void(0));

  await rgi.clickItem({ label: '5' });
  await group.hover();
  await group.expectColumnsPartOfStateIs(5);

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectColumnsPartOfStateIs('3');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'columns,3'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on group's 'Columns' part of state value using `#expectColumnsPartOfStateIs()` - with 'isNot' option set", async () => {
  const [group, rgi] = await getHelperFragments('columns');

  // -- Successful case

  await rgi.clickItem({ label: '5' });

  // TODO Uncomment after https://github.com/mt0erfztxt/nebula-test-fragment/issues/8
  //      resolved.
  //   await group.hover();
  //   await group.expectColumnsPartOfStateIsNot(void(0));

  await group.hover();
  await group.expectColumnsPartOfStateIs('3', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectColumnsPartOfStateIs('5', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'columns,5'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get group's 'Disabled' part of state using `#getDisabledPartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('disabled');

  // -- Check when enabled

  await group.hover();
  expect(await group.getDisabledPartOfState(), 'to be false');

  // -- Check when disabled

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getDisabledPartOfState(), 'to be true');
});

test("060 It should allow assert on whether group is disabled using `#expectIsDisabled()`", async () => {
  const [group, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether group isn't disabled using `#expectIsNotDisabled()`", async () => {
  const [group, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await group.hover();
  await group.expectIsNotDisabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotDisabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on whether group is enabled using `#expectIsEnabled()`", async () => {
  const [group, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await group.hover();
  await group.expectIsEnabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'disabled,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("090 It should allow assert on whether group isn't enabled using `#expectIsNotEnabled()`", async () => {
  const [group, rgi] = await getHelperFragments('disabled');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsNotEnabled();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsNotEnabled();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'disabled,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow get group's 'Equidistant' part of state using `#getEquidistantPartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('equidistant');

  // -- Check when not equidistant

  await group.hover();
  expect(await group.getEquidistantPartOfState(), 'to be false');

  // -- Check when equidistant

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getEquidistantPartOfState(), 'to be true');
});

test("110 It should allow assert on whether group is equidistant using `#expectIsEquidistant()`", async () => {
  const [group, rgi] = await getHelperFragments('equidistant');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsEquidistant();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsEquidistant();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'equidistant,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("120 It should allow assert on whether group isn't equidistant using `#expectIsNotEquidistant()`", async () => {
  const [group, rgi] = await getHelperFragments('equidistant');

  // -- Successful case

  await group.hover();
  await group.expectIsNotEquidistant();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotEquidistant();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'equidistant,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow get group's 'Inline' part of state using `#getInlinePartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('inline');

  // -- Check when not inline

  await group.hover();
  expect(await group.getInlinePartOfState(), 'to be false');

  // -- Check when inline

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getInlinePartOfState(), 'to be true');
});

test("140 It should allow assert on whether group is inline using `#expectIsInline()`", async () => {
  const [group, rgi] = await getHelperFragments('inline');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsInline();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'inline,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("150 It should allow assert on whether group isn't inline using `#expectIsNotInline()`", async () => {
  const [group, rgi] = await getHelperFragments('inline');

  // -- Successful case

  await group.hover();
  await group.expectIsNotInline();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'inline,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("160 It should allow get group's 'Invalid' part of state using `#getInvalidPartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('invalid');

  // -- Check when not invalid

  await group.hover();
  expect(await group.getInvalidPartOfState(), 'to be false');

  // -- Check when invalid

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getInvalidPartOfState(), 'to be true');
});

test("170 It should allow assert on whether group is invalid using `#expectIsInvalid()`", async () => {
  const [group, rgi] = await getHelperFragments('invalid');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsInvalid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsInvalid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'invalid,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("180 It should allow assert on whether group isn't invalid using `#expectIsNotInvalid()`", async () => {
  const [group, rgi] = await getHelperFragments('invalid');

  // -- Successful case

  await group.hover();
  await group.expectIsNotInvalid();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotInvalid();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'invalid,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("190 It should allow get group's 'NoRowGap' part of state using `#getNoRowGapPartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('no-row-gap');

  // -- Check when not noRowGap

  await group.hover();
  expect(await group.getNoRowGapPartOfState(), 'to be false');

  // -- Check when noRowGap

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getNoRowGapPartOfState(), 'to be true');
});

test("200 It should allow assert on whether group is noRowGap using `#expectIsNoRowGap()`", async () => {
  const [group, rgi] = await getHelperFragments('no-row-gap');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsNoRowGap();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsNoRowGap();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'noRowGap,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("210 It should allow assert on whether group isn't noRowGap using `#expectIsNotNoRowGap()`", async () => {
  const [group, rgi] = await getHelperFragments('no-row-gap');

  // -- Successful case

  await group.hover();
  await group.expectIsNotNoRowGap();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotNoRowGap();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'noRowGap,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("220 It should allow get group's 'Size' part of state using `#getSizePartOfState()`", async () => {
  const group = await getSut();
  await group.hover();
  expect(await group.getSizePartOfState(), 'to equal', 'normal');
});

test("230 It should allow assert on group's 'Size' part of state value using `#expectSizePartOfStateIs()`", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectSizePartOfStateIs('normal');

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectSizePartOfStateIs('small');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'size,small'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("240 It should allow assert on group's 'Size' part of state value using `#expectSizePartOfStateIs()` - with 'isNot' option set", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectSizePartOfStateIs('small', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectSizePartOfStateIs('normal', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'size,normal'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("250 It should allow get group's 'SoftColumns' part of state using `#getSoftColumnsPartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('soft-columns');

  // -- Check when not soft columns

  await group.hover();
  expect(await group.getSoftColumnsPartOfState(), 'to be false');

  // -- Check when soft columns

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getSoftColumnsPartOfState(), 'to be true');
});

test("260 It should allow assert on whether group is soft columns using `#expectIsSoftColumns()`", async () => {
  const [group, rgi] = await getHelperFragments('soft-columns');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsSoftColumns();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsSoftColumns();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'softColumns,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("270 It should allow assert on whether group isn't soft columns using `#expectIsNotSoftColumns()`", async () => {
  const [group, rgi] = await getHelperFragments('soft-columns');

  // -- Successful case

  await group.hover();
  await group.expectIsNotSoftColumns();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotSoftColumns();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'softColumns,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("280 It should allow get group's 'StackedOnMobile' part of state using `#getStackedOnMobilePartOfState()`", async () => {
  const [group, rgi] = await getHelperFragments('stacked-on-mobile');

  // -- Check when not stacked-on-mobile

  await group.hover();
  expect(await group.getStackedOnMobilePartOfState(), 'to be false');

  // -- Check when stacked-on-mobile

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  expect(await group.getStackedOnMobilePartOfState(), 'to be true');
});

test("290 It should allow assert on whether group is stacked on mobile using `#expectIsStackedOnMobile()`", async () => {
  const [group, rgi] = await getHelperFragments('stacked-on-mobile');

  // -- Successful case

  await rgi.clickItem({ label: 'true' });
  await group.hover();
  await group.expectIsStackedOnMobile();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'false' });
  await group.hover();

  try {
    await group.expectIsStackedOnMobile();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'stackedOnMobile,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("300 It should allow assert on whether group isn't stacked on mobile using `#expectIsNotStackedOnMobile()`", async () => {
  const [group, rgi] = await getHelperFragments('stacked-on-mobile');

  // -- Successful case

  await group.hover();
  await group.expectIsNotStackedOnMobile();

  // -- Failing case

  let isThrown = false;

  await rgi.clickItem({ label: 'true' });
  await group.hover();

  try {
    await group.expectIsNotStackedOnMobile();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'stackedOnMobile,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("310 It should allow get group's 'Widget' part of state using `#getWidgetPartOfState()`", async () => {
  const group = await getSut();
  await group.hover();
  expect(await group.getWidgetPartOfState(), 'to equal', 'icon');
});

test("320 It should allow assert on group's 'Widget' part of state value using `#expectWidgetPartOfStateIs()`", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectWidgetPartOfStateIs('icon');

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectWidgetPartOfStateIs('native');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must have BEM modifier 'widget,native'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("330 It should allow assert on group's 'Widget' part of state value using `#expectWidgetPartOfStateIs()` - with 'isNot' option set", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectWidgetPartOfStateIs('button', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectWidgetPartOfStateIs('icon', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkbox-group-input.+must not have BEM modifier 'widget,icon'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("340 It should allow assert on item existence using `#expectHasItem()`", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectHasItem({ label: 'option3' });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectHasItem({ label: 'non-existent option' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("350 It should allow assert on item existence using `#expectHasItem()` - case with 'idx' option", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectHasItem({ label: 'option3' }, null, { idx: 2 });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectHasItem({ label: 'option3' }, null, { idx: 0 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.item#expectIsEqual().+: expected 'option3' to deeply equal 'option1'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("360 It should allow assert on items existence using `#expectHasItems()`", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectHasItems([
    [{ label: 'option6' }],
    [{ label: 'option1' }],
    [{ label: 'option4' }]
  ]);

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectHasItems([
      [{ label: 'option2' }], // this item has different label
      [{ label: 'option1' }],
      [{ label: 'option4' }],
      [{ label: 'option3' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("370 It should allow assert on items existence using `#expectHasItems()` - case with 'only' option", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectHasItems([
    [{ label: 'option2 (some long text here)' }],
    [{ label: 'option4' }],
    [{ label: 'option8' }],
    [{ label: 'option9' }],
    [{ label: 'option7' }],
    [{ label: 'option5' }],
    [{ label: 'option6' }],
    [{ label: 'option1' }],
    [{ label: 'option3' }]
  ], {
    only: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectHasItems([
      // Omit 'option2...' item for testing.
      [{ label: 'option4' }],
      [{ label: 'option8' }],
      [{ label: 'option9' }],
      [{ label: 'option7' }],
      [{ label: 'option5' }],
      [{ label: 'option6' }],
      [{ label: 'option1' }],
      [{ label: 'option3' }]
    ], {
      only: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: expected 9 to deeply equal 8/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("380 It should allow assert on items existence using `#expectHasItems()` - case with 'sameOrder' option", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectHasItems([
    [{ label: 'option1' }],
    [{ label: 'option2 (some long text here)' }],
    [{ label: 'option3' }],
    [{ label: 'option4' }],
    [{ label: 'option5' }],
    [{ label: 'option6' }],
    [{ label: 'option7' }],
    [{ label: 'option8' }],
    [{ label: 'option9' }]
  ], {
    only: true,
    sameOrder: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectHasItems([
      [{ label: 'option1' }],
      [{ label: 'option2 (some long text here)' }],
      [{ label: 'option3' }],
      [{ label: 'option5' }], // swap 'option4' and 'option5' items for testing
      [{ label: 'option4' }],
      [{ label: 'option6' }],
      [{ label: 'option7' }],
      [{ label: 'option8' }],
      [{ label: 'option9' }]
    ], {
      only: true,
      sameOrder: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.item#expectIsEqual().+: expected 'option5' to deeply equal 'option4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("390 It should allow assert on item's index using `#expectItemIndexIs()`", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectItemIndexIs({ label: 'option3' }, null, 2);

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectItemIndexIs({ label: 'option3' }, null, 3);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.item#expectIsEqual().+: expected 'option3' to deeply equal 'option4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("400 It should allow assert on items existence at specified indexes using `#expectItemsAre()`", async () => {
  const group = await getSut();
  const expectHasItemsSpy = sinon.spy(group, 'expectHasItems');
  const items = [
    [{ label: 'option1' }],
    [{ label: 'option2 (some long text here)' }],
    [{ label: 'option3' }],
    [{ label: 'option4' }],
    [{ label: 'option5' }],
    [{ label: 'option6' }],
    [{ label: 'option7' }],
    [{ label: 'option8' }],
    [{ label: 'option9' }]
  ];

  await group.hover();
  await group.expectItemsAre(items);

  expect(expectHasItemsSpy, 'was called times', 1);
  expect(expectHasItemsSpy, 'to have a call satisfying', {
    args: [
      items,
      {
        only: true,
        sameOrder: true
      }
    ]
  });
});

test("410 It should allow assert on number of items using `#expectItemsCountIs()` - simple case", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectItemsCountIs(9);

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectItemsCountIs(1);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 9 to deeply equal 1'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("420 It should allow assert on number of items using `#expectItemsCountIs()` - simple case with 'isNot' option", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectItemsCountIs(1, { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectItemsCountIs(9, { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 9 to not deeply equal 9'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("430 It should allow assert on number of items using `#expectItemsCountIs()` - complex case", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectItemsCountIs(['gt', 2]);
  await group.expectItemsCountIs(['gte', 9]);
  await group.expectItemsCountIs(['lt', 10]);

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectItemsCountIs(['gte', 10]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 9 to be at least 10'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("440 It should allow assert on number of items using `#expectItemsCountIs()` - complex case with 'isNot' option", async () => {
  const group = await getSut();

  // -- Successful case

  await group.hover();
  await group.expectItemsCountIs(['lt', 9], { isNot: true });
  await group.expectItemsCountIs(['gte', 10], { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await group.expectItemsCountIs(['lt', 10], { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 9 to be at least 10'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("450 It should allow obtain item using `#getItem()`", async () => {
  const group = await getSut();
  expect(group.getItem({ idx: 0 }), 'to be a', GroupInputItem);
});
