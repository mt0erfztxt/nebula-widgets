import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import FormField from '../../../../../src/js/widgets/form-field';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

const expect = unexpected.clone();
expect.use(unexpectedSinon);

fixture `Widgets :: Form Field :: 010 All`
  .page('http://localhost:3449/widgets/form-field');

test("010 It should allow obtain form field", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const formField = new FormField({ idx: 0, parent: parent });
  await formField.expectIsExist();
  await formField.hover();
});

test("020 It should allow get form field's 'Inline' part of state using `#getInlinePartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();
  expect(await ff.getInlinePartOfState(), 'to be false');

  const rgi = new RadioGroupInput({ cid: 'inline', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });
  expect(await ff.getInlinePartOfState(), 'to be true');
});

test("030 It should allow assert on whether form field is inline using `#expectIsInline()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();

  const rgi = new RadioGroupInput({ cid: 'inline', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });
  await ff.expectIsInline();

  // -- Failing case

  let isThrown = false;

  await ff.constructor.reloadBrowserPage();
  await ff.expectIsExist();
  await ff.hover();

  try {
    await ff.expectIsInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.form-field.+must have BEM modifier 'inline,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow assert on whether form field isn't inline using `#expectIsNotInline()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();
  await ff.expectIsNotInline();

  // -- Failing case

  let isThrown = false;

  const rgi = new RadioGroupInput({ cid: 'inline', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });

  try {
    await ff.expectIsNotInline();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.form-field.+must not have BEM modifier 'inline,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("050 It should allow get form field's 'Required' part of state using `#getRequiredPartOfState()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();
  expect(await ff.getRequiredPartOfState(), 'to be false');

  const rgi = new RadioGroupInput({ cid: 'required', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });
  expect(await ff.getRequiredPartOfState(), 'to be true');
});

test("060 It should allow assert on whether form field is required using `#expectIsRequired()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();

  const rgi = new RadioGroupInput({ cid: 'required', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });
  await ff.expectIsRequired();

  // -- Failing case

  let isThrown = false;

  await ff.constructor.reloadBrowserPage();
  await ff.expectIsExist();
  await ff.hover();

  try {
    await ff.expectIsRequired();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.form-field.+must have BEM modifier 'required,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("070 It should allow assert on whether form field isn't required using `#expectIsNotRequired()`", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();
  await ff.expectIsNotRequired();

  // -- Failing case

  let isThrown = false;

  const rgi = new RadioGroupInput({ cid: 'required', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });

  try {
    await ff.expectIsNotRequired();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.form-field.+must not have BEM modifier 'required,'.+but it does/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("080 It should allow assert on label text using `#expectLabelIs()` - case when label is a string", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();

  const expectTextIsSpy = sinon.spy(ff, 'expectTextIs');
  await ff.expectLabelIs('Field', { foo: 'bar' });
  expect(expectTextIsSpy, 'was called times', 1);
  expect(expectTextIsSpy, 'to have a call satisfying', {
    args: [
      'Field',
      {
        foo: 'bar',
        selector: ff.labelElementSelector
      }
    ]
  });
});

test("090 It should allow assert on label text using `#expectLabelIs()` - case when label is a tuple", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const ff = new FormField({ idx: 0, parent });
  await ff.expectIsExist();
  await ff.hover();

  const rgi = new RadioGroupInput({ cid: 'label', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'tuple' });

  const expectTextIsSpy = sinon.spy(ff, 'expectTextIs');
  await ff.expectLabelIs('Fieldauxiliary text', { foo: 'bar' });
  expect(expectTextIsSpy, 'was called times', 1);
  expect(expectTextIsSpy, 'to have a call satisfying', {
    args: [
      'Fieldauxiliary text',
      {
        foo: 'bar',
        selector: ff.labelElementSelector
      }
    ]
  });
});
