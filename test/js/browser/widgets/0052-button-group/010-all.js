import ButtonGroup from '../../../../../src/js/widgets/button-group';
import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';

fixture `Widgets :: Button Group :: 010 All`
  .page('http://localhost:3449/widgets/button-group');

test("010 It should allow obtain button group", async () => {
  const parent = new ManPageExample({ cid: '010' });
  await parent.expectIsExist();

  const buttonGroup = new ButtonGroup({ cid: '010', parent });
  await buttonGroup.expectIsExist();
  await buttonGroup.hover();
});

test("020 It should allow obtain button group - case of custom 'alignment' spec", async () => {
  const parent = new ManPageExample({ cid: '020' });
  await parent.expectIsExist();

  const buttonGroup = new ButtonGroup({ alignment: 'right', parent });
  await buttonGroup.expectIsExist();
  await buttonGroup.hover();
  await buttonGroup.expectAlignmentPartOfStateIs('right');
});
