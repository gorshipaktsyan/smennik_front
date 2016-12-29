var Router = require('ampersand-router');

var AppRouter;

AppRouter = Router.extend({
    routes: {
        '' : 'home',
    },
    home: function () {
        this.history.navigate('organizations/');
    }
});

module.exports = AppRouter;
