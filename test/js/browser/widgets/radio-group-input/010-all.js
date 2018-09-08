import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input';
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
function getRadioInputGroup(cid, exampleCid) {
  // TODO Assert on arguments.

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
  const rgi = getRadioInputGroup('010', '010');

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

test("030 It should allow assert on item existence using `#expectHasItem()` - case with idx", async () => {
  let isThrown = false;
  const rgi = getRadioInputGroup('010', '010');

  await rgi.expectIsExist();
  await rgi.expectHasItem({ label: 'Option 3' }, null, 2);

  // Check failing case.
  try {
    await rgi.expectHasItem({ label: 'Option 3' }, null, 1);
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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');
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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');

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
  const rgi = getRadioInputGroup('010', '010');

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
    getRadioInputGroup('010', '010').getItem({ idx: 3 }),
    'to be a',
    RadioGroupInputItem
  );
});
