import Action from '../../../../../src/js/widgets/text-input/action';
import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import TextInput from '../../../../../src/js/widgets/text-input';

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput({ cid }, { parent });
  await knob.expectIsExist();
  return knob;
}

async function getSut(parent) {
  const sut = new TextInput({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: knobCid ? (await getKnob(knobCid, parent)) : undefined,
    parent,
    sut: await getSut(parent.viewElementSelector)
  };
}

fixture('Widgets :: Text Input :: 005 Action Fragment')
  .page('http://localhost:3449/widgets/text-input');

test("010 It should allow obtain text input's action", async () => {
  const { knob, sut } = await getHelperFragments('actions');
  await knob.clickItem({ value: 'yes' });

  const action = new Action({ idx: 0 }, { parent: sut });
  await action.expectIsExist();
  await action.hover();
});
