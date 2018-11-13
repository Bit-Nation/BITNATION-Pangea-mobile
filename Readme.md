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

__Requirements__

Node 8.x - Node 10+ is [not supported by realm yet](https://github.com/realm/realm-js/issues/1857). 

Currently, MacOS is the only supported operating system for building the project. We'd love to hear if you've gotten it working on other operating systems (it's likely possible, we just haven't been able to spare the time yet). 

__Project setup__

1. Clone the repo
2. Run `npm install`
3. Copy `.env.dev.example` to `.env`
4. Set `PRODUCTION` to true/false.

__IOS specific__
1. Get [cocoapods](https://cocoapods.org/)
2. Go to the `ios` folder
3. Run `pod install`
4. Go back to the project root and run `npm run ios`

__Android specific__
1. Run `npm run android`
## Usage

__Git & best practice__

- We use [this](http://nvie.com/posts/a-successful-git-branching-model/) branching model. Make sure to read it.
- PLEASE prefix your commits with a topic like this: `[git] blacklisted .idea`
- Write tests for your code


## API
> If you would like to develop a DApp for Pangea please checkout [this part](https://bitnation-pangea-mobile.readthedocs.io/) of the documentation

## Maintainers

[@seland](https://github.com/seland)

## Contribute

PRs are accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Bitnation
