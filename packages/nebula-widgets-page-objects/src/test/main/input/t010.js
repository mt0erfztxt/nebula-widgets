/**
 * Input page object doesn't represent concrete widget and used to aggregate
 * common functionality, and tested using checkable input page object.
 */

import CheckableGroupInput from "../../../main/checkableGroupInput";
import CheckableInput from "../../../main/checkableInput";
import InteractiveExample from "../../../kitchenSink/widgets/manPage/interactiveExample";

async function getInteractiveExample() {
  const ie = new InteractiveExample();
  await ie.expectIsExist();
  return ie;
}

async function getKnob(cid, parent) {
  const knob = new CheckableGroupInput(parent, cid);
  await knob.expectIsExist();
  return knob;
}

async function getSut(parent) {
  const sut = new CheckableInput(parent, 0);
  await sut.expectIsExist();
  return sut;
}

/**
 * @param {string} knobCid
 * @returns {Promise<{knob: CheckableGroupInput, sut: CheckableInput}>}
 */
async function getHelperPageObjects(knobCid) {
  const parent = await getInteractiveExample();
  return {
    knob: await getKnob(knobCid, parent),
    sut: await getSut(parent.viewElementSelector)
  };
}

fixture("Main :: Input :: 010")
  .page("http://localhost:3449/widgets/checkable-input")
  .beforeEach(async t => {
    await t.maximizeWindow();
  });

test("010 handles 'Disabled' state part", async () => {
  const { knob, sut } = await getHelperPageObjects("disabled");

  // -- Check when enabled --

  await sut.hover();
  await sut.expect("not disabled");

  // -- Check when disabled --

  await knob.clickItem(["value", "true"]);
  await sut.hover();
  await sut.expect("disabled");
});

test("020 handles 'Invalid' state part", async () => {
  const { knob, sut } = await getHelperPageObjects("invalid");

  // -- Check when valid --

  await sut.hover();
  await sut.expect("not invalid");

  // -- Check when invalid --

  await knob.clickItem(["value", "true"]);
  await sut.hover();
  await sut.expect("invalid");
});

test("030 handles 'Size' state part", async () => {
  const { knob, sut } = await getHelperPageObjects("size");

  // -- Check default value --

  await knob.clickItem(["value", "none"]);
  await sut.hover();
  await sut.expect("size", "normal");
  await sut.expect("size not", "small");

  // -- Check value --

  await knob.clickItem(["value", "normal"]);
  await sut.hover();
  await sut.expect("size", "normal");

  await knob.clickItem(["value", "large"]);
  await sut.hover();
  await sut.expect("size", "large");
});

test("040 handles 'Widget' state part", async t => {
  let isThrown;
  const { knob, sut } = await getHelperPageObjects("widget");

  // -- Check default value --

  await knob.clickItem(["value", "none"]);
  await sut.hover();
  await sut.expect("widget", "checkbox");

  // -- Check value --

  await knob.clickItem(["value", "radio"]);
  await sut.hover();
  await sut.expect("widget", "radio");
  await sut.expect("widget not", "button");

  // -- Check failure --

  isThrown = false;
  try {
    await sut.expect("widget", "button");
  } catch (e) {
    isThrown = true;
  }
  await t.expect(isThrown).ok();
});
