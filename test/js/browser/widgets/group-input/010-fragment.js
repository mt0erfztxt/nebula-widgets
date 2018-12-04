/**
 * Group input fragment doesn't represent concrete widget and used to aggregate
 * common functionality of fragments for concrete group input widgets, and
 * because of that it tested using radio group input fragment.
 */

import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'
import RadioInput from '../../../../../src/js/widgets/radio-input'

const expect = unexpected.clone();
expect.use(unexpectedSinon);

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const rgi = new RadioGroupInput({ cid }, { parent });
  await rgi.expectIsExist();
  return rgi;
}

async function getSut(parent) {
  const ri = new RadioGroupInput({ idx: 0 }, {
    parent: parent || await new InteractiveExample().viewElementSelector,
  });

  await ri.expectIsExist();
  return ri;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    parent: parent.viewElementSelector,
    sut: await getSut(parent)
  };
}

fixture('Widgets :: Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should allow obtain group input", async () => {
  const parent = await getInteractiveExample();
  const sut = new RadioGroupInput({ idx: 0 }, { parent });
  await sut.expectIsExist();
});

test("020 It should alloW get group's 'Columns' part of state using '#getColumnsPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('columns');

  // -- Check when no columns

  await sut.hover();
  expect(await sut.getColumnsPartOfState(), 'to be undefined');

  // -- Check when three columns

  await knob.clickItem({ value: '3' });
  await sut.hover();
  expect(await sut.getColumnsPartOfState(), 'to equal', '3');

  // -- Check when five columns

  await knob.clickItem({ value: '5' });
  await sut.hover();
  expect(await sut.getColumnsPartOfState(), 'to equal', '5');
});

test("030 It should allow assert on group's 'Columns' part of state value using '#expectColumnsPartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('columns');

  // -- Successful case

  // TODO Uncomment after https://github.com/mt0erfztxt/nebula-test-fragment/issues/8
  //      resolved.
  // await rgi.clickItem({ value: 'nil' });
  // await group.hover();
  // await group.expectColumnsPartOfStateIs(void(0));

  await knob.clickItem({ value: '5' });
  await sut.hover();
  await sut.expectColumnsPartOfStateIs(5);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectColumnsPartOfStateIs('3');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must have BEM modifier 'columns,3'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on group's 'Columns' part of state value using '#expectColumnsPartOfStateIs()' - with 'isNot' option set", async () => {
  const { knob, sut } = await getHelperFragments('columns');

  // -- Successful case

  await knob.clickItem({ value: '5' });

  // TODO Uncomment after https://github.com/mt0erfztxt/nebula-test-fragment/issues/8
  //      resolved.
  // await group.hover();
  // await group.expectColumnsPartOfStateIsNot(void(0));

  await sut.hover();
  await sut.expectColumnsPartOfStateIs('3', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectColumnsPartOfStateIs('5', { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must not have BEM modifier 'columns,5'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get group's 'Equidistant' part of state using '#getEquidistantPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('equidistant');

  // -- Check when not equidistant

  await sut.hover();
  expect(await sut.getEquidistantPartOfState(), 'to be false');

  // -- Check when equidistant

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getEquidistantPartOfState(), 'to be true');
});

test("060 It should allow assert on whether group is equidistant using '#expectIsEquidistant()'", async () => {
  const { knob, sut } = await getHelperFragments('equidistant');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsEquidistant();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsEquidistant();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must have BEM modifier 'equidistant,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether group isn't equidistant using '#expectIsNotEquidistant()'", async () => {
  const { knob, sut } = await getHelperFragments('equidistant');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotEquidistant();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotEquidistant();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must not have BEM modifier 'equidistant,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow get group's 'Inline' part of state using '#getInlinePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('inline');

  // -- Check when not inline

  await sut.hover();
  expect(await sut.getInlinePartOfState(), 'to be false');

  // -- Check when inline

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getInlinePartOfState(), 'to be true');
});

