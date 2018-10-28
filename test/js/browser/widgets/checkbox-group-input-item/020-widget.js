import expect from 'unexpected';

import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import CheckboxGroupInputItem from '../../../../../src/js/widgets/checkbox-group-input/item';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

fixture `Widgets :: Checkbox Group Input Item :: 010 Widget`
  .page('http://localhost:3449/widgets/checkbox-group-input-item');

test("010 It should allow to check / uncheck item by clicking on it's label", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsChecked();
  await item.click();
  await item.expectIsNotChecked();
});

test("020 It should not allow to change item's checked state by click when item is disabled", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: 'disabled', parent });
  await rgi.expectIsExist();
  await rgi.clickItem({ label: 'true' });

  const item = new CheckboxGroupInputItem({ idx: 0, parent });
  await item.expectIsExist();
  await item.expectIsNotChecked();
  await item.click();
  await item.expectIsNotChecked();
});
