# pangea

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://app.bitrise.io/app/be68de279aca4575/status.svg?token=pXZD3QeHe1TRK7YbQ0OnJQ&branch=develop)](https://app.bitrise.io/app/be68de279aca4575)

> Bitnations Blockchain Jurisdiction

TODO: Fill out this long description.

## Table of Contents

- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Security
If you find a bug / vulnerability please DO NOT open an issue. Write to `security@bitnation.co` PLEASE use [this](security-bitnation.co.key.pub) PGP key to encrypt your report / email.

## Install

__Project setup__

1. Clone the repo
2. Run `npm install`
3. Copy `.env.dev.example` to `.env`
4. Set `PRODUCTION` to true/false.

__IOS specific__
1. Get [cocoapods](https://cocoapods.org/)
2. Go to the `ios` folder
3. Run `pod install`
4. Unpack `ios/Frameworks/panthalassa.framework/Versions/A/Panthalassa.tar.gz`
5. Go back to the project root and run `npm run ios`

__Android specific__
1. Run `npm run android`
## Usage

__Git & best practice__

- We use [this](http://nvie.com/posts/a-successful-git-branching-model/) branching model. Make sure to read it.
- PLEASE prefix your commits with a topic like this: `[git] blacklisted .idea`
- Write tests for your code


## API
> If you would like to develop a DApp for Pangea please checkout [this part](https://bitnation-pangea-mobile.readthedocs.io/) of the documentation

#### Testing on iOS
Make sure you have the simulator installed and you have used it before. (Eg. You've run the mobile application in ios)
Make sure you have also followed the project set up for iOS above.

We need to first install the detox Util library for iOS simulators, make sure you can run brew or something of equivalence.
`brew tap wix/brew`
`brew install applesimutils`

Then build either the debug or release build of the iOS Application.
`npm run test:e2e:ios:debug:build`
or 
`npm run test:e2e:ios:release:build`

Then run the detox tests with
`npm run test:e2e:ios:debug`
or
`npm run test:e2e:ios:release`
depending on what you built.

* Note: The tests will work without having the simulator application on your mac open, but to see them in action
make sure the simulator application is launched. (No emulators need to be on, just the application). To
open the application, open XCode, go to menu option XCode > Open Developer Tool > Simulator.

## Maintainers

[@seland](https://github.com/seland)

## Contribute

PRs are accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Bitnation
