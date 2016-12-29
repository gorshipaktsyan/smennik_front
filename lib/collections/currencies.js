var Collection = require('ampersand-collection');

var lodashMixin = require('ampersand-collection-lodash-mixin'),
    restMixins = require('ampersand-collection-rest-mixin');

var Currency = require('../models/currency.js');

var Currencies;

Currencies = Collection.extend({
    model: Currencies,
    url: '/currencies/'
}, lodashMixin, restMixins);


module.exports = Currencies;
