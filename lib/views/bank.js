var View = require('ampersand-view');

var BranchList = require('./bank-branch-list.js');

var template = require('../templates/bank-tbody.hbs');

var reduce = require('lodash.reduce'),
    map    = require('lodash.map');

var domify = require('domify');

var BankView;

BankView = View.extend({
    template: template,
    bindings: {
        'model.img_link': {
            type: 'attribute',
            hook: 'img_link',
            name: 'src'
        },
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.link_h': {
            type: 'text',
            hook: 'link'
        },
        'model.link': {
            type: 'attribute',
            name: 'href',
            hook: 'link'
        },
        'model.description': {
            type: 'text',
            hook: 'description'
        }

    },
    initialize: function () {
        this.branchList = new BranchList({
            el          : this.query('#branches'),
            parent      : this
        });

    },
    render: function () {
        var organization = this.model;

        this.branchList.collection = organization.branches;
        this.branchList.render();

        this.queryByHook('tbody').innerHTML = template(organization.toJSON());


    }
});

module.exports = BankView;
