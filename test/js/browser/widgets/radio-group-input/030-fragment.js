import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import ManPageExample from '../../../../../src/js/kitchen-sink/widgets/man-page/example';
import RadioGroupInput from '../../../../../src/js/widgets/radio-group-input';
import RadioGroupInputCheckedItem from '../../../../../src/js/widgets/radio-group-input/checked-item';
import RadioGroupInputItem from '../../../../../src/js/widgets/radio-group-input/item';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

/**
 * Returns radio group input fragment with 'cid' equal specified one. By
 * default scope for search is whole page, but it can be narrowed down by
 * providing 'cid' of man page's example.
 * 
 * @param {String} cid Radio group input's 'cid'
 * @param {String} [exampleCid] 'cid' of man page's example to which radio group input belongs
 * @returns {RadioGroupInput}
 */
function getRadioGroupInput(cid, exampleCid) {
  let example;

  if (exampleCid) {
    example = new ManPageExample({ cid: exampleCid });
  }

  return new RadioGroupInput({ cid, parent: example });
}

fixture `Widgets :: Radio Group Input :: 010 All`
  .page('http://localhost:3449/widgets/radio-group-input');

test("010 It should allow obtain radio group input", async () => {
  const example010 = new ManPageExample({ cid: '010' });
  await example010.expectIsExist();

  const radioGroupInput = new RadioGroupInput({ cid: '010', parent: example010 });
  await radioGroupInput.expectIsExist();
});

test("280 It should allow click on item using `#clickItem()", async () => {
  const parent = new ManPageExample({ cid: '010' });
  await parent.expectIsExist();

  const rgi = new RadioGroupInput({ cid: '010', parent });
  await rgi.expectIsExist();

  const option1 = rgi.getItem({ label: 'Option 1' });
  await option1.expectIsExist();
  await option1.expectIsNotChecked();

  const rgiItem = await rgi.clickItem({ label: 'Option 1' });
  await option1.expectIsChecked();
  await rgiItem.expectIsEqual(option1);
});
