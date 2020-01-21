import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import FormField from '../../../../../src/js/widgets/form-field';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

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
  const sut = new FormField({ idx: 0 }, {
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

fixture('Fragments :: Form Field :: 010 Fragment')
  .page('http://localhost:3449/widgets/form-field');

test("010 It should allow obtain form field", async () => {
  const parent = new InteractiveExample();
  await parent.expectIsExist();

  const sut = new FormField({ idx: 0 }, {
    parent: parent.viewElementSelector
  });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow assert on label text using '#expectLabelIs()' - case when label is a string", async () => {
  const sut = await getSut();
  await sut.expectIsExist();
  await sut.hover();

  const expectTextIsSpy = sinon.spy(sut, 'expectTextIs');
  await sut.expectLabelIs('Field', { selector: 'bar' });
  expect(expectTextIsSpy, 'was called times', 1);
  expect(expectTextIsSpy, 'to have a call satisfying', {
    args: [
      'Field',
      {
        selector: sut.labelElementSelector
      }
    ]
  });
});

test("030 It should allow assert on label text using '#expectLabelIs()' - case when label is a tuple", async () => {
  const { knob, sut } = await getHelperFragments('label');

  await knob.clickItem({ value: 'tuple' });
  await sut.hover();

  const expectTextIsSpy = sinon.spy(sut, 'expectTextIs');
  await sut.expectLabelIs('Fieldauxiliary text', { selector: 'bar' });
  expect(expectTextIsSpy, 'was called times', 1);
  expect(expectTextIsSpy, 'to have a call satisfying', {
    args: [
      'Fieldauxiliary text',
      {
        selector: sut.labelElementSelector
      }
    ]
  });
});

// TODO: Add tests for 'Input' part of state