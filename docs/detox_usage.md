We're using [Detox](https://github.com/wix/detox) for end-to-end testing.

## Installation for manual running
To run tests manually on your side you need to complete these points:
 - Follow [these](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md#prerequisites) and [these](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies) steps to install Detox on your machine.
 - Use `npm run test:e2e:debug:build` to assemble debug build using detox.
 - Use `npm run test:e2e:debug` to run the tests.


## Installation for running on CI
To run tests on CI service you need to complete these steps:
  - Checkout this [link](https://github.com/wix/detox/blob/master/docs/Guide.RunningOnCI.md) for integration details.
  - Use `npm run test:e2e:release:build` to assemble debug build using detox.
  - Use `npm run test:e2e:release` to run the tests.

