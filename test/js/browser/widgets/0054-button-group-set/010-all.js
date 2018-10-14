import expect from 'unexpected';

import Button from '../../../../../src/js/widgets/button';
import ButtonGroup from '../../../../../src/js/widgets/button-group';
import ButtonGroupSet from '../../../../../src/js/widgets/button-group-set';
import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';

fixture `Widgets :: Button Group Set :: 010 All`
  .page('http://localhost:3449/widgets/button-group-set');

test("010 It should allow obtain button group set", async () => {
  const parent = new ManPageExample({ cid: '010' });
  await parent.expectIsExist();

  const buttonGroupSet = new ButtonGroupSet({ cid: '010', parent });
  await buttonGroupSet.expectIsExist();
  await buttonGroupSet.hover();
});

test("020 It should allow to be initialized using `#init()`", async () => {
  const parent = new ManPageExample({ cid: '010' });
  await parent.expectIsExist();

  const buttonGroupSet = new ButtonGroupSet({ cid: '010', parent });
  await buttonGroupSet.expectIsExist();
  await buttonGroupSet.hover();

  buttonGroupSet.init({
    buttons: {
      btn1: [{ text: 'BUTTON1' }],
      btn11: { text: 'BUTTON11' }
    },
    buttonGroups: {
      btnGrpLeft: [{ alignment: 'left' }],
      btnGrpRight: { alignment: 'right' }
    }
  });

  // -- Buttons

  expect(buttonGroupSet.buttons, 'to only have keys', ['btn1', 'btn11']);
  expect(buttonGroupSet.buttons.btn1, 'to be a', Button);

  await buttonGroupSet.buttons.btn1.expectIsExist();
  await buttonGroupSet.buttons.btn11.expectIsNotExist();

  // -- Button groups

  expect(buttonGroupSet.buttonGroups, 'to only have keys', ['btnGrpLeft', 'btnGrpRight']);
  expect(buttonGroupSet.buttonGroups.btnGrpLeft, 'to be a', ButtonGroup);

  await buttonGroupSet.buttonGroups.btnGrpLeft.expectIsExist();
  await buttonGroupSet.buttonGroups.btnGrpLeft.expectAlignmentIs('left');
  await buttonGroupSet.buttonGroups.btnGrpRight.expectIsExist();
  await buttonGroupSet.buttonGroups.btnGrpRight.expectAlignmentIsNot('left');
});
