import ButtonGroup from '../../../../../src/js/widgets/button-group';
import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';

fixture `Widgets :: Button Group :: 010 All`
  .page('http://localhost:3449/widgets/button-group');

test("010 It should allow obtain button group", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const buttonGroup = new ButtonGroup({ cid: '010', parent: example010 });
  await buttonGroup.expectIsExist();
  await buttonGroup.hover();
});
