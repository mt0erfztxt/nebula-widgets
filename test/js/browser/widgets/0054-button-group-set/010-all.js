import ButtonGroupSet from '../../../../../src/js/widgets/button-group-set';
import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';

fixture `Widgets :: Button Group Set :: 010 All`
  .page('http://localhost:3449/widgets/button-group-set');

test("010 It should allow obtain button group set", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const buttonGroupSet = new ButtonGroupSet({ cid: '010', parent: example010 });
  await buttonGroupSet.expectIsExist();
  await buttonGroupSet.hover();
});