test("090 It should allow assert on whether group is inline using '#expectIsInline()'", async () => {
  const { knob, sut } = await getHelperFragments('inline');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsInline();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must have BEM modifier 'inline,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on whether group isn't inline using '#expectIsNotInline()'", async () => {
  const { knob, sut } = await getHelperFragments('inline');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotInline();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must not have BEM modifier 'inline,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow get group's 'NoRowGap' part of state using '#getNoRowGapPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('no-row-gap');

  // -- Check when not noRowGap

  await sut.hover();
  expect(await sut.getNoRowGapPartOfState(), 'to be false');

  // -- Check when noRowGap

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getNoRowGapPartOfState(), 'to be true');
});

test("120 It should allow assert on whether group is noRowGap using '#expectIsNoRowGap()'", async () => {
  const { knob, sut } = await getHelperFragments('no-row-gap');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsNoRowGap();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNoRowGap();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must have BEM modifier 'noRowGap,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow assert on whether group isn't noRowGap using '#expectIsNotNoRowGap()'", async () => {
  const { knob, sut } = await getHelperFragments('no-row-gap');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotNoRowGap();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotNoRowGap();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must not have BEM modifier 'noRowGap,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow get group's 'SoftColumns' part of state using '#getSoftColumnsPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('soft-columns');

  // -- Check when not soft columns

  await sut.hover();
  expect(await sut.getSoftColumnsPartOfState(), 'to be false');

  // -- Check when soft columns

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getSoftColumnsPartOfState(), 'to be true');
});

test("150 It should allow assert on whether group is soft columns using '#expectIsSoftColumns()'", async () => {
  const { knob, sut } = await getHelperFragments('soft-columns');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsSoftColumns();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsSoftColumns();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must have BEM modifier 'softColumns,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("160 It should allow assert on whether group isn't soft columns using '#expectIsNotSoftColumns()'", async () => {
  const { knob, sut } = await getHelperFragments('soft-columns');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotSoftColumns();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotSoftColumns();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must not have BEM modifier 'softColumns,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("170 It should allow get group's 'StackedOnMobile' part of state using '#getStackedOnMobilePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('stacked-on-mobile');

  // -- Check when not stacked-on-mobile

  await sut.hover();
  expect(await sut.getStackedOnMobilePartOfState(), 'to be false');

  // -- Check when stacked-on-mobile

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getStackedOnMobilePartOfState(), 'to be true');
});

