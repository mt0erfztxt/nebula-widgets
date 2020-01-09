import expect from 'unexpected';
import { camelCase } from 'change-case';

import AppPanelSidebar from '../../../../../src/js/widgets/app-panel/sidebar';
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
 * Returns left sidebar.
 *
 * @returns {Promise<AppPanelSidebar>}
 */
async function getSut() {
  const sut = new AppPanelSidebar({ idx: 0 });
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

fixture('Widgets :: Application Panel :: 005 Sidebar Fragment')
  .page('http://localhost:3449/widgets/app-panel');

test("010 It should allow obtain application panel sidebar", async () => {
  const sut = new AppPanelSidebar({ idx: 0 });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain application panel sidebar - case of custom 'placement' selector transformation", async (t) => {
  const {
    sidebarsLeftExistsKnob,
    sidebarsRightExistsKnob
  } = await getHelperFragments(
    'sidebars-left-exists',
    'sidebars-right-exists'
  );

  await sidebarsLeftExistsKnob.clickItem({ value: 'true' });
  const leftSidebar = new AppPanelSidebar({ placement: 'left' });
  await leftSidebar.expectIsExist();
  await leftSidebar.hover();
  await t.expect(leftSidebar.selector.textContent).eql('Left sidebar');

  await sidebarsRightExistsKnob.clickItem({ value: 'true' });
  const rightSidebar = new AppPanelSidebar({ placement: 'right' });
  await rightSidebar.expectIsExist();
  await rightSidebar.hover();
  await t.expect(rightSidebar.selector.textContent).eql('Right sidebar');

  // -- Failing case

  let isThrown = false;

  try {
    await t.expect(rightSidebar.selector.textContent).eql('Left sidebar');
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /^AssertionError:.+ 'Right sidebar' to deeply equal 'Left sidebar'$/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("030 It should allow assert that application panel's sidebar is collapsed using '#expectIsCollapsed()'", async () => {
  const {
    sidebarsLeftExistsKnob,
    sidebarsLeftCollapsedKnob,
    sut
  } = await getHelperFragments(
    'sidebars-left-exists',
    'sidebars-left-collapsed'
  );

  await sidebarsLeftExistsKnob.clickItem({ value: 'true' });

  // -- Successful case

  await sidebarsLeftCollapsedKnob.clickItem({ value: 'true' });
  await sut.expectIsCollapsed();

  await sidebarsLeftCollapsedKnob.clickItem({ value: 'false' });
  await sut.expectIsNotCollapsed();

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectIsCollapsed();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /^AssertionError:.+app-panel\.sidebar' fragment must have BEM modifier 'collapsed,'.*but it doesn't.*$/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
