import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import TextGroupInput from '../../../../../src/js/widgets/text-group-input';

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

/**
 * @param {*} [parent]
 * @returns {TextGroupInput}
 */
async function getSut(parent) {
  const sut = new TextGroupInput({ idx: 0 }, {
    parent: parent || (await getInteractiveExample()).viewElementSelector
  });
  await sut.expectIsExist();
  return sut;
}

async function getHelperFragments(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: knobCid ? (await getKnob(knobCid, parent)) : void 0,
    parent,
    sut: await getSut(parent.viewElementSelector)
  };
}

fixture('Widgets :: Text Group Input :: 020 Widget')
  .page('http://localhost:3449/widgets/text-group-input');

test("010 It should allow to insert and remove items using input actions", async () => {
  const sut = await getSut();
  await sut.hover();
  await sut.expectValuePartOfStateIs(["foo"]);

  const [item1, item2] = [0, 1].map((idx) => sut.getItem({ idx }));

  // -- Check item insertion

  await item1.expectIsExist();
  await item1.expectValuePartOfStateIs('foo');
  await item1.clickInsertAction();
  await sut.expectValuePartOfStateIs(['foo', '']);

  await item2.expectIsExist();
  await item2.setValuePartOfState('bar');
  await sut.expectValuePartOfStateIs(['foo', 'bar']);

  await item1.clickInsertAction();
  await sut.expectValuePartOfStateIs(['foo', '', 'bar']);

  // -- Check item removal

  await item1.clickRemoveAction();
  await sut.expectValuePartOfStateIs(['', 'bar']);

  await item2.clickRemoveAction();
  await sut.expectValuePartOfStateIs(['']);
});

test("020 It should propagate 'disabled' prop to items", async () => {
  const { knob, sut } = await getHelperFragments('disabled');
  await sut.hover();
  await sut.expectValuePartOfStateIs(['foo']);

  await sut.setValuePartOfState(['foo', 'bar']);
  await sut.expectValuePartOfStateIs(['foo', 'bar']);

  await knob.clickItem({ value: 'true' });
  await sut.expectIsDisabled();

  const [item1, item2] = [0, 1].map((idx) => sut.getItem({ idx }));

  // -- Check that value can't be changed

  await item1.setValuePartOfState('42');
  await sut.expectValuePartOfStateIs(['foo', 'bar']);

  // -- Check that 'Insert' action is disabled

  await item1.clickInsertAction();
  await sut.expectValuePartOfStateIs(['foo', 'bar']);

  // -- Check that 'Remove' action is disabled

  await item2.clickInsertAction();
  await sut.expectValuePartOfStateIs(['foo', 'bar']);
});
