# Bitnation Pangea Mobile Client

[![Build Status](https://semaphoreci.com/api/v1/florianlenz/bitnation-pangea-mobile/branches/master/badge.svg)](https://semaphoreci.com/florianlenz/bitnation-pangea-mobile)
[![Coverage Status](https://coveralls.io/repos/github/Bit-Nation/BITNATION-Pangea-mobile/badge.svg?branch=master)](https://coveralls.io/github/Bit-Nation/BITNATION-Pangea-mobile?branch=master)

## Docs
You can find the docs [here](http://bitnation-pangea-mobile.readthedocs.io/)

## Development

### Project setup

1. Clone the repo
2. Run `npm install`
3. Copy `.env.dev.example` to `.env`
4. Set `ETH_HTTP_ENDPOINT` to your ethereum node json rpc endpoint (Mainnet: https://mainnet.infura.io/btn_dev | Ropsten: https://ropsten.infura.io/btn_dev | Rinkeby: 	https://rinkeby.infura.io/btn_dev)
5. Set `PRODUCTION` to true/false.

#### IOS specific
1. Get [cocoapods](https://cocoapods.org/)
2. Go to the `ios` folder
3. Run `pod install`
4. Go back to the project root and run `npm run ios`

#### Android specific
1. Run `npm run android`

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
- [Detox](https://github.com/wix/detox) for end-to-end testing. Checkout [docs](./docs/detox_usage.md) for more infromation.

### Project structure

- `./src/actions` contains actions contants and action creator functions.
- `./src/assets/images` contains all images. It's preferred to keep @2x and @3x files for iOS devices with different scale factor.
- `./src/components` contains all common components.
- `./src/global` contains constans like images, colors and screens.
- `./src/reducers` contains reducers and initial states.
- `./src/sagas` contains sagas (see [Redux-Saga](https://github.com/redux-saga/redux-saga)).
- `./src/screens` contains screen components.
- `./src/services` contains services.
- `./src/utils` contains functions that is useful in different parts of the app.
- `./__tests__` contains all the tests

### [Docs](./docs/main.md)