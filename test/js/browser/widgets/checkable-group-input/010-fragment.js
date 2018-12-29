import expect from 'unexpected';
import { camelCase } from 'change-case';

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
  const sut = new CheckableGroupInput({ idx: 0 }, {
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

fixture('Widgets :: Checkable Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/checkable-group-input');

test("010 It should allow obtain checkable group input", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new CheckableGroupInput({ idx: 0 }, {
    parent: parent.viewElementSelector
  });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow get group's 'LabelShrinked' part of state using '#getLabelShrinkedPartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Check when not shrinked

  await sut.hover();
  expect(await sut.getLabelShrinkedPartOfState(), 'to be false');

  // -- Check when shrinked

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getLabelShrinkedPartOfState(), 'to be true');
});

test("030 It should allow assert on whether group's label is shrinked using '#expectIsLabelShrinked()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsLabelShrinked();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'labelShrinked,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether group's label isn't shrinked using '#expectIsNotLabelShrinked()'", async () => {
  const { knob, sut } = await getHelperFragments('label-shrinked');

  // -- Successful case

  await sut.hover();
  await sut.expectIsNotLabelShrinked();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotLabelShrinked();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'labelShrinked,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get group's 'MultiCheckable' part of state using '#getMultiCheckablePartOfState()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-checkable');

  // -- Check when multi checkable

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  expect(await sut.getMultiCheckablePartOfState(), 'to be true');

  // -- Check when not multi checkable

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  expect(await sut.getMultiCheckablePartOfState(), 'to be false');
});

