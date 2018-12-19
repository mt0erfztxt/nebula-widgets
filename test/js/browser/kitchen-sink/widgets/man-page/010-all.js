import ManPage from '../../../../../../src/js/kitchen-sink/widgets/man-page';

fixture `Kitchen Sink :: Widgets :: Man Page :: 010 All`
  .page('http://localhost:3449/widgets/checkable-group-input');

test("010 It should allow obtain man page", async () => {
  const manPage = new ManPage();
  await manPage.expectIsExist();
});

test("020 It should allow to get example using `#getExample()`", async () => {
  const manPage = new ManPage();
  await manPage.expectIsExist();

  const example010 = manPage.getExample({ cid: '010' });
  await example010.expectTitleIs('Example # 010 - without checked item');

  const example030s020 = manPage.getExample({ cid: '020' });
  await example030s020.expectTitleIs('Example # 020 - with checked item');
});
