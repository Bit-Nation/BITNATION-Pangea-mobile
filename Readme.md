# Bitnation Pangea Mobile Client

[![Build Status](https://semaphoreci.com/api/v1/florianlenz/bitnation-pangea-mobile/branches/master/badge.svg)](https://semaphoreci.com/florianlenz/bitnation-pangea-mobile)
[![Coverage Status](https://coveralls.io/repos/github/Bit-Nation/BITNATION-Pangea-mobile/badge.svg?branch=master)](https://coveralls.io/github/Bit-Nation/BITNATION-Pangea-mobile?branch=master)

## Development

### Project setup

1. Clone the repo
2. Run `npm install`
3. copy `.env.dev.example` to `.env`
4. Run cd ios
5. Run pod install
6. Run `npm run android` or `npm run ios`

### Git & best practice

- We use [this](http://nvie.com/posts/a-successful-git-branching-model/) branching model. Make sure to read it.
- PLEASE prefix your commit's with a topic like this: `[git] blacklisted .idea`
- Write test's for your code

### Workflow
1. A github issue is created and tagged with "Needs Review". Needs Review mean that the issue need's to be reviewed by a teammeber. E.g. If it's about design by David. If it's about backend by Florian and so on. 
2. After the issue is reviewed and ready to get solved remove the "Need's review" label and add the "Reviewed" label. That show's an dev's that the issue is ready to get solved. 
3. When you decide to work on an specific reviewed issue assign it your self and start working on it.
4. After you worked on the issue and it's done create a pull request and place a reference to the issue in the pull request body. Make sure that the CI is passing and select someone who reviews the pull request. 
5. After you created the pull request you are almost done. The reviewer will ping you if there is a problem with the pull request.  

### Tools & Framework's
We are using:
- [Redux](https://github.com/reactjs/react-redux) for state management.
- [Redux-Saga](https://github.com/redux-saga/redux-saga) for handling asynchronous state changes.
- [React Native Navigation](https://github.com/wix/react-native-navigation) for truly native navigation.
- [Lodash](https://lodash.com) for great preset of utility functions on data structures.
- [Jest](https://facebook.github.io/jest/) for testing.

### Project structure

- `./src/components/common` contain's all common components like e.g. a "header" component.
- `./__tests__` contain's all the test's

### [Docs](./docs/main.md)