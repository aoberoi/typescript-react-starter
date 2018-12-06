# typescript-react-starter

![Readiness: Under Construction](https://img.shields.io/badge/readiness-under%20construction-orange.svg)

A starting point for building a web app, both the server and the client, with the following technologies:

*  React v16.6
*  TypeScript 3.2

### Why?

While you could use a project like [create-react-app](https://github.com/facebook/create-react-app), and even
variants that use TypeScript, I found that building my own helped me gain a deeper understanding of how each of the
technologies work.

This is a server app that __contains__ a client app. Many other examples only build around producing a client app, which eventually has to be served from some other server. I found that unhelpful when trying to plug the pieces together.

I've also made some other secondary technology choices and decisions, different from the common examples I found. When
I think these decisions are meaningful, I've tried to describe them in this README.

## TODO

*  Describe webpack and the config/loaders.
*  Describe PostCSS and CSS Modules, and how they are used.

## Code Organization

```
src/            # The source for the server app goes in this directory.
  server.ts     # This file contains the everything used to get the HTTP server initialized and running.
                # Do not pass the HTTP server instance outside of this file.
  router.ts     # This contains the main web router. It is a starting point, and there can be multiple
                # routers for a complex app. Middleware would be required and mounted into the app here.
views/          # A directory which contains server rendered page templates.

client/         # A space for the client app.
  src/          # The source for the client app goes in this directory.
    main.tsx    # The main entry point for the client app.
  package.json  # A separate file to manage client-side dependencies. Keep modules here small since they
                # contribute to page weight. Also, there should be no `devDependencies` in this file,
                # since scripts are run at the top-level only.
  webpack.config.js # The build configuration for client code.

package.json    # A file to manage scripts, their dependencies, and server dependencies.
types/          # A directory to store type definitions that aren't offered by dependent packages or via
                # DefinitelyTyped. Create a file named after the package (inside a directory for scoped
                # packages) with the suffix `.d.ts`. Within that file, you declare the module and export
                # symbols from the declared module.
.env[.sample]   # A file to define environment variables for development configuration. The sample file
                # should be updated each time a new configuration variable is created with some
                # suggestion of how to populate that value.

build/          # The output directory for a build. Should be completely generated from other directories
                # and treated as disposable.
```

## Scripts

In the typical development workflow, you only need `npm run build` and `npm start`. However, if you're only focussed on
client development, you should `npx tsx` (to build the server) and then `npm run start:dev`.

### Build

```
npm run build
```

Builds both the server and client code, placing the output in the `build` directory.

```
npm run build:client
```

Builds only the client code, placing the output in the `build/client` directory.

```
npx tsc
```

Builds only the server code, placing the output in the `build` directory.

```
npm run build:clean
```

Delete the output of previous builds.

### Run

```
npm start
```

Run the server application, which also serves the client code. You need to have previously built both in order for this
to work correctly.

```
npm run start:dev
```

Run the server application, with the client code hosted by the webpack development server. Development mode allows for
rapid iteration using webpack features such as HMR. You need to have previously built the server code for this to work
correctly.


### Test

```
npm run lint
```

Lint both the server and client code.

```
npm run lint:server
```

Lint only the server code.

```
npm run lint:client
```

Lint only the client code.

```
npm test
```

Currently, this script lints both the server and client code and then exits. In the future this script will be used to
run the entire test suite.

### Other

```
npm run postinstall
```

You should never need to run this script directly. It's provided as a convenience to chain the package install for the
client code, and then execute a build. This is useful when hosting in a platform like Heroku, where these tasks should
occur before running the application.

## What's Missing?

*  Tests: I haven't chosen how I'd like to implement and run tests yet.
*  Server Side Rendering: I haven't found a need for using this in projects based on this starter, but perhaps I will.
   If adding support significantly alters and complicates the implementation here, I may choose to do that in a separate
   branch.
*  Extract TSLint config into an npm package: This would allow me to update the TSLint config from a single source and
   make it simpler to configure new projects.

## Other technologies

*  [Express](https://expressjs.com): This web server framework is ubiquitous for Node.js server development. It seems as
   good a choice as any for simple projects.

*  [webpack](): **TODO**

*  [PostCSS]() and [CSS Modules](): **TODO**

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
