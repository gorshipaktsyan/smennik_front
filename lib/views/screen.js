var View     = require('ampersand-view'),
    Switcher = require('ampersand-view-switcher');

var MainView = require('./main.js'),
    BankView = require('./bank.js');

var Screen;


Screen = View.extend({
    props: {
        section: 'string'
    },
    events: {
        'click [data-url]' : 'navigate'
    },
    bindings: {
        'section': {
            type: 'class',
            selector: '#screen'
        }
    },
    initialize: function () {
        var wrapper = this.query('#screen');

        var views = {};

        views.main = new MainView({
            el          : this.query('#main'),
            parent      : this,
            collection  : this.model.organizations
        });

        views.bank = new BankView({
            el          : this.query('#bank'),
            parent      : this,
            collection  : this.model.organizations
        });

        this.views = views;

        this.wrapper = wrapper;

        // this.switcher = new Switcher(wrapper);
    },
    display: function (section, model) {
        var view;

        this.section = section;

        view = this.views[section];

        if (!view)
            return void 0;


        view.model = model;
        view.render();


    },
    navigate: function (e) {
        e.preventDefault();

        var el  = e.delegateTarget,
            url = el.dataset.url || el.pathname;

        this.model.navigate(url);

        return false;
    }
});

module.exports = Screen;