test("180 It should allow assert on whether group is stacked on mobile using '#expectIsStackedOnMobile()'", async () => {
  const { knob, sut } = await getHelperFragments('stacked-on-mobile');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsStackedOnMobile();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsStackedOnMobile();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must have BEM modifier 'stackedOnMobile,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("190 It should allow assert on whether group isn't stacked on mobile using '#expectIsNotStackedOnMobile()'", async () => {
  const { knob, sut } = await getHelperFragments('stacked-on-mobile');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotStackedOnMobile();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotStackedOnMobile();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.radio-group-input.+must not have BEM modifier 'stackedOnMobile,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("200 It should allow assert on item existence using '#expectHasItem()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItem({ value: 'choice3' });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItem({ value: 'non-existent choice' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-input.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("210 It should allow assert on item existence using '#expectHasItem()' - case with 'idx' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItem({ value: 'choice3' }, null, { idx: 2 });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItem({ value: 'choice3' }, null, { idx: 0 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-input#expectIsEqual().+: expected 'choice3' to deeply equal 'choice1'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("220 It should allow assert on items existence using '#expectHasItems()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItems([
    [{ value: 'choice6' }],
    [{ value: 'choice1' }],
    [{ value: 'choice4' }]
  ]);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      [{ value: 'choice2' }], // this item has different label
      [{ value: 'choice1' }],
      [{ value: 'choice4' }],
      [{ value: 'choice3' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-input.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("230 It should allow assert on items existence using '#expectHasItems()' - case with 'only' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItems([
    [{ value: 'choice2 (some long text here)' }],
    [{ value: 'choice4' }],
    [{ value: 'choice8' }],
    [{ value: 'choice9' }],
    [{ value: 'choice7' }],
    [{ value: 'choice5' }],
    [{ value: 'choice6' }],
    [{ value: 'choice1' }],
    [{ value: 'choice3' }]
  ], {
    only: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      // Omit 'choice2...' item for testing.
      [{ value: 'choice4' }],
      [{ value: 'choice8' }],
      [{ value: 'choice9' }],
      [{ value: 'choice7' }],
      [{ value: 'choice5' }],
      [{ value: 'choice6' }],
      [{ value: 'choice1' }],
      [{ value: 'choice3' }]
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

test("240 It should allow assert on items existence using '#expectHasItems()' - case with 'sameOrder' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItems([
    [{ value: 'choice1' }],
    [{ value: 'choice2 (some long text here)' }],
    [{ value: 'choice3' }],
    [{ value: 'choice4' }],
    [{ value: 'choice5' }],
    [{ value: 'choice6' }],
    [{ value: 'choice7' }],
    [{ value: 'choice8' }],
    [{ value: 'choice9' }]
  ], {
    only: true,
    sameOrder: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      [{ value: 'choice1' }],
      [{ value: 'choice2 (some long text here)' }],
      [{ value: 'choice3' }],
      [{ value: 'choice5' }], // swap 'choice4' and 'choice5' items for testing
      [{ value: 'choice4' }],
      [{ value: 'choice6' }],
      [{ value: 'choice7' }],
      [{ value: 'choice8' }],
      [{ value: 'choice9' }]
    ], {
      only: true,
      sameOrder: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-input#expectIsEqual().+: expected 'choice5' to deeply equal 'choice4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("250 It should allow assert on item's index using '#expectItemIndexIs()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemIndexIs({ value: 'choice3' }, null, 2);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemIndexIs({ value: 'choice3' }, null, 3);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-input#expectIsEqual().+: expected 'choice3' to deeply equal 'choice4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("260 It should allow assert on items existence at specified indexes using '#expectItemsAre()'", async () => {
  const sut = await getSut();
  const expectHasItemsSpy = sinon.spy(sut, 'expectHasItems');
  const items = [
    [{ value: 'choice1' }],
    [{ value: 'choice2 (some long text here)' }],
    [{ value: 'choice3' }],
    [{ value: 'choice4' }],
    [{ value: 'choice5' }],
    [{ value: 'choice6' }],
    [{ value: 'choice7' }],
    [{ value: 'choice8' }],
    [{ value: 'choice9' }]
  ];

  await sut.hover();
  await sut.expectItemsAre(items);

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

test("270 It should allow assert on number of items using '#expectItemsCountIs()' - simple case", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemsCountIs(9);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsCountIs(1);
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

test("280 It should allow assert on number of items using '#expectItemsCountIs()' - simple case with 'isNot' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemsCountIs(1, { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsCountIs(9, { isNot: true });
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

test("290 It should allow assert on number of items using '#expectItemsCountIs()' - complex case", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemsCountIs(['gt', 2]);
  await sut.expectItemsCountIs(['gte', 9]);
  await sut.expectItemsCountIs(['lt', 10]);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsCountIs(['gte', 10]);
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

test("300 It should allow assert on number of items using '#expectItemsCountIs()' - complex case with 'isNot' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemsCountIs(['lt', 9], { isNot: true });
  await sut.expectItemsCountIs(['gte', 10], { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsCountIs(['lt', 10], { isNot: true });
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

test("310 It should allow obtain item using '#getItem()'", async () => {
  const sut = await getSut();
  expect(sut.getItem({ idx: 0 }), 'to be a', RadioInput);
});

// TODO Add tests for:
//      1. 'Items' part of state
//      2. 'Value' part of state