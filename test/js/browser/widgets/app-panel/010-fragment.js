import { camelCase } from 'change-case';

import AppPanel from '../../../../../src/js/widgets/app-panel';
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
 * @returns {Promise<AppPanel>}
 */
async function getSut() {
  const sut = new AppPanel({ idx: 0 });
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
  result.sut = await getSut();

  return result;
}

fixture('Widgets :: Application Panel :: 010 Fragment')
  .page('http://localhost:3449/widgets/app-panel');

test("010 It should allow obtain application panel", async () => {
  const sut = new AppPanel({ idx: 0 });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain application panel's sidebar using '#getSidebar()'", async (t) => {
  const { knob, sut } = await getHelperFragments('sidebars-left-exists');
  const sidebar = sut.getSidebar({ placement: 'left' });

  await knob.clickItem({ value: 'true' });
  await sidebar.expectIsExist();
  await sidebar.hover();
  await t.expect(sidebar.selector.textContent).eql('Left sidebar');
});

test("030 It should allow obtain application panel's toolbar using '#getToolbar()'", async (t) => {
  const { knob, sut } = await getHelperFragments('toolbars');
  const toolbar = sut.getToolbar([{ placement: 'top' }, { idx: 1 }]);

  await knob.clickItem({ value: 'top2+bottom2' });
  await toolbar.expectIsExist();
  await toolbar.hover();
  await t.expect(toolbar.selector.textContent).eql('Content of toolbar 2');
});
