
## Table of Contents

- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
  - [npm install](#npm-install)
  - [Enable flow type checking](enable-flow-type-checking)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run flow](#npm-run-flow)
- [create-react-app](#create-react-app)

## Folder Structure

```
sitegraph/
  README.md
  node_modules/
  package.json
  public/ -- static content
  src/    -- sources
  types/  -- types for @flow checking
```

## Prerequisites

- node.js 4+
- npm

### `npm install`

Please note, distribution includes 'canvas-node' module suitable for running jsdom tests (sigma.js functionality). This package requires some global libraries dependencies to compile, please refer to [canvas installation](https://github.com/Automattic/node-canvas#installation) page for setup instructions.

### Enable flow type checking

Application is built with flow type checking embedded. But it requires flow-typed installed globally:

```
npm install -g flow-typed
flow-typed
```

### Tests require canvas


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run flow`

Performs flow type check, highly recommended before starting build.
Please note, all application custom types are stored in Component files (props and state descriptions) as well as under /types/ subdir.


## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

