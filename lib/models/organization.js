var forEach = require('lodash.foreach');

var Model   = require('ampersand-model');

var Rates       = require('../collections/rates.js'),
    Branches    = require('../collections/branches.js');

var Organization;

Organization = Model.extend({
    props: {
        id      : 'number',
        name    : 'string',
        link    : 'string',
        link_h  : 'string',
        img_link: 'string',
        type    : 'string',
        slug    : 'string',
        time    : 'date',
        size    : ['number', true, 0],

        commision   : 'number',
        description : 'string'
    },
    collections: {
        rates   : Rates,
        branches: Branches
    }
});

module.exports = Organization;
