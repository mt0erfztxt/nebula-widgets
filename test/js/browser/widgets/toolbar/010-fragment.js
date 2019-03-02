import expect from 'unexpected';
import { camelCase } from 'change-case';

import Action from '../../../../../src/js/widgets/action-group/action';
import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import Toolbar from '../../../../../src/js/widgets/toolbar';

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
 * @returns {Promise<Toolbar>}
 */
async function getSut(parent) {
  const sut = new Toolbar({ idx: 0 }, {
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

fixture('Widgets :: Toolbar Group :: 010 Fragment')
  .page('http://localhost:3449/widgets/toolbar');

test("010 It should allow obtain toolbar", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new Toolbar({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain action using '#getAction()'", async () => {
  const sut = await getSut();
  const action = sut.getAction({ idx: 1 });
  expect(action, 'to be an', Action);
  await action.expectIsExist();
  await action.hover();
  await action.expectCidIs('edit');
});
