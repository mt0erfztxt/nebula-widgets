import expect from 'unexpected';
import { camelCase } from 'change-case';

import Button from '../../../../../src/js/widgets/button';
import Form from '../../../../../src/js/widgets/form';
import CheckableGroupInput from '../../../../../src/js/widgets/checkable-group-input';
import CheckableGroupInputFormField from '../../../../../src/js/widgets/checkable-group-input-form-field';
import InteractiveExample from '../../../../../src/js/kitchen-sink/widgets/man-page/interactive-example';
import TextInputFormField from '../../../../../src/js/widgets/text-input-form-field';

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
 * @returns {Promise<Form>}
 */
async function getSut(parent) {
  const sut = new Form({ idx: 0 }, {
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

fixture('Widgets :: Form :: 010 Fragment')
  .page('http://localhost:3449/widgets/form');

test("010 It should allow obtain form", async () => {
  const parent = (await getInteractiveExample()).viewElementSelector;
  const sut = new Form({ idx: 0 }, { parent });
  await sut.expectIsExist();
  await sut.hover();
});

test("020 It should allow to be initialized using '#init()' - case of buttons", async () => {
  const sut = await getSut();
  await sut.hover();

  sut.init({
    buttons: {
      cancel: [{ text: 'CANCEL' }],
      nonExistent: { cid: 'foo' },
      submit: { cid: 'submit' }
    }
  });

  expect(sut.buttons, 'to be an', Object);
  expect(
    sut.buttons,
    'to only have keys',
    ['cancel', 'nonExistent', 'submit']
  );
  expect(
    sut.buttons,
    'to have values exhaustively satisfying',
    expect.it((value) => expect(value, 'to be a', Button))
  );

  await sut.buttons.cancel.expectIsExist();
  await sut.buttons.cancel.hover();

  await sut.buttons.nonExistent.expectIsNotExist();

  await sut.buttons.submit.expectIsExist();
  await sut.buttons.submit.hover();
});

test("030 It should allow to be initialized using '#init()' - case of fields", async () => {
  const sut = await getSut();
  await sut.hover();

  sut.init({
    fields: {
      firstName: ['TextInputFormField', { cid: 'first-name' }],
      lastName: ['TextInput', { cid: 'last-name' }],
      likes: [CheckableGroupInputFormField, { cid: 'likes' }]
    }
  });

  expect(sut.fields, 'to be an', Object);
  expect(
    sut.fields,
    'to only have keys',
    ['firstName', 'lastName', 'likes']
  );

  expect(sut.fields.firstName, 'to be a', TextInputFormField);
  await sut.fields.firstName.expectIsExist();
  await sut.fields.firstName.hover();

  expect(sut.fields.lastName, 'to be a', TextInputFormField);
  await sut.fields.lastName.expectIsNotExist();

  expect(sut.fields.likes, 'to be a', CheckableGroupInputFormField);
  await sut.fields.likes.expectIsExist();
  await sut.fields.likes.hover();
});

test("040 It should allow to set from's state using '#setState()'", async () => {
  const sut = await getSut();
  await sut.hover();

  sut.init({
    fields: {
      firstName: ['TextInputFormField', { cid: 'first-name' }],
      likes: [CheckableGroupInputFormField, { cid: 'likes' }]
    }
  });

  const newFirstName = 'alpha beta foobar';
  const newLikes = ['Bananas', 'Oranges'];

  await sut.fields.firstName.expectValueIsNot(newFirstName)
  await sut.fields.likes.expectValueIsNot(newLikes)

  await sut.setState({
    fields: {
      firstName: {
        input: {
          value: newFirstName
        }
      },
      likes: {
        input: {
          value: newLikes
        }
      }
    }
  });

  await sut.fields.firstName.expectValueIs(newFirstName)
  await sut.fields.likes.expectValueIs(newLikes)
});
