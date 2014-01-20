# Assignments

This is an application to manage your work / school assignments.

## Installing

run `npm install` from the root directory. [JSDOC](https://github.com/jsdoc3/jsdoc) should be installed
globally for the documentation to work.

## Running the server

Run `npm start` or `node server/server.js` from the root directory. A mongo
database must be running on the default port.

## Grunt

Running `grunt` will watch the client-side js code to update the dev/bundle.js
file and the documentation. `grunt build` will create the minified
dist/build.js. `grunt docs` will build the documentation.
