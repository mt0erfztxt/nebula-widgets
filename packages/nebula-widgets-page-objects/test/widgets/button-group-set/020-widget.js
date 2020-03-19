import { camelCase } from 'change-case';

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

fixture('Widgets :: Button Group Set :: 020 Widget')
  .page('http://localhost:3449/widgets/button-group-set');

test("010 It should propagate 'disabled' prop to groups", async () => {
  const {
    disabledKnob,
    groupDisabledKnob,
    sut
  } = await getHelperFragments('disabled', 'group-disabled');

  const isGroupsDisabled = async (disabled) => {
    for (let i = 0; i < 3; i++) {
      const group = sut.getButtonGroup({ idx: i });
      await group.expectIsExist();
      await group.hover();

      if (disabled) {
        await group.expectIsDisabled();
      }
      else {
        await group.expectIsNotDisabled();
      }
    }
  }

  // -- Check 'disabled' can't be overriden on group level for disabled set

  await disabledKnob.clickItem({ value: 'true' });

  await groupDisabledKnob.clickItem({ value: 'nil' });
  await isGroupsDisabled(true);

  await groupDisabledKnob.clickItem({ value: 'false' });
  await isGroupsDisabled(true);

  // -- Check 'disabled' can be overriden on group level for not disabled set

  await disabledKnob.clickItem({ value: 'false' });

  await groupDisabledKnob.clickItem({ value: 'nil' });
  await isGroupsDisabled(false);

  await groupDisabledKnob.clickItem({ value: 'true' });
  await isGroupsDisabled(true);
});
