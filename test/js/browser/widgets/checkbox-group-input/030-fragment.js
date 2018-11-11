import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import CheckboxGroupInput from '../../../../../src/js/widgets/checkbox-group-input';

fixture `Widgets :: Checkbox Group Input :: 030 Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input');

test("010 It should allow obtain checkbox group input", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new CheckboxGroupInput({ idx: 0, parent });
  await sut.expectIsExist();
  await sut.hover();
});
