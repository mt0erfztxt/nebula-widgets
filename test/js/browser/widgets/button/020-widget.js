import { camelCase } from 'change-case';

import Button from '../../../../../src/js/widgets/button';
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
 * @returns {Promise<Button>}
 */
async function getSut(parent) {
  const sut = new Button({ idx: 0 }, {
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

fixture('Widgets :: Button :: 020 Widget')
  .page('http://localhost:3449/widgets/button');

test("010 It should have 'disabled' attribute when 'disabled' prop evaluates to logical true", async (t) => {
  const { knob, sut } = await getHelperFragments('disabled');

  await knob.clickItem({ value: 'false' });
  await t
    .expect(sut.selector.hasAttribute('disabled'))
    .eql(false);

  await knob.clickItem({ value: 'true' });
  await t
    .expect(sut.selector.hasAttribute('disabled'))
    .eql(true);
});

test("020 It should be rendered using <A> tag when 'href' prop evaluates to logical true", async () => {
  const { knob, sut } = await getHelperFragments('href');

  await knob.clickItem({ value: 'nil' });
  await sut.expectIsButton();

  await knob.clickItem({ value: 'string' });
  await sut.expectIsLink({ href: 'http://example.tld' });
});
