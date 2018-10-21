import expect from 'unexpected';

import FormField from '../../../../../src/js/widgets/form-field';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

fixture `Widgets :: Form Field :: 010 All`
  .page('http://localhost:3449/widgets/form-field');

test("010 It should allow obtain form field", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const formField = new FormField({ idx: 0, parent: parent });
  await formField.expectIsExist();
  await formField.hover();
});
