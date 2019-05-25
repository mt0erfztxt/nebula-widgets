# nebula-widgets

(WIP) A set of widgets to build web UIs and automated tests for them.

Built on top of:
- [Reagent](https://github.com/reagent-project/reagent) for rendering
- [TestCafe](https://devexpress.github.io/testcafe/) for testing

## Tests

To see tests in action first run in terminal
```sh
npm install && npx grunt kitchenSink:prod:build+run
```

wait for server to start listening, and in different terminal run
```sh
npm test
```

Currently tests were checked only in Google Chrome but if you want to try them in
other browser (command below is for Firefox) run
```sh
npx testcafe firefox test/js/browser
```

## License

Copyright © 2017-2019 Sergey Kozhevnikov <mt0erfztxt@gmail.com>.

Licensed under the Apache License, Version 2.0. See the `LICENSE` file for more details.
