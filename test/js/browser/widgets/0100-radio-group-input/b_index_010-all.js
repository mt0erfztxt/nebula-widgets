import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input';
import RadioGroupInputCheckedItem from '../../../../../src/js/widgets/radio-group-input/checked-item';
import RadioGroupInputItem from '../../../../../src/js/widgets/radio-group-input/item';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

/**
 * Returns radio group input fragment with 'cid' equal specified one. By
 * default scope for search is whole page, but it can be narrowed down by
 * providing 'cid' of man page's example.
 * 
 * @param {String} cid Radio group input's 'cid'
 * @param {String} [exampleCid] 'cid' of man page's example to which radio group input belongs
 * @returns {RadioGroupInput}
 */
function getRadioGroupInput(cid, exampleCid) {
  let example;

  if (exampleCid) {
    example = new ManPageExample({ cid: exampleCid });
  }

  return new RadioGroupInput({ cid, parent: example });
}

fixture `Widgets :: Radio Group Input :: 010 All`
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should allow obtain radio group input", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const radioGroupInput = new RadioGroupInput({ cid: '010', parent: example010 });
  await radioGroupInput.expectIsExist();
});

test("020 It should allow assert on item existence using `#expectHasItem()`", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectHasItem({ label: 'Option 2' });

  // Check failing case.
  try {
    await rgi.expectHasItem({ label: 'Option not exists' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow assert on item existence using `#expectHasItem()` - case with 'idx' option", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectHasItem({ label: 'Option 3' }, null, { idx: 2 });

  // Check failing case.
  try {
    await rgi.expectHasItem({ label: 'Option 3' }, null, { idx: 1 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.item#expectIsEqual().+: expected 'Option 3' to deeply equal 'Option 2'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on items existence using `#expectHasItems()`", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectHasItems([
    [{ label: 'Option 2' }],
    [{ label: 'Option 1' }],
    [{ label: 'Option 3' }]
  ]);

  // Check failing case.
  try {
    await rgi.expectHasItems([
      [{ label: 'Option 2' }],
      [{ label: 'Option 1' }],
      [{ label: 'Option 4' }],
      [{ label: 'Option 3' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow assert on items existence using `#expectHasItems()` - case with 'only' option", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectHasItems([
    [{ label: 'Option 2' }],
    [{ label: 'Option 1' }],
    [{ label: 'Option 3' }]
  ], {
    only: true
  });

  // Check failing case.
  try {
    await rgi.expectHasItems([
      [{ label: 'Option 2' }],
      [{ label: 'Option 1' }]
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

test("060 It should allow assert on items existence using `#expectHasItems()` - case with 'sameOrder' option", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectHasItems([
    [{ label: 'Option 1' }],
    [{ label: 'Option 2' }],
    [{ label: 'Option 3' }]
  ], {
    only: true,
    sameOrder: true
  });

  // Check failing case.
  try {
    await rgi.expectHasItems([
      [{ label: 'Option 1' }],
      [{ label: 'Option 3' }],
      [{ label: 'Option 2' }]
    ], {
      only: true,
      sameOrder: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.item#expectIsEqual().+: expected 'Option 3' to deeply equal 'Option 2'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on item's index using `#expectItemIndexIs()`", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectItemIndexIs({ label: 'Option 3' }, null, 2);

  // Check failing case.
  try {
    await rgi.expectItemIndexIs({ label: 'Option 1' }, null, 1);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.item#expectIsEqual().+: expected 'Option 1' to deeply equal 'Option 2'/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on items existence at specified indexes using `#expectItemsAre()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  const expectHasItemsSpy = sinon.spy(rgi, 'expectHasItems');

  const items = [
    [{ label: 'Option 1' }],
    [{ label: 'Option 2' }],
    [{ label: 'Option 3' }]
  ];

  await rgi.expectIsExist();
  await rgi.expectItemsAre(items);

  expect(expectHasItemsSpy, 'was called times', 1);
  expect(expectHasItemsSpy, 'to have a call satisfying', { args: [items, { only: true, sameOrder: true }] });
});

test("090 It should allow assert on number of items using `#expectItemsCountIs()` - simple case", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectItemsCountIs(3);

  // Check failing case.
  try {
    await rgi.expectItemsCountIs(1);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 3 to deeply equal 1'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("100 It should allow assert on number of items using `#expectItemsCountIs()` - simple case with 'isNot' option", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectItemsCountIs(4, { isNot: true });

  // Check failing case.
  try {
    await rgi.expectItemsCountIs(3, { isNot: true });
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

test("110 It should allow assert on number of items using `#expectItemsCountIs()` - complex case", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectItemsCountIs(['gt', 2]);
  await rgi.expectItemsCountIs(['gte', 3]);
  await rgi.expectItemsCountIs(['lt', 4]);

  // Check failing case.
  try {
    await rgi.expectItemsCountIs(['gte', 4]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 3 to be at least 4'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("120 It should allow assert on number of items using `#expectItemsCountIs()` - complex case with 'isNot' option", async () => {
  let isThrown = false;
  const rgi = getRadioGroupInput('010', '010');

  await rgi.expectIsExist();
  await rgi.expectItemsCountIs(['lt', 3], { isNot: true });
  await rgi.expectItemsCountIs(['gte', 4], { isNot: true });

  // Check failing case.
  try {
    await rgi.expectItemsCountIs(['lt', 4], { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 3 to be at least 4'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("130 It should allow obtain item using `#getItem()`", async () => {
  expect(
    getRadioGroupInput('010', '010').getItem({ idx: 3 }),
    'to be a',
    RadioGroupInputItem
  );
});

test("140 It should allow assert on checked item existence using `#expectHasCheckedItem()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();

  const checkedItem = rgi.getCheckedItem({ cid: 'option2' });
  await checkedItem.expectIsNotExist();

  const item = rgi.getItem({ cid: 'option2' })
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsChecked();

  await checkedItem.expectIsExist();
  const rgiCi = await rgi.expectHasCheckedItem({ label: 'Option 2' });
  await checkedItem.expectIsEqual(rgiCi);

  // -- Failing case

  let isThrown = false;

  await item.constructor.reloadBrowserPage();
  await item.expectIsExist();
  await item.expectIsNotChecked();

  try {
    await rgi.expectHasCheckedItem({ label: 'Option 2' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.checked-item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("150 It should allow assert on checked item existence using `#expectHasCheckedItem()` - case with 'idx' option", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();

  // Note that index is 0 because checked items has its own order.
  const checkedItem = rgi.getCheckedItem({ cid: 'option2' }, null, { idx: 0 });
  await checkedItem.expectIsNotExist();

  const item = rgi.getItem({ cid: 'option2' })
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsChecked();

  await checkedItem.expectIsExist();
  const rgiCi = await rgi.expectHasCheckedItem({ label: 'Option 2' }, null, { idx: 0 });
  await checkedItem.expectIsEqual(rgiCi);

  // -- Failing case

  let isThrown = false;

  await item.constructor.reloadBrowserPage();
  await item.expectIsExist();
  await item.expectIsNotChecked();

  try {
    await rgi.expectHasCheckedItem({ label: 'Option 2' }, null, { idx: 0 });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.checked-item#expectIsEqual.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("160 It should allow assert on checked items existence using `#expectHasCheckedItems()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectHasCheckedItems([]);

  const checkedItem = new RadioGroupInputCheckedItem({ idx: 0, parent: rgi });
  await checkedItem.expectIsNotExist();

  const item3 = new RadioGroupInputItem({ idx: 2, parent: rgi });
  await item3.expectIsExist();
  await item3.click();

  await checkedItem.expectExistsAndConformsRequirements({
    textContent: await item3.selector.textContent
  });

  const rgiCis = await rgi.expectHasCheckedItems([
    [{ label: 'Option 3' }]
  ]);
  await checkedItem.expectIsExist();
  await checkedItem.expectIsEqual(rgiCis[0]);

  // -- Failing case

  let isThrown = false;

  try {
    await rgi.expectHasCheckedItems([
      [{ label: 'Option 2' }]
    ]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.checked-item.+DOM element.+: expected 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("170 It should allow assert on checked items existence using `#expectHasCheckedItems()` - case with 'only' option", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectHasCheckedItems([]);

  const item1 = new RadioGroupInputItem({ idx: 0, parent: rgi });
  await item1.expectIsExist();
  await item1.click();
  await rgi.expectHasCheckedItems([
    [{ label: 'Option 1' }]
  ], {
    only: true
  });

  // -- Failing case

  let isThrown = false;

  try {
    await rgi.expectHasCheckedItems([
      [{ label: 'Option 1' }],
      [{ label: 'Option 2' }]
    ], {
      only: true
    });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: expected 1 to deeply equal 2/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("180 It should allow assert on checked items existence using `#expectHasCheckedItems()` - case with 'sameOrder' option", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectHasCheckedItems([]);

  const item2 = new RadioGroupInputItem({ idx: 1, parent: rgi });
  await item2.expectIsExist();
  await item2.click();
  await rgi.expectHasCheckedItems([
    [{ label: 'Option 2' }]
  ], {
    only: true,
    sameOrder: true
  });
});

test("190 It should allow assert on checked item's index using `#expectCheckedItemIndexIs()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();

  const item3 = rgi.getItem({ label: 'Option 3' })
  await item3.expectIsExist();
  await item3.click();

  await rgi.expectCheckedItemIndexIs({ label: 'Option 3' }, null, 0);

  // -- Failing case

  let isThrown = false;

  try {
    // Note that no checked item with label 'Option 3' and index 1 exists, and
    // assertion error message is about absence of 'that' fragment.
    await rgi.expectCheckedItemIndexIs({ label: 'Option 3' }, null, 1);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError: .+\.radio-group-input\.checked-item#expectIsEqual().+: .*'that' argument must exist .* 0 to deeply equal 1/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("200 It should allow assert on checked items existence at specified indexes using `#expectCheckedItemsAre()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();

  const item3 = new RadioGroupInputItem({ idx: 2, parent: rgi });
  await item3.expectIsExist();
  await item3.click();

  const checkedItems = [
    [{ label: 'Option 3' }]
  ];

  const expectHasCheckedItemsSpy = sinon.spy(rgi, 'expectHasCheckedItems');
  await rgi.expectCheckedItemsAre(checkedItems);

  expect(expectHasCheckedItemsSpy, 'was called times', 1);
  expect(expectHasCheckedItemsSpy, 'to have a call satisfying', {
    args: [checkedItems, { only: true, sameOrder: true }]
  });
});

test("210 It should allow assert on number of checked items using `#expectCheckedItemsCountIs()` - simple case", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectCheckedItemsCountIs(0);

  const item1 = rgi.getItem({ cid: 0 });
  await item1.click();
  await rgi.expectCheckedItemsCountIs(1);

  // -- Failing case

  let isThrown = false;

  try {
    await rgi.expectCheckedItemsCountIs(0);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 1 to deeply equal 0'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("220 It should allow assert on number of items using `#expectCheckedItemsCountIs()` - simple case with 'isNot' option", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectCheckedItemsCountIs(1, { isNot: true });

  const item1 = rgi.getItem({ cid: 0 });
  await item1.click();
  await rgi.expectCheckedItemsCountIs(0, { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await rgi.expectCheckedItemsCountIs(1, { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 1 to not deeply equal 1'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("230 It should allow assert on number of items using `#expectCheckedItemsCountIs()` - complex case", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectCheckedItemsCountIs(['gt', -1]);
  await rgi.expectCheckedItemsCountIs(['gte', 0]);
  await rgi.expectCheckedItemsCountIs(['lt', 1]);

  const item1 = rgi.getItem({ cid: 0 });
  await item1.click();
  await rgi.expectCheckedItemsCountIs(['gt', 0]);
  await rgi.expectCheckedItemsCountIs(['gte', 1]);
  await rgi.expectCheckedItemsCountIs(['lt', 2]);

  // -- Failing case

  let isThrown = false;

  try {
    await rgi.expectCheckedItemsCountIs(['gte', 2]);
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 1 to be at least 2'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("240 It should allow assert on number of items using `#expectCheckedItemsCountIs()` - complex case with 'isNot' option", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectCheckedItemsCountIs(['lt', 0], { isNot: true });
  await rgi.expectCheckedItemsCountIs(['gte', 4], { isNot: true });

  const item1 = rgi.getItem({ cid: 0 });
  await item1.click();
  await rgi.expectCheckedItemsCountIs(['lt', 1], { isNot: true });
  await rgi.expectCheckedItemsCountIs(['gte', 2], { isNot: true });

  // -- Failing case

  let isThrown = false;

  try {
    await rgi.expectCheckedItemsCountIs(['lt', 4], { isNot: true });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 1 to be at least 4'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("250 It should allow assert on whether radio group input has checked items using `#expectHasValue()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectCheckedItemsCountIs(0);

  const item1 = rgi.getItem({ cid: 0 });
  await item1.click();

  await rgi.expectCheckedItemsCountIs(1);
  await rgi.expectHasValue();

  // -- Failing case

  let isThrown = false;

  await rgi.constructor.reloadBrowserPage();
  await rgi.expectCheckedItemsCountIs(0);

  try {
    await rgi.expectHasValue();
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

test("260 It should allow assert on whether radio group input has no checked items using `#expectHasNoValue()`", async () => {
  const rgi = getRadioGroupInput('010', '010');
  await rgi.expectIsExist();
  await rgi.expectCheckedItemsCountIs(0);
  await rgi.expectHasNoValue();

  // -- Failing case

  let isThrown = false;

  const item1 = rgi.getItem({ cid: 0 });
  await item1.click();
  await rgi.expectCheckedItemsCountIs(1);

  try {
    await rgi.expectHasNoValue();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to equal',
      'AssertionError: expected 1 to deeply equal 0'
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("270 It should allow obtain checked item using `#getCheckedItem()`", async () => {
  expect(
    getRadioGroupInput('010', '010').getCheckedItem({ idx: 3 }),
    'to be a',
    RadioGroupInputCheckedItem
  );
});
