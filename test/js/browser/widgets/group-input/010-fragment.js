import sinon from 'sinon';
import testFragment from 'nebula-test-fragment';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import GroupInputFragment from '../../../../../src/js/widgets/group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

const {
  Fragment1,
  Options,
  selector,
  utils
} = testFragment;

class GroupInputItem extends Fragment1 {

  /**
   * Provides custom transformations for selector:
   * 1. 'value' - String, text content
   * 
   * @param {*} transformations 
   * @param {*} sel 
   * @param {*} bemBase 
   */
  transformSelector(transformations, sel, bemBase) {
    sel = super.transformSelector(transformations, sel, bemBase);

    for (const k in transformations) {
      if (transformations.hasOwnProperty(k) && k === 'value') {
        const value = transformations[k];

        if (utils.isNonBlankString(value) || _.isRegExp(value)) {
          sel = selector.filterByText(sel, value);
        }
        else {
          throw new TypeError(
            `${this.displayName}: value for 'value' transformation must ` +
            `be a non-blank string or a regular expression but it is ` +
            `${typeOf(value)} (${value})`
          );
        }
      }
    }

    return sel;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(options) {
    const { onlyWritable } = new Options(options, {
      defaults: {
        onlyWritable: false
      }
    });

    const writableParts = super.getStateParts({ onlyWritable });

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat(['value']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it.
   * 
   * @returns {Promise<String>}
   */
  async getValuePartOfState() {
    return this.selector.textContent;
  }

  /**
   * Obtains 'Value' part of fragment's state and returns it because this part
   * of state is read-only.
   * 
   * @return {Promise<String>}
   */
  async setValuePartOfState() {
    return this.getValuePartOfState();
  }

  /**
   * Asserts that 'Value' part of fragment's state is equal specified value.
   *
   * @param {String} value Part of state must equal that value to pass assertion
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be inverted
   * @return {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    const { isNot } = new Options(options, {
      defaults: {
        isNot: false
      }
    });
    const v = await this.getValuePartOfState();
    const assertionName = utils.buildTestCafeAssertionName('eql', { isNot });
    await t.expect(v)[assertionName](value);
  }
}

Object.defineProperties(GroupInputItem, {
  bemBase: {
    value: 'nw-groupInputItem'
  },
  displayName: {
    value: 'Test_GroupInputItem'
  }
});

class GroupInput extends GroupInputFragment {}

Object.defineProperties(GroupInput, {
  displayName: {
    value: 'Test_GroupInput'
  },
  ItemFragment: {
    value: GroupInputItem
  }
});

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
 * @returns {Promise<GroupInput>}
 */
async function getSut(parent) {
  const sut = new GroupInput({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

/**
 * @returns {Promise<Object>}
 */
async function getHelperFragments(...knobCids) {
  const parent = await getInteractiveExample();
  const result = {};

  for (const knobCid of knobCids) {
    result[`${knobCid}Knob`] = await getKnob(knobCid, parent);
  }

  result.knob = result[`${knobCids[0]}Knob`];
  result.sut = await getSut(parent.viewElementSelector);

  return result;
}

const sutLabels = [...Array(9).keys()].map((v) => `item${++v}`);

fixture('Fragments :: Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/group-input');

test("010 It should allow obtain group input", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new GroupInput({ idx: 0 }, { parent });
  await sut.expectIsExist();
});

test("020 It should allow get group's 'Columns' part of state using '#getColumnsPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('columns');

  // -- Check when no columns

  await knob.clickItem({ value: 'nil' });
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
  await sut.expectColumnsPartOfStateIs('5');

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectColumnsPartOfStateIs('3');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInput'.+must have BEM modifier 'columns,3'.+but it doesn't/
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
      /AssertionError: 'Test_GroupInput'.+must not have BEM modifier 'columns,5'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get group's 'Equidistant' part of state using '#getEquidistantPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('equidistant');

  // -- Check when not equidistant

  await knob.clickItem({ value: 'false' });
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
      /AssertionError: 'Test_GroupInput.+must have BEM modifier 'equidistant,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether group isn't equidistant using '#expectIsNotEquidistant()'", async () => {
  const { knob, sut } = await getHelperFragments('equidistant');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
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
      /AssertionError: 'Test_GroupInput.+must not have BEM modifier 'equidistant,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow get group's 'Inline' part of state using '#getInlinePartOfState()'", async () => {
  const {
    columnsKnob,
    inlineKnob,
    sut
  } = await getHelperFragments('columns', 'inline');

  // Columns implies inline and must be unset
  await columnsKnob.clickItem({ value: 'nil' });

  // -- Check when not inline

  await inlineKnob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getInlinePartOfState(), 'to be false');

  // -- Check when inline

  await inlineKnob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getInlinePartOfState(), 'to be true');
});

test("090 It should allow assert on whether group is inline using '#expectIsInline()'", async () => {
  const {
    columnsKnob,
    inlineKnob,
    sut
  } = await getHelperFragments('columns', 'inline');

  // Columns implies inline and must be unset
  await columnsKnob.clickItem({ value: 'nil' });

  // -- Successful case

  await inlineKnob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsInline();

  // -- Failing case

  await inlineKnob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInput.+must have BEM modifier 'inline,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on whether group isn't inline using '#expectIsNotInline()'", async () => {
  const {
    columnsKnob,
    inlineKnob,
    sut
  } = await getHelperFragments('columns', 'inline');

  // Columns implies inline and must be unset
  await columnsKnob.clickItem({ value: 'nil' });

  // -- Successful case

  await inlineKnob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectIsNotInline();

  // -- Failing case

  await inlineKnob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInput.+must not have BEM modifier 'inline,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow get group's 'NoRowGap' part of state using '#getNoRowGapPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('no-row-gap');

  // -- Check when not noRowGap

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getNoRowGapPartOfState(), 'to be false');

  // -- Check when noRowGap

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getNoRowGapPartOfState(), 'to be true');
});

test("120 It should allow assert on whether group have no gap between rows using '#expectIsNoRowGap()'", async () => {
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
      /AssertionError: 'Test_GroupInput.+must have BEM modifier 'noRowGap,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow assert on whether group have gap between rows using '#expectIsNotNoRowGap()'", async () => {
  const { knob, sut } = await getHelperFragments('no-row-gap');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
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
      /AssertionError: 'Test_GroupInput.+must not have BEM modifier 'noRowGap,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow get group's 'SoftColumns' part of state using '#getSoftColumnsPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('soft-columns');

  // -- Check when not soft columns

  await knob.clickItem({ value: 'false' });
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
      /AssertionError: 'Test_GroupInput.+must have BEM modifier 'softColumns,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("160 It should allow assert on whether group isn't soft columns using '#expectIsNotSoftColumns()'", async () => {
  const { knob, sut } = await getHelperFragments('soft-columns');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
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
      /AssertionError: 'Test_GroupInput.+must not have BEM modifier 'softColumns,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("170 It should allow get group's 'StackedOnMobile' part of state using '#getStackedOnMobilePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('stacked-on-mobile');

  // -- Check when not stacked on mobile

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getStackedOnMobilePartOfState(), 'to be false');

  // -- Check when stacked on mobile

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
      /AssertionError: 'Test_GroupInput.+must have BEM modifier 'stackedOnMobile,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("190 It should allow assert on whether group isn't stacked on mobile using '#expectIsNotStackedOnMobile()'", async () => {
  const { knob, sut } = await getHelperFragments('stacked-on-mobile');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
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
      /AssertionError: 'Test_GroupInput.+must not have BEM modifier 'stackedOnMobile,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("195 It should allow obtain item using '#getItem()'", async (t) => {
  const sut = await getSut();
  const item = sut.getItem({ idx: 0 });
  expect(item, 'to be a', GroupInputItem);
  await item.expectIsExist();
  await item.hover();
  await t.expect(item.selector.textContent).eql('item1')
});

test("200 It should allow assert on item existence using '#expectHasItem()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItem({ value: 'item3' });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItem({ value: 'non-existent item' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInputItem.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("210 It should allow assert on item existence using '#expectHasItem()' - case with 'idx' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasItem({ value: 'item3' }, null, { idx: 2 });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItem({ value: 'item3' }, null, { idx: 0 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInputItem#expectIsEqual().+: expected 'item3' to deeply equal 'item1'/
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
    [{ value: 'item6' }],
    [{ value: 'item1' }],
    [{ value: 'item4' }]
  ]);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      [{ value: 'itemA' }], // no such item
      [{ value: 'item1' }],
      [{ value: 'item4' }],
      [{ value: 'item3' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInputItem.+DOM element.+: expected 0 to deeply equal 1/
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
    [{ value: 'item2' }],
    [{ value: 'item4' }],
    [{ value: 'item8' }],
    [{ value: 'item9' }],
    [{ value: 'item7' }],
    [{ value: 'item5' }],
    [{ value: 'item6' }],
    [{ value: 'item1' }],
    [{ value: 'item3' }]
  ], {
    only: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      // Omit 'item2...' item for testing.
      [{ value: 'item4' }],
      [{ value: 'item8' }],
      [{ value: 'item9' }],
      [{ value: 'item7' }],
      [{ value: 'item5' }],
      [{ value: 'item6' }],
      [{ value: 'item1' }],
      [{ value: 'item3' }]
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
    [{ value: 'item1' }],
    [{ value: 'item2' }],
    [{ value: 'item3' }],
    [{ value: 'item4' }],
    [{ value: 'item5' }],
    [{ value: 'item6' }],
    [{ value: 'item7' }],
    [{ value: 'item8' }],
    [{ value: 'item9' }]
  ], {
    only: true,
    sameOrder: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasItems([
      [{ value: 'item1' }],
      [{ value: 'item2' }],
      [{ value: 'item3' }],
      [{ value: 'item5' }], // swap 'item4' and 'item5' for testing
      [{ value: 'item4' }],
      [{ value: 'item6' }],
      [{ value: 'item7' }],
      [{ value: 'item8' }],
      [{ value: 'item9' }]
    ], {
      only: true,
      sameOrder: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInputItem#expectIsEqual().+: expected 'item5' to deeply equal 'item4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("250 It should allow assert on item's index using '#expectItemIndexIs()'", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectItemIndexIs({ value: 'item3' }, null, 2);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemIndexIs({ value: 'item3' }, null, 3);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: 'Test_GroupInputItem#expectIsEqual().+: expected 'item3' to deeply equal 'item4'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("260 It should allow assert on items existence at specified indexes using '#expectItemsAre()'", async () => {
  const sut = await getSut();
  const expectHasItemsSpy = sinon.spy(sut, 'expectHasItems');
  const items = [
    [{ value: 'item1' }],
    [{ value: 'item2' }],
    [{ value: 'item3' }],
    [{ value: 'item4' }],
    [{ value: 'item5' }],
    [{ value: 'item6' }],
    [{ value: 'item7' }],
    [{ value: 'item8' }],
    [{ value: 'item9' }]
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
  const expectedItemsState = sutLabels.map((value) => ({ value }));
  expect(itemsState, 'to equal', expectedItemsState);
});

test("330 It should allow assert on group's 'Items' part of state using '#expectItemsPartOfStateIs()'", async () => {
  const sut = await getSut();
  await sut.hover();

  // -- Successful case

  await sut.expectItemsPartOfStateIs(sutLabels.map((value) => ({ value })));

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsPartOfStateIs(
      [...Array(9).keys()].map((value) => {
        const v = ++value;
        return { value: 'item' + (v === 2 ? 'A' : v) }
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

test("340 It should allow get group's 'Value' part of state using '#getValuePartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const valueState = await sut.getValuePartOfState();
  expect(valueState, 'to equal', sutLabels);
});

test("350 It should have setter for group's 'Value' part of state ('#setValuePartOfState()') that simply returns current value because part is read-only", async () => {
  const sut = await getSut();
  await sut.hover();

  const result = await sut.setValuePartOfState();
  expect(result, 'to equal', sutLabels);
});

test("360 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()'", async () => {
  const sut = await getSut();
  await sut.hover();

  // -- Successful case

  await sut.expectValuePartOfStateIs(sutLabels);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(Array.from(sutLabels).reverse());
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

test("370 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - with 'sameOrder' option set to falsey", async () => {
  const sut = await getSut();
  await sut.hover();

  // -- Successful case

  await sut.expectValuePartOfStateIs(Array.from(sutLabels).reverse(), {
    sameOrder: false
  });

  // -- Failing case

  const incorrectValue = Array.from(sutLabels);
  incorrectValue[0] = 'foobar';

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(incorrectValue, { sameOrder: false });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.*to have same set.*expected false to be truthy/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("380 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - with 'isNot' option set to truthy", async () => {
  const sut = await getSut();
  await sut.hover();

  const incorrectValue = Array.from(sutLabels);
  incorrectValue[0] = 'foobar;'

  // -- Successful case

  await sut.expectValuePartOfStateIs(incorrectValue, { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(incorrectValue, { isNot: false });
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

test("390 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - with 'sameOrder' option set to falsey", async () => {
  const sut = await getSut();
  await sut.hover();

  await sut.expectValuePartOfStateIs(sutLabels, { sameOrder: false });
  await sut.expectValuePartOfStateIs(Array.from(sutLabels).reverse(), {
    sameOrder: false
  });
});

test("400 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - with 'sameOrder' option set to falsey and 'isNot' option set to truthy", async () => {
  const sut = await getSut();
  await sut.hover();

  // -- Successful case

  const incorrectValue = Array.from(sutLabels).reverse();
  incorrectValue[0] = 'foobar';

  await sut.expectValuePartOfStateIs(incorrectValue, {
    isNot: true,
    sameOrder: false
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(Array.from(sutLabels).reverse(), {
      isNot: true,
      sameOrder: false
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.*to not have same set.*expected true to be falsy/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("410 It should allow to obtain number of items in group using '#getItemsCount()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const itemsCount = await sut.getItemsCount();
  expect(itemsCount, 'to equal', 9);
});
