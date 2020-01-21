import expect from 'unexpected';
import { camelCase } from 'change-case';

import Action from '../../../../../src/js/widgets/action-group/action';
import ActionGroup from '../../../../../src/js/widgets/action-group';
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
 * @returns {Promise<ActionGroup>}
 */
async function getSut(parent) {
  const sut = new ActionGroup({ idx: 0 }, {
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

fixture('Widgets :: ActionGroup Group :: 020 Fragment')
  .page('http://localhost:3449/widgets/action-group');

test("010 It should allow obtain action group", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new ActionGroup({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain action group's action using '#getAction()'", async (t) => {
  const sut = await getSut();
  const action = sut.getAction({ idx: 1 });
  expect(action, 'to be an', Action);
  await action.expectIsExist();
  await action.hover();
  await action.expectTextIs('ACTION2');
});
