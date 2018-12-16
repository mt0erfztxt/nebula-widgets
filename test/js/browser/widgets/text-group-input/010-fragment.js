import expect from 'unexpected';

import TextGroupInput from '../../../../../src/js/widgets/text-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

fixture('Widgets :: Text Group Input :: 010 Fragment')
  .page('http://localhost:3449/widgets/text-group-input');

test("010 It should allow obtain text group input", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new TextGroupInput({ idx: 0 }, {
    parent: parent.viewElementSelector
  });
  expect(sut, 'to be a', TextGroupInput);
  await sut.expectIsExist();
  await sut.hover();
});
