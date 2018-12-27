import { camelCase } from 'change-case';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import CheckableGroupInputFormField from '../../../../../src/js/widgets/checkable-group-input-form-field';
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
 * @returns {Promise<CheckableGroupInputFormField>}
 */
async function getSut(parent) {
  const sut = new CheckableGroupInputFormField({ idx: 0 }, {
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

fixture('Widgets :: Checkable Group Input Form Field :: 020 Widget')
  .page('http://localhost:3449/widgets/checkable-group-input-form-field');

test("010 It should propagate 'disabled' prop to input", async () => {
  const { knob, sut } = await getHelperFragments('disabled');
  await sut.hover();
  await sut.setValue(['option1', 'option4']);

  await knob.clickItem({ value: 'true' });
  await sut.expectIsDisabled();

  await sut.setValue(['option9']);
  await sut.expectValueIs(['option1', 'option4']);
});
