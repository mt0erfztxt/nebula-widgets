import expect from 'unexpected';
import { camelCase } from 'change-case';

import Button from '../../../../../src/js/widgets/button';
import ButtonGroup from '../../../../../src/js/widgets/button-group';
import ButtonGroupSet from '../../../../../src/js/widgets/button-group-set';
import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

/**
 * @returns {Promise<InteractiveExample>}
 */
async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

/**
 * @returns {Promise<CheckableGroupInput>}
 */
async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput({ cid }, { parent });
  await knob.expectIsExist();
  return knob;
}

/**
 * @returns {Promise<ButtonGroupSet>}
 */
async function getSut(parent) {
  const sut = new ButtonGroupSet({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

/**
 * @returns {Promise<Object>}
 */
async function getHelperFragments(...knobCids) {
  const ie = await getInteractiveExample();
  const result = { ie };

  for (const knobCid of knobCids) {
    result[`${camelCase(knobCid)}Knob`] = await getKnob(knobCid, ie);
  }

  result.knob = result[`${camelCase(knobCids[0])}Knob`];
  result.sut = await getSut(ie.viewElementSelector);

  return result;
}

fixture('Widgets :: Button Group Set :: 010 Fragment')
  .page('http://localhost:3449/widgets/button-group-set');

test("010 It should allow obtain button group", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new ButtonGroupSet({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow to be initialized using `#init()`", async () => {
  const sut = await getSut();
  await sut.hover();

  sut.init({
    buttons: {
      btn1: [{ text: 'BUTTON1' }],
      btn11: { text: 'BUTTON11' } // not exists in DOM
    },
    buttonGroups: {
      btnGrpLeft: [{ alignment: 'left' }],
      btnGrpRight: { alignment: 'right' },
      btnGrpNonExistent: { alignment: 'non-existent' } // not exists in DOM
    }
  });

  // -- Check buttons

  expect(sut.buttons, 'to only have keys', ['btn1', 'btn11']);

  expect(sut.buttons.btn1, 'to be a', Button);
  await sut.buttons.btn1.expectIsExist();
  await sut.buttons.btn1.hover();

  expect(sut.buttons.btn11, 'to be a', Button);
  await sut.buttons.btn11.expectIsNotExist();

  // -- Check button groups

  expect(sut.buttonGroups, 'to only have keys', [
    'btnGrpLeft',
    'btnGrpRight',
    'btnGrpNonExistent'
  ]);

  expect(sut.buttonGroups.btnGrpLeft, 'to be a', ButtonGroup);
  await sut.buttonGroups.btnGrpLeft.expectIsExist();
  await sut.buttonGroups.btnGrpLeft.expectAlignmentIs('left');
  await sut.buttonGroups.btnGrpLeft.hover();

  expect(sut.buttonGroups.btnGrpRight, 'to be a', ButtonGroup);
  await sut.buttonGroups.btnGrpRight.expectIsExist();
  await sut.buttonGroups.btnGrpRight.expectAlignmentIsNot('left');
  await sut.buttonGroups.btnGrpRight.hover();

  expect(sut.buttonGroups.btnGrpNonExistent, 'to be a', ButtonGroup);
  await sut.buttonGroups.btnGrpNonExistent.expectIsNotExist();
});
