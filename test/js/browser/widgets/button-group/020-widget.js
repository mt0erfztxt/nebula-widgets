import { camelCase } from 'change-case';

import ButtonGroup from '../../../../../src/js/widgets/button-group';
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
 * @returns {Promise<ButtonGroup>}
 */
async function getSut(parent) {
  const sut = new ButtonGroup({ idx: 0 }, {
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

fixture('Widgets :: Button Group :: 020 Widget')
  .page('http://localhost:3449/widgets/button-group');

test("010 It should propagate 'disabled' prop to buttons", async () => {
  const {
    disabledKnob,
    buttonDisabledKnob,
    sut
  } = await getHelperFragments('disabled', 'button-disabled');

  const isButtonsDisabled = async (disabled) => {
    for (let i = 0; i < 3; i++) {
      const button = sut.getButton({ idx: i });
      await button.expectIsExist();
      await button.hover();

      if (disabled) {
        await button.expectIsDisabled();
      }
      else {
        await button.expectIsNotDisabled();
      }
    }
  }

  // -- Check 'disabled' can't be overriden on button level for disabled group

  await disabledKnob.clickItem({ value: 'true' });

  await buttonDisabledKnob.clickItem({ value: 'nil' });
  await isButtonsDisabled(true);

  await buttonDisabledKnob.clickItem({ value: 'false' });
  await isButtonsDisabled(true);

  // -- Check 'disabled' can be overriden on button level for not disabled group

  await disabledKnob.clickItem({ value: 'false' });

  await buttonDisabledKnob.clickItem({ value: 'nil' });
  await isButtonsDisabled(false);

  await buttonDisabledKnob.clickItem({ value: 'true' });
  await isButtonsDisabled(true);
});
