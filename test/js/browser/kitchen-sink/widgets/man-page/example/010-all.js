import Example from '../../../../../../../src/js/kitchen-sink/widgets/man-page/example';

fixture `Kitchen Sink :: Widgets :: Man Page :: Example :: 010 All`
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should allow obtain man page's example", async () => {
  const example = new Example({ cid: '010' });
  await example.expectIsExist();
});

test("020 It should allow assert on example's title using `expectTitleIs()`", async () => {
  const example = new Example({ cid: '010' });
  await example.expectTitleIs('Example # 010 - widget with value prop not equal to value of any item');
});
