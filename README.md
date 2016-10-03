# Unleash your potential

An app that helps developers grow and track their progress.

[![Build Status](https://travis-ci.org/x-team/unleash.svg?branch=master)](https://travis-ci.org/x-team/unleash)
[![dependencies Status](https://david-dm.org/x-team/unleash/status.svg)](https://david-dm.org/x-team/unleash)
[![devDependency Status](https://david-dm.org/x-team/unleash/dev-status.svg)](https://david-dm.org/x-team/unleash#info=devDependencies)

## Requirements

You need to install:
- [Docker](https://www.docker.com)

(Note: if you're using OS X and install Docker Toolbox with Docker Machine webpack's livereload won't probably work - please install Docker For Mac to fully utilize webpack's livereloading)

## Setup

### Install dependencies

In order to install node & bower dependencies run the command (it might take a while but it's one-time only):

```shell
docker-compose run web npm install
```

### Config

Create a `config.local.js` in the root directory of the project and override or set any value provided by `config.js`. The minimal contents for the `config.local.js` file should be:

```js
module.exports = {
}
```

### Google Authentication and Firebase

Steps to get a Firebase Key for local development:

 1. Create a Firebase project in the [Firebase console](https://console.firebase.google.com/).
 2. Click Add Firebase to your web app.
 3. Note the initialization code snippet, which you will use in a minute.
 4. In the Firebase console, open the Auth section.
 5. On the Sign in method tab, enable the Google sign-in method and click Save.
 6. Update your `config.js` with your Firebase key.

### Running

In the Docker Quickstart Terminal go to the application folder and type:

```shell
docker-compose up
```

Wait for Docker to run the application.

Once the application is running you can access it at [localhost](http://localhost).

### Running as daemon

Optionally you can also run the application as a daemon. Just type:

```shell
docker-compose up -d
```

If you'd like to see if it's running properly just type:

```shell
docker-compose logs -ft
```

### Accessing the container

If you want to get into the container with running application just type:

```shell
docker-compose run web bash
```

### Testing

In order to run tests please type:

```shell
docker-compose run web npm run test
```

In order to run lint please type:

```shell
docker-compose run web npm run test:lint
```
