# typescript-react-starter

![Readiness: Under Construction](https://img.shields.io/badge/readiness-under%20construction-orange.svg)

A starting point for building a web app, both the server and the client, with the following technologies:

*  React v16.6
*  TypeScript 3.2

**Why?** While you could use a project like [create-react-app](https://github.com/facebook/create-react-app), and even
variants that use TypeScript, I found that building my own helped me attain a deeper understanding of how the
technologies work. Also, this project differs in the fact that the server incorporates the client app rather than only
defining a standalone client app. Sometimes, I ended up making decisions different from those projects because of my own
preferences and background. When I think these decisions are meaningful, I've tried to describe them here.

## TODO

*  Figure out of `webpack-cli` + `webpack-dev-server` are still the best supported ways to get the development server up
   and running.

## Code Organization

-  `client/`: There should be no devDependencies in client/package.json
-  `src/`:
-  `types/`:
-  `views/`:
-  `build/`:
-  `.env[.sample]`:

## What's Missing?

*  Tests: I haven't chosen how I'd like to implement and run tests yet.
*  Server Side Rendering: I haven't found a need for using this in projects based on this starter, but perhaps I will.
   If adding support significantly alters and complicates the implementation here, I may choose to do that in a separate
   branch.
*  Extract TSLint config into an npm package: This would allow me to update the TSLint config from a single source and
   make it simpler to configure new projects.

## Other technologies

*  [Express](https://expressjs.com): This web server framework is ubiquitous in the Node.js server development
   community. It seems as good a choice as any for simple projects.

*  [webpack]():
   * [ts-loader]():

*  [tslint](https://palantir.github.io/tslint/): TSLint helps detect common errors and enforce a consistent style by
   statically analyzing all TypeScript code in the project. Coming from using ESLint, and specifically the
   [AirBnb JavaScript Style Guide](https://github.com/airbnb/javascript), I have a strong preference for keeping
   consistency with that style in my TypeScript. In order to accomplish this, I use the
   [tslint-config-airbnb](https://github.com/progre/tslint-config-airbnb) distributed configuration. However,
   TypeScript is a superset of JavaScript, so there's many rules available in TSLint that don't have an equivalent
   setting in that config. So I've added my own preferences on top of that base configuration in `tslint.json`. Lastly,
   the [tslint-react](https://github.com/palantir/tslint-react) configuration introduces new rules that are specific to
   JSX. I've also configured the rules in `tslint.json` to suit my prefernces.

*  [dotenv](https://github.com/motdotla/dotenv): This project allows the application to load configuration from
   environment variables that were stored on disk in the `.env` file while in development. Following on the 12-factor
   app principles, configuration values and secrets should never be stored in the source code of the application.
   Instead, for static configuration (the only type needed in this app) we inject the values using environment
   variables. In production, this should be handled by an orchestration layer (e.g. Heroku config places values in
   environment variables for us). However, in development, we need a place to place these values and the `dotenv`
   package enables these to easily be noted in the `.env` file. It should be noted that this file is ignored by git in
   the `.gitignore`. Also, the `dotenv` package is required in scripts that are intended for development using the
   `-r dotenv/config` flag to the `node` executable.

*  [nvm](https://github.com/creationix/nvm): Since this project is an **application** rather than a library, its
   important to describe the version(s) of node that are supported. The `.nvmrc` file is the canonical place to find
   that information, and developers can easily switch to the right version by running `nvm use` in a shell. It is worth
   noting that this information is duplicated in the `package.json`'s `engine` field, to support deployment into hosting
   platforms like Heroku, which use that field to select a version instead.

*  [Heroku](https://www.heroku.com/): This project is in no way coupled to deployment on Heroku, but there are several
   affordances used to make it work well. As noted above, the `engine` field in the `package.json` is meant to help
   Heroku select the appropriate version of node to run on. Also, the `cacheDirectories` field is used to speed up
   successive deployments by allowing dependencies to be cached instead of always re-downloaded. Lastly, the `Procfile`
   describes the command to start the server process.
