/**
 * Group input fragment doesn't represent concrete widget and used to aggregate
 * common functionality of fragments for concrete group input widgets, and
 * because of that it tested using checkbox group input fragment.
 */

import expect from 'unexpected';

import CheckboxGroupInput from '../../../../../src/js/widgets/checkbox-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

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
  const item = new CheckboxGroupInput({ idx: 0, parent });
  await item.expectIsExist();
  return item;
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

test("020 It should allow get 'Columns' part of state using `#getColumnsPartOfState()`", async () => {
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

test("030 It should allow assert on 'Columns' part of state value using `#expectColumnsPartOfStateIs()`", async () => {
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

test("040 It should allow assert on item's 'Columns' part of state value using `#expectColumnsPartOfStateIs()` - with 'isNot' option set", async () => {
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
