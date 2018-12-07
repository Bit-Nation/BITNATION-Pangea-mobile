# pangea

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://app.bitrise.io/app/be68de279aca4575/status.svg?token=pXZD3QeHe1TRK7YbQ0OnJQ&branch=develop)](https://app.bitrise.io/app/be68de279aca4575)

> Bitnation's Blockchain Jurisdiction


## Table of Contents

- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Project Boards](#project-boards)
- [Contribute](#contribute)
- [License](#license)

## Security
If you find a bug / vulnerability please DO NOT open an issue. Write to `security@bitnation.co` PLEASE use [this](security-bitnation.co.key.pub) PGP key to encrypt your report / email.

## Install

__Requirements__

* Node 8.x - Node 10+ is [not supported by realm yet](https://github.com/realm/realm-js/issues/1857). 

* Android Studio 3.1+ (If NDK is not installed, this version requirement may be more relaxed).

* [Panthalassa](https://github.com/Bit-Nation/panthalassa) binary, also covered below in instructions.

Supported Operating Systems: MacOS, Linux (Android only).  
Windows is unsupported, but may work. Please open a well-documented issue anyway if you have problems building under Windows.

__Project setup__

1. Clone the repo
2. Run `npm install`
3. Copy `.env.dev.example` to `.env`
4. Set `PRODUCTION` to true/false.

__IOS specific__
1. Get [cocoapods](https://cocoapods.org/)
2. Go to the `ios` folder
3. Run `pod install`
4. Place a compiled version of https://github.com/Bit-Nation/panthalassa into ios/Frameworks/panthalassa.framework
5. Go back to the project root and run `npm run ios`

__Android specific__
1. Place a compiled version of https://github.com/Bit-Nation/panthalassa into android/panthalassa/panthalassa.aar
2. Run `npm run android`
## Usage

__Git & best practice__

- We use [this](http://nvie.com/posts/a-successful-git-branching-model/) branching model. Make sure to read it.
- PLEASE prefix your commits with a topic like this: `[git] blacklisted .idea`
- Write tests for your code


## API
> If you would like to develop a DApp for Pangea please checkout [this part](https://bitnation-pangea-mobile.readthedocs.io/) of the documentation

## Maintainers

[Susanne Tarkowski Tempelhof](https://github.com/xsttx)  
[Mark Nuzz](https://github.com/mnuzz)


## Project Boards

We use PivotalTracker for project management. As of 12/7/2018, our primary board is open to the public.  
App - https://www.pivotaltracker.com/projects/2204148  
Architecture - https://www.pivotaltracker.com/projects/2213396  

## Contribute

PRs are accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Bitnation
