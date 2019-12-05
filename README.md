# Project Catalyst Client

Project Catalyst is a microservices framework which allows you to create and deploy secured base application development tools within 10 minutes.

This repo is for the client which can be used to build ontop of the catalyst backend. It runs ontop the expo configuration system.

1.0 Goals:
 - [ ] User Signup and Login
 - [x] Persistance
 - [ ] Metrics Services
 - [x]  GraphQL Client Support
 - [ ] Mobx State
 - [ ] i18n

## Initial setup

Run `npm i` first to setup any global dev tools which are used. These are defined in the `package.json` which is at the root of the project.

## Global NPM Scripts

### Project Specific:

- `npm run hygen service new`: Create new service

- You might need run this when performing http callbacks and broken CORS calls `open -n -a /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --args --user-data-dir=/tmp/chrome_dev_test --disable-web-security`

## Links to main libraries to understand

-- `Code Generator`: [Hygen](https://www.hygen.io/)

-- `Typescript React-Navigation`: [TS React Navigation Templates](https://dev.to/andreasbergqvist/react-navigation-with-typescript-29ka)