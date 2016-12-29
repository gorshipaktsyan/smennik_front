var App = require('./app.js');

function initialize() {
    window.app = new App({
        organizations: [],
        branches: []
    });
}

window.initialize = initialize;
