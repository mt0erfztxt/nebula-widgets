import expect from 'unexpected';
import { camelCase } from 'change-case';

import TabGroup from '../../../../../src/js/widgets/tab-group';
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
 * @returns {Promise<TabGroup>}
 */
async function getSut(parent) {
  const sut = new TabGroup({ idx: 0 }, {
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

fixture('Widgets :: Tab Group :: 010 Fragment')
  .page('http://localhost:3449/widgets/tab-group');

test("010 It should allow obtain tab group", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new TabGroup({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow obtain tab using '#getTab()' - case of custom 'active' selector transformation", async (t) => {
  const { knob, sut } = await getHelperFragments('active-tab');
  await knob.clickItem({ value: 'tab1' });

  // -- Case of active tab

  const activeTab = sut.getTab({ active: true });
  await activeTab.expectIsExist();
  await activeTab.hover();
  await t.expect(activeTab.selector.textContent).eql('Tab1');

  // -- Case of inactive tab

  const inactiveTabsText = ['Tab22', 'Tab333', ''];
  const inactiveTabsCount = inactiveTabsText.length;
  const inactiveTabs = sut.getTab({ active: false });
  await inactiveTabs.expectIsExist({ allowMultiple: true });
  await t.expect(inactiveTabs.selector.count).eql(inactiveTabsCount);

  for (let i = 0; i < inactiveTabsCount; i++) {
    const sel = inactiveTabs.selector.nth(i);
    await t
      .hover(sel)
      .expect(sel.textContent).eql(inactiveTabsText[i]);
  }
});

test("030 It should allow assert that specified tab is active using '#expectActiveis()'", async () => {
  const { knob, sut } = await getHelperFragments('active-tab');
  await knob.clickItem({ value: 'tab1' });

  // -- Successful case

  await sut.expectActiveTabIs({ cid: 'tab1' });
  await sut.expectActiveTabIs({ idx: 0 });
  await sut.expectActiveTabIs({ active: true });

  // -- Failing case

  let isThrown = false;

  try {
    await sut.expectActiveTabIs({ cid: 'tab2' });
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /AssertionError:.+\.tab-group\.tab.+must have BEM modifier 'active,'.+but it doesn't/
    );

    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test("040 It should allow obtain button", async () => {
  const { knob, sut } = await getHelperFragments('button-groups');
  await knob.clickItem({ value: 'end4' });

  const icon = 'angle-double-up';
  const button = sut.getButton({ cid: icon });
  await button.expectIsExist({ hover: true });
  await button.expectIconIs(icon);
});

test("050 It should allow set active tab using '#setActiveTab()'", async () => {
  const { knob, sut } = await getHelperFragments('active-tab');
  const tab1 = sut.getTab({ cid: 'tab1' });
  const tab3 = sut.getTab({ cid: 'tab3' });

  await knob.clickItem({ value: 'tab1' });
  await tab1.expectIsActive();
  await tab3.expectIsNotActive();

  await sut.setActiveTab({ cid: 'tab3' });
  await tab1.expectIsNotActive();
  await tab3.expectIsActive();
});
