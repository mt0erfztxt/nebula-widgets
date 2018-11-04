/**
 * Checkable group input fragment doesn't represent concrete widget and used to
 * aggregate common functionality, and because of that it tested using checkbox
 * group input fragment.
 */

import _ from 'lodash';
import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import CheckableGroupInputCheckedItem from '../../../../../src/js/widgets/checkable-group-input/checked-item';
import CheckboxGroupInput from '../../../../../src/js/widgets/checkbox-group-input';
import CheckboxGroupInputCheckedItem from '../../../../../src/js/widgets/checkbox-group-input/checked-item';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

async function getSut() {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const group = new CheckboxGroupInput({ idx: 0, parent });
  await group.expectIsExist();

  return group;
}

fixture `Widgets :: Checkable Group Input :: 030 Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input');

test("005 It should allow obtain checked item using `#getCheckedItem()`", async () => {
  const sut = await getSut();
  expect(
    sut.getCheckedItem({ idx: 0 }),
    'to be a',
    CheckableGroupInputCheckedItem
  );
});

test("010 It should allow assert on checked item existence using `#expectHasCheckedItem()`", async () => {
  const sut = await getSut();
  await sut.hover();

  // -- Successful case

  const item = sut.getItem({ label: 'option5' });
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsChecked();

  const checkedItem = await sut.expectHasCheckedItem({ label: 'option5' });
  await checkedItem.expectIsEqual(new CheckboxGroupInputCheckedItem({ label: 'option5' }));

  // -- Failing case

  let isThrown = false;

  await item.constructor.reloadBrowserPage();
  await item.hoverLabel();
  await item.expectIsExist();
  await item.expectIsNotChecked();

  try {
    await sut.expectHasCheckedItem({ label: 'option5' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.checked-item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});


test("020 It should allow assert on checked item existence using `#expectHasCheckedItem()` - case with 'idx' option", async () => {
  const sut = await getSut();
  await sut.hover();

  // -- Successful case

  const item = sut.getItem({ label: 'option5' })
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsChecked();

  // Note that index is 3 because checked items has its own order.
  const checkedItem = await sut.expectHasCheckedItem({ label: 'option5' }, null, { idx: 3 });
  await checkedItem.expectIsEqual(new CheckboxGroupInputCheckedItem({ label: 'option5' }));

  // -- Failing case

  let isThrown = false;

  await item.constructor.reloadBrowserPage();
  await item.hoverLabel();
  await item.expectIsExist();
  await item.expectIsNotChecked();

  try {
    await sut.expectHasCheckedItem({ label: 'option5' }, null, { idx: 3 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.checked-item#expectIsEqual.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow assert on checked items existence using `#expectHasCheckedItems()`", async () => {
  let result;
  const sut = await getSut();
  const sutCheckedItemsLabels = ['option1', 'option3', 'option4'];
  const sutCheckedItems = _.map(
    sutCheckedItemsLabels,
    (label) => sut.getCheckedItem({ label })
  );

  // -- Successful case - when sut has no checked items

  for (const checkedItem of sutCheckedItems) {
    await checkedItem.click();
  }

  result = await sut.expectHasCheckedItems([]);
  expect(result, 'to equal', []);

  // -- Successful case - when has checked items + partial match (2 but group have 3 checked item)

  await sut.constructor.reloadBrowserPage();
  await sut.hover();

  result = await sut.expectHasCheckedItems([
    [{ label: 'option1' }],
    [{ label: 'option4' }]
  ]);

  // Check returned value.
  expect(result.length, 'to equal', 2);
  await result[0].expectIsEqual(new CheckboxGroupInputCheckedItem({ label: 'option1' }));
  await result[1].expectIsEqual(new CheckboxGroupInputCheckedItem({ label: 'option4' }));

  // -- Successful case - when has checked items + full match (3/3)

  await sut.constructor.reloadBrowserPage();
  await sut.hover();

  result = await sut.expectHasCheckedItems([
    [{ label: 'option1' }],
    [{ label: 'option3' }],
    [{ label: 'option4' }]
  ]);

  // Check returned value.
  expect(result.length, 'to equal', sutCheckedItems.length);
  for (let i = 0; i < result.length; i++) {
    await result[i].expectIsEqual(sutCheckedItems[i]);
  }

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasCheckedItems([
      [{ label: 'option5' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.checked-item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on checked items existence using `#expectHasCheckedItems()` - case with 'only' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.expectHasCheckedItems([
    [{ label: 'option1' }],
    [{ label: 'option3' }],
    [{ label: 'option4' }]
  ], {
    only: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasCheckedItems([
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
      /AssertionError: expected 3 to deeply equal 2/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on checked items existence using `#expectHasCheckedItems()` - case with 'sameOrder' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectHasCheckedItems([
    [{ label: 'option1' }],
    [{ label: 'option3' }],
    [{ label: 'option4' }]
  ], {
    only: true,
    sameOrder: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectHasCheckedItems([
      [{ label: 'option1' }],
      [{ label: 'option4' }],
      [{ label: 'option3' }]
    ], {
      only: true,
      sameOrder: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.checked-item#expectIsEqual().+: expected 'option4' to deeply equal 'option3'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("060 It should allow assert on checked item's index using `#expectCheckedItemIndexIs()`", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectCheckedItemIndexIs({ label: 'option3' }, null, 1);

  // -- Failing case

  let isThrown = false;

  try {
    // Note that no checked item with label 'option3' and index 3 exists, and
    // assertion error message is about absence of 'that' fragment.
    await sut.expectCheckedItemIndexIs({ label: 'option3' }, null, 3);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.checkbox-group-input\.checked-item#expectIsEqual().+: .*'that' argument must exist .* 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on checked items existence at specified indexes using `#expectCheckedItemsAre()`", async () => {
  const sut = await getSut();
  const expectHasCheckedItemsSpy = sinon.spy(sut, 'expectHasCheckedItems');
  const checkedItemsSpecAndOptsList = [
    [{ label: 'option1' }],
    [{ label: 'option3' }],
    [{ label: 'option4' }]
  ];

  await sut.hover();
  await sut.expectCheckedItemsAre(checkedItemsSpecAndOptsList);

  expect(expectHasCheckedItemsSpy, 'was called times', 1);
  expect(expectHasCheckedItemsSpy, 'to have a call satisfying', {
    args: [checkedItemsSpecAndOptsList, { only: true, sameOrder: true }]
  });
});

test("080 It should allow assert on number of checked items using `#expectCheckedItemsCountIs()` - simple case", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectCheckedItemsCountIs(3);

  await sut.getCheckedItem({ label: 'option1' }).click();
  await sut.expectCheckedItemsCountIs(2);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectCheckedItemsCountIs(0);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 2 to deeply equal 0'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("090 It should allow assert on number of items using `#expectCheckedItemsCountIs()` - simple case with 'isNot' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectCheckedItemsCountIs(1, { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectCheckedItemsCountIs(3, { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 3 to not deeply equal 3'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on number of items using `#expectCheckedItemsCountIs()` - complex case", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectCheckedItemsCountIs(['gt', -1]);
  await sut.expectCheckedItemsCountIs(['gte', 3]);
  await sut.expectCheckedItemsCountIs(['lt', 4]);

  await sut.getItem({ label: 'option1' }).click();
  await sut.expectCheckedItemsCountIs(['gt', 1]);
  await sut.expectCheckedItemsCountIs(['gte', 2]);
  await sut.expectCheckedItemsCountIs(['lt', 3]);

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectCheckedItemsCountIs(['gte', 3]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 2 to be at least 3'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("110 It should allow assert1on number of ite2s using `#expectCheckedItemsCountIs()` - complex case with 'isNot' option", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectCheckedItemsCountIs(['lt', 0], { isNot: true });
  await sut.expectCheckedItemsCountIs(['gte', 4], { isNot: true });

  await sut.getItem({ label: 'option1' }).click();
  await sut.expectCheckedItemsCountIs(['lt', 2], { isNot: true });
  await sut.expectCheckedItemsCountIs(['gte', 3], { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectCheckedItemsCountIs(['lt', 4], { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 2 to be at least 4'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("120 It should allow assert on whether radio group input has checked items using `#expectHasValue()`", async () => {
  const sut = await getSut();

  // -- Successful case

  await sut.hover();
  await sut.expectCheckedItemsCountIs(3);
  await sut.expectHasValue();

  // -- Failing case

  let isThrown = false;

  for (const label of ['option1', 'option3', 'option4']) {
    await sut.getItem({ label }).click();
  }

  await sut.expectCheckedItemsCountIs(0);

  try {
    await sut.expectHasValue();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 0 to be above 0'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow assert on whether radio group input has no checked items using `#expectHasNoValue()`", async () => {
  const sut = await getSut();

  // -- Successful case

  for (const label of ['option1', 'option3', 'option4']) {
    await sut.getItem({ label }).click();
  }

  await sut.expectHasNoValue();

  // -- Failing case

  let isThrown = false;

  await sut.constructor.reloadBrowserPage();
  await sut.hover();
  await sut.expectCheckedItemsCountIs(3);

  try {
    await sut.expectHasNoValue();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 3 to deeply equal 0'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
