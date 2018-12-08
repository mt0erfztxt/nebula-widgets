/**
 * Group input fragment doesn't represent concrete widget and used to aggregate
 * common functionality of fragments for concrete group input widgets, and
 * because of that it tested using checkable group input fragment.
 */

import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import CheckableInput from '../../../../../src/js/widgets/checkable-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

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

fixture('Widgets :: Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/checkable-group-input');

test("010 It should allow obtain group input", async () => {
  const parent = await getInteractiveExample().viewElementSelector;
  const sut = new CheckableGroupInput({ idx: 0 }, { parent });
  await sut.expectIsExist();
});

test("020 It should allow get group's 'Columns' part of state using '#getColumnsPartOfState()'", async () => {
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
  // await knob.clickItem({ value: 'nil' });
  // await sut.hover();
  // await sut.expectColumnsPartOfStateIs(void(0));

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
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'columns,3'.+but it doesn't/
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
  // await sut.hover();
  // await sut.expectColumnsPartOfStateIsNot(void(0));

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
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'columns,5'.+but it does/
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
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'equidistant,'.+but it doesn't/
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
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'equidistant,'.+but it does/
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
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'inline,'.+but it doesn't/
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
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'inline,'.+but it does/
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
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'noRowGap,'.+but it doesn't/
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
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'noRowGap,'.+but it does/
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
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'softColumns,'.+but it doesn't/
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
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'softColumns,'.+but it does/
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
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'stackedOnMobile,'.+but it doesn't/
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
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'stackedOnMobile,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("195 It should allow obtain item using '#getItem()'", async () => {
  const sut = await getSut();
  const item = sut.getItem({ idx: 0 });
  expect(item, 'to be a', CheckableInput);
  await item.expectIsExist();
  await item.hover();
  await item.expectValuePartOfStateIs('option1');
});

test("200 It should allow assert on item existence using '#expectHasItem()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItem({ value: 'option3' });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItem({ value: 'non-existent option' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkable-input.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("210 It should allow assert on item existence using '#expectHasItem()' - case with 'idx' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItem({ value: 'option3' }, null, { idx: 2 });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItem({ value: 'option3' }, null, { idx: 0 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkable-input#expectIsEqual().+: expected 'option3' to deeply equal 'option1'/
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
    [{ value: 'option6' }],
    [{ value: 'option1' }],
    [{ value: 'option4' }]
  ]);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      [{ value: 'option2' }], // this item has different label
      [{ value: 'option1' }],
      [{ value: 'option4' }],
      [{ value: 'option3' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkable-input.+DOM element.+: expected 0 to deeply equal 1/
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
    [{ value: 'option2 (some long text here)' }],
    [{ value: 'option4' }],
    [{ value: 'option8' }],
    [{ value: 'option9' }],
    [{ value: 'option7' }],
    [{ value: 'option5' }],
    [{ value: 'option6' }],
    [{ value: 'option1' }],
    [{ value: 'option3' }]
  ], {
    only: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      // Omit 'option2...' item for testing.
      [{ value: 'option4' }],
      [{ value: 'option8' }],
      [{ value: 'option9' }],
      [{ value: 'option7' }],
      [{ value: 'option5' }],
      [{ value: 'option6' }],
      [{ value: 'option1' }],
      [{ value: 'option3' }]
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
    [{ value: 'option1' }],
    [{ value: 'option2 (some long text here)' }],
    [{ value: 'option3' }],
    [{ value: 'option4' }],
    [{ value: 'option5' }],
    [{ value: 'option6' }],
    [{ value: 'option7' }],
    [{ value: 'option8' }],
    [{ value: 'option9' }]
  ], {
    only: true,
    sameOrder: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      [{ value: 'option1' }],
      [{ value: 'option2 (some long text here)' }],
      [{ value: 'option3' }],
      [{ value: 'option5' }], // swap 'option4' and 'option5' items for testing
      [{ value: 'option4' }],
      [{ value: 'option6' }],
      [{ value: 'option7' }],
      [{ value: 'option8' }],
      [{ value: 'option9' }]
    ], {
      only: true,
      sameOrder: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkable-input#expectIsEqual().+: expected 'option5' to deeply equal 'option4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("250 It should allow assert on item's index using '#expectItemIndexIs()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemIndexIs({ value: 'option3' }, null, 2);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemIndexIs({ value: 'option3' }, null, 3);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkable-input#expectIsEqual().+: expected 'option3' to deeply equal 'option4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("260 It should allow assert on items existence at specified indexes using '#expectItemsAre()'", async () => {
  const sut = await getSut();
  const expectHasItemsSpy = sinon.spy(sut, 'expectHasItems');
  const items = [
    [{ value: 'option1' }],
    [{ value: 'option2 (some long text here)' }],
    [{ value: 'option3' }],
    [{ value: 'option4' }],
    [{ value: 'option5' }],
    [{ value: 'option6' }],
    [{ value: 'option7' }],
    [{ value: 'option8' }],
    [{ value: 'option9' }]
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

test("310 It should allow get group's 'Items' part of state using '#getItemsPartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const itemsState = await sut.getItemsPartOfState();
  const expectedItemsState = [...Array(9).keys()]
    .map((value) => {
      const v = ++value;
      return {
        checked: v === 2,
        disabled: false,
        invalid: false,
        labelShrinked: false,
        selectionMode: 'multi',
        size: 'normal',
        value: `option${v}` + (v === 2 ? ' (some long text here)' : ''),
        widget: 'icon'
      }
    });

  expect(itemsState, 'to equal', expectedItemsState);
});

test("320 It should allow set group's 'Items' part of state using '#setItemsPartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const option2 = sut.getItem({ idx: 1 });
  await option2.expectIsChecked()

  const option5 = sut.getItem({ idx: 4 });
  await option5.expectIsNotChecked()

  const option6 = sut.getItem({ idx: 5 });
  await option6.expectIsNotChecked()

  const newItemsState = [...Array(9).keys()]
    .map((idx) => {
      return { // 'Checked' is only writable part of state of checkable input
        checked: [4, 5].includes(idx)
      };
    });

  const result = await sut.setItemsPartOfState(newItemsState);
  await option2.expectIsNotChecked()
  await option5.expectIsChecked()
  await option6.expectIsChecked()
  expect(newItemsState, 'to equal', result);
});

test("330 It should allow assert on group's 'Items' part of state using '#expectItemsPartOfStateIs()'", async () => {
  const sut = await getSut();
  await sut.getItem({ value: /^option2.*/ }).expectIsChecked();
  await sut.getItem({ value: 'option4' }).setCheckedPartOfState(true);

  // -- Successful case

  await sut.expectItemsPartOfStateIs(
    [...Array(9).keys()]
    .map((value) => {
      const v = ++value;
      return {
        checked: [2, 4].includes(v),
        disabled: false,
        invalid: false,
        labelShrinked: false,
        selectionMode: 'multi',
        size: 'normal',
        value: `option${v}` + (v === 2 ? ' (some long text here)' : ''),
        widget: 'icon'
      }
    })
  );

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsPartOfStateIs(
      [...Array(9).keys()]
      .map((value) => {
        const v = ++value;
        return {
          checked: true, // that's not true and cause error to be thrown
          disabled: false,
          invalid: false,
          labelShrinked: false,
          selectionMode: 'multi',
          size: 'normal',
          value: `option${v}` + (v === 2 ? ' (some long text here)' : ''),
          widget: 'icon'
        }
      })
    );
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected [ Array(9) ] to deeply equal [ Array(9) ]'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

// TODO Add tests for:
//      1. 'Value' part of state