test("060 It should allow assert on whether group is multi checkable using '#expectIsMultiCheckable()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-checkable');

  // -- Successful case

  await knob.clickItem({ value: 'true' });
  await sut.hover();
  await sut.expectIsMultiCheckable();

  // -- Failing case

  await knob.clickItem({ value: 'false' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsMultiCheckable();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must have BEM modifier 'multiCheckable,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether group isn't multi checkable using '#expectIsNotMultiCheckable()'", async () => {
  const { knob, sut } = await getHelperFragments('multi-checkable');

  // -- Successful case

  await knob.clickItem({ value: 'false' });
  await sut.hover();
  await sut.expectIsNotMultiCheckable();

  // -- Failing case

  await knob.clickItem({ value: 'true' });
  await sut.hover();

  let isThrown = false;

  try {
    await sut.expectIsNotMultiCheckable();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.checkable-group-input.+must not have BEM modifier 'multiCheckable,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow get group's 'Items' part of state using '#getItemsPartOfState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  const itemsState = await sut.getItemsPartOfState();
  const expectedItemsState = [...Array(9).keys()]
    .map((value) => {
      const v = ++value;
      return {
        // derived from Input
        disabled: false,
        invalid: false,
        size: 'normal',
        value: `option${v}`,
        widget: 'checkbox',
        // own
        checked: v === 2,
        labelShrinked: false
      }
    });

  expect(itemsState, 'to equal', expectedItemsState);
});

test("090 It should allow set group's 'Items' part of state using '#setItemsPartOfState()'", async () => {
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

test("100 It should allow assert on group's 'Items' part of state using '#expectItemsPartOfStateIs()'", async () => {
  const { knob, sut } = await getHelperFragments('widget');
  await sut.getItem({ value: /^option2$/ }).expectIsChecked();
  await sut.getItem({ value: 'option4' }).setCheckedPartOfState(true);

  // -- Successful case

  await knob.clickItem({ value: 'radio' });
  await sut.hover();
  await sut.expectItemsPartOfStateIs(
    [...Array(9).keys()].map((value) => {
      const v = ++value;
      return {
        // derived from Input
        disabled: false,
        invalid: false,
        size: 'normal',
        value: `option${v}`,
        widget: 'radio',
        // own
        checked: [2, 4].includes(v),
        labelShrinked: false,
      }
    })
  );

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectItemsPartOfStateIs(
      [...Array(9).keys()].map((value) => {
        const v = ++value;
        return {
          // derived from Input
          disabled: false,
          invalid: false,
          size: 'normal',
          value: `option${v}`,
          widget: 'radio',
          // own
          checked: true, // that's not true and cause error to be thrown
          labelShrinked: false,
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

test("110 It should allow get group's 'Value' part of state using '#getValuePartOfState()' - case of multi checkable group with checked items", async (t) => {
  const sut = await getSut();
  await sut.hover();

  const itemsIndexes = [2, 4, 5];

  for (const idx of itemsIndexes) {
    await (sut.getItem({ idx: (idx - 1) })).setCheckedPartOfState(true);
  }

  const valueState = await sut.getValuePartOfState();

  // -- Successful case

  const expectedValueState = itemsIndexes.map((idx) => `option${idx}`);
  expect(valueState, 'to equal', expectedValueState);

  // -- Failing case

  let isThrown = false;

  try {
    await t.expect(valueState).eql(['option1', 'option9']);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected [ 'option2', 'option4', 'option5' ] to deeply equal [ 'option1', 'option9' ]"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("120 It should allow get group's 'Value' part of state using '#getValuePartOfState()' - case of multi checkable group without checked items", async (t) => {
  const sut = await getSut();
  await sut.hover();

  for (const idx of [...Array(9).keys()]) {
    await (sut.getItem({ idx })).setCheckedPartOfState(false);
  }

  const valueState = await sut.getValuePartOfState();

  // -- Successful case

  expect(valueState, 'to equal', []);

  // -- Failing case

  let isThrown = false;

  try {
    await t.expect(valueState).eql(['option1', 'option9']);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected [] to deeply equal [ 'option1', 'option9' ]"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow get group's 'Value' part of state using '#getValuePartOfState()' - case of not multi checkable group with checked item", async (t) => {
  const {
    multiCheckableKnob,
    sut,
    widgetKnob
  } = await getHelperFragments('multi-checkable', 'widget');

  await multiCheckableKnob.clickItem({ value: 'false' });
  await widgetKnob.clickItem({ value: 'radio' });
  await sut.getItem({ value: 'choice5' }).click();

  const valueState = await sut.getValuePartOfState();

  // -- Successful case

  expect(valueState, 'to equal', 'choice5');

  // -- Failing case

  let isThrown = false;

  try {
    await t.expect(valueState).eql('choice1');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected 'choice5' to deeply equal 'choice1'"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("140 It should allow get group's 'Value' part of state using '#getValuePartOfState()' - case of not multi checkable group without checked item", async (t) => {
  const {
    multiCheckableKnob,
    sut,
    widgetKnob
  } = await getHelperFragments('multi-checkable', 'widget');

  await multiCheckableKnob.clickItem({ value: 'false' });
  await widgetKnob.clickItem({ value: 'radio' });

  // Because of only one item can be checked we simply check and then uncheck
  // first item to ensure that geoup have no checked items.
  const item1 = sut.getItem({ value: 'choice1' })
  await item1.setCheckedPartOfState(true);
  await item1.setCheckedPartOfState(false);

  const valueState = await sut.getValuePartOfState();

  // -- Successful case

  expect(valueState, 'to be null');

  // -- Failing case

  let isThrown = false;

  try {
    await t.expect(valueState).eql('choice1');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected null to deeply equal 'choice1'"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("150 It should allow set group's 'Value' part of state using '#setValuePartOfState()' - case of multi checkable group", async (t) => {
  const sut = await getSut();
  await sut.hover();

  // -- Check `undefined` value is noop

  const currentValue = await sut.getValuePartOfState();
  expect(
    await sut.setValuePartOfState(void 0),
    'to equal',
    currentValue
  );

  // -- Check appropriate changes done when value is not `undefined`

  for (const idx of [...Array(9).keys()]) {
    await (sut.getItem({ idx })).setCheckedPartOfState(0 === idx % 2);
  }

  const expectedValue = ['option2', 'option8'];

  expect(
    await sut.setValuePartOfState(expectedValue),
    'to equal',
    expectedValue
  );

  expect(
    await sut.getValuePartOfState(),
    'to equal',
    expectedValue
  );
});

test("160 It should allow set group's 'Value' part of state using '#setValuePartOfState()' - case of not multi checkable group", async (t) => {
  const {
    multiCheckableKnob,
    sut,
    widgetKnob
  } = await getHelperFragments('multi-checkable', 'widget');

  await multiCheckableKnob.clickItem({ value: 'false' });
  await widgetKnob.clickItem({ value: 'radio' });
  await sut.getItem({ value: 'choice4' }).click();

  // -- Check `undefined` value is noop

  const currentValue = await sut.getValuePartOfState();
  expect(
    await sut.setValuePartOfState(void 0),
    'to equal',
    currentValue
  );

  // -- Check appropriate changes done when value is not `undefined`

  const expectedValue = 'choice7';

  expect(
    await sut.setValuePartOfState(expectedValue),
    'to equal',
    expectedValue
  );

  expect(
    await sut.getValuePartOfState(),
    'to equal',
    expectedValue
  );
});

test("170 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - case of multi checkable group", async () => {
  const sut = await getSut();
  await sut.hover();

  const newValue = ['option1', 'option6'];
  await sut.setValuePartOfState(newValue);

  // -- Successful case

  await sut.expectValuePartOfStateIs(newValue);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(Array.from(newValue).reverse());
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected [ 'option1', 'option6' ] to deeply equal [ 'option6', 'option1' ]"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("180 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - case of multi checkable group and 'sameOrder' option set to falsey", async () => {
  const sut = await getSut();
  await sut.hover();
  const newValue = ['option1', 'option6'];
  await sut.setValuePartOfState(newValue);
  await sut.expectValuePartOfStateIs(newValue);
  await sut.expectValuePartOfStateIs(Array.from(newValue).reverse(), {
    sameOrder: false
  });
});

test("190 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - case of multi checkable group and with 'isNot' option set to truthy", async () => {
  const sut = await getSut();
  await sut.hover();
  await sut.setValuePartOfState(['option1']);

  // -- Successful case

  await sut.expectValuePartOfStateIs(['option1', 'option3'], { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(['option1'], { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected [ 'option1' ] to not deeply equal [ 'option1' ]"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("200 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - case of multi checkable group and with 'sameOrder' option set to falsey and 'isNot' option set to truthy", async () => {
  const sut = await getSut();
  await sut.hover();
  await sut.setValuePartOfState(['option3', 'option4']);

  // -- Successful case

  await sut.expectValuePartOfStateIs(['option5', 'option3'], {
    isNot: true,
    sameOrder: false
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(['option4', 'option3'], {
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

test("210 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - case of not multi checkable group", async () => {
  const {
    multiCheckableKnob,
    sut,
    widgetKnob
  } = await getHelperFragments('multi-checkable', 'widget');

  await multiCheckableKnob.clickItem({ value: 'false' });
  await widgetKnob.clickItem({ value: 'radio' });
  await sut.hover();

  const newValue = 'choice6';
  await sut.setValuePartOfState(newValue);

  // -- Successful case

  await sut.expectValuePartOfStateIs(newValue);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs('choice9');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected 'choice6' to deeply equal 'choice9'"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("220 It should allow assert on group's 'Value' part of state using '#expectValuePartOfStateIs()' - case of not multi checkable group and with 'isNot' option set to truthy", async () => {
  const {
    multiCheckableKnob,
    sut,
    widgetKnob
  } = await getHelperFragments('multi-checkable', 'widget');

  await multiCheckableKnob.clickItem({ value: 'false' });
  await widgetKnob.clickItem({ value: 'radio' });
  await sut.hover();

  const newValue = 'choice8';
  await sut.setValuePartOfState(newValue);

  // -- Successful case

  await sut.expectValuePartOfStateIs('choice5', { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectValuePartOfStateIs(newValue, { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      "AssertionError: expected 'choice8' to not deeply equal 'choice8'"
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
