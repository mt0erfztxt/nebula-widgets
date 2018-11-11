import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input';

fixture `Widgets :: Radio Group Input :: 030 Fragment`
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should allow obtain radio group input", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new RadioGroupInput({ idx: 0, parent });
  await sut.expectIsExist();
  await sut.hover();
});
