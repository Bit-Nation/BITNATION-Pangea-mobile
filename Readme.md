# Bitnation Pangea Mobile Client

[![Build Status](https://semaphoreci.com/api/v1/florianlenz/bitnation-pangea-mobile/branches/master/badge.svg)](https://semaphoreci.com/florianlenz/bitnation-pangea-mobile)
[![Coverage Status](https://coveralls.io/repos/github/Bit-Nation/BITNATION-Pangea-mobile/badge.svg?branch=master)](https://coveralls.io/github/Bit-Nation/BITNATION-Pangea-mobile?branch=master)

## Development

### Git & best practice

- We use [this](http://nvie.com/posts/a-successful-git-branching-model/) workflow
- PLEASE prefix your commit's with a topic like this: `[git] blacklisted .idea`
- Write test's for your code

### Tools & Framework's
- We are using [Native Base](https://nativebase.io/) to build an UI that has the native design of Android and IOS (depending on where you use the app). If you plan to contribute make sure to checkout what they are providing to avoid unnecessary work. 

### Run the project

1. We are using yarn for the development so run `yarn` to install the dependencies
2. Run `yarn run ios` or `yarn run android` to start the emulator

### Available commands: 

Run yarn to see all command's

### Project structure

- `./src/components/common` contain's all common components like e.g. a "header" component.
- `./__tests__` contain's all the test's
