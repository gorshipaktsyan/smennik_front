
var State = require('ampersand-state');

var Router = require('ampersand-router');

var Organizations = require('./collections/organizations.js');

var View = require('./views/screen.js');

var App;

App = State.extend({
    children: {
        organizations : Organizations
    },
    initialize: function () {
        this.router = new Router();

        this.view = new View({
            el: document.body,
            model: this
        });

        this.delegate();

    },
    delegate: function () {
        var view   = this.view,
            router = this.router;

        var organizations = this.organizations;

        router.route('', showOrganizetions);
        router.route('banks', showOrganizetions);

        router.route('bank/:slug', showOrganization);

        function showOrganizetions () {

            if (organizations.length)
                return show();

            organizations.fetch({ success: show });


            function show () {
                window.org = organizations;

                return view.display('main');
            }
        }

        function showOrganization (slug) {
            if (organizations.length)
                return show();

            organizations.fetch({ success: show });

            function show () {
                var organization = organizations.get(slug, 'slug');
                return view.display('bank', organization);
            }
        }


        this.router.history.start();
    },
    navigate: function (url) {
        this.router.navigate(url);
    }
});

module.exports = App;
