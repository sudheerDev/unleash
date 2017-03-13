/* eslint-disable */
require('babel-register')();

// For the assets
require('asset-require-hook')({
    extensions: ['png', 'jpg']
});

// Add fetch to JSDom
require('es6-promise').polyfill();
require('isomorphic-fetch');

var jsdom = require('jsdom').jsdom;

var injectTapEventPlugin = require('react-tap-event-plugin');
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var exposedProperties = ['window', 'navigator', 'document', 'fetch'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};
