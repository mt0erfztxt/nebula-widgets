import appRootPath from 'app-root-path';
import sinon from 'sinon';
import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';

import Title from '../../../../../src/js/widgets/title';

const expect = unexpected.clone();
expect.use(unexpectedSinon);

fixture `Widgets :: Title :: 010 Spec 'text'`
  .page(appRootPath.path + '/test/js/browser/widgets/title/010-spec-text.html');

test.skip("010 It should throw error when `spec.text` is not valid", async () => {
  let isThrown = false;

  try {
    await new Title({ text: 42 });
  }
  catch (e) {
    expect(
      e.message,
      'to equal',
      "'nebula-widgets.widgets.title.constructor()': 'spec.text' argument must be a nil, a string or a regular expression but it is Number (42)"
    );
    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test.skip("020 It should obtain title fragment by 'text' spec - case of string", async (t) => {
  let isThrown = false;

  // Case of success.
  const title = new Title({ text: 'Some text' });
  await title.expectIsExist();
  await t.expect(title.selector.textContent).eql('Some text');

  // Case of failure.
  try {
    await new Title({ text: 'Other text' }).expectIsExist();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /.*'nebula-widgets.widgets.title' fragment's selector must return exactly one DOM element but it doesn't.*/
    );
    isThrown = true;
  }

  expect(isThrown, 'to be true');
});

test.skip("030 It should obtain title fragment by 'text' spec - case of regular expression", async (t) => {
  let isThrown = false;

  // Case of success.
  const title = new Title({ text: /Some t..t$/ });
  await title.expectIsExist();
  await t.expect(title.selector.textContent).eql('Some text');

  // Case of failure.
  try {
    await new Title({ text: /Other t..t$/ }).expectIsExist();
  }
  catch (e) {
    expect(
      e.errMsg,
      'to match',
      /.*'nebula-widgets.widgets.title' fragment's selector must return exactly one DOM element but it doesn't.*/
    );
    isThrown = true;
  }

  expect(isThrown, 'to be true');
});
