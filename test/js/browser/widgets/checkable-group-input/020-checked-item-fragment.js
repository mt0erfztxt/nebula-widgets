/**
 * Checkable group input checked item fragment doesn't represent concrete
 * widget and used to aggregate common functionality, and because of that it
 * tested using checkbox group input item fragment.
 */

import CheckboxGroupInputCheckedItem from '../../../../../src/js/widgets/checkbox-group-input/checked-item';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input'

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const rgi = new RadioGroupInput({
    cid,
    parent: parent || await getInteractiveExample()
  });
  await rgi.expectIsExist();
  return rgi;
}

fixture `Widgets :: Checkable Group Input :: 020 Checked Item Fragment`
  .page('http://localhost:3449/widgets/checkbox-group-input-item');

test("010 It should allow obtain checkable group input checked item", async () => {
  const parent = await getInteractiveExample();
  const knob = await getKnob('checked', parent);
  const sut = new CheckboxGroupInputCheckedItem({ idx: 0, parent });

  // -- Check when no checked item exist

  await knob.clickItem({ label: 'false' });
  await sut.expectIsNotExist();

  // -- Check when checked item exist

  await knob.clickItem({ label: 'true' });
  await sut.expectIsExist();
  await sut.hoverLabel();
});
