var Collection = require('ampersand-collection');

var lodashMixin = require('ampersand-collection-lodash-mixin');

var Rate = require('../models/rate.js');

var Rates;

Rates = Collection.extend({
    model: Rate,
    idAttribute: 'code'
}, lodashMixin);

module.exports = Rates;
