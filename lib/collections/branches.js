var Collection = require('ampersand-collection');

var lodashMixin = require('ampersand-collection-lodash-mixin');

var Branch = require('../models/branch.js');

var Branches;

Branches = Collection.extend({
    model: Branch
}, lodashMixin);

module.exports = Branches;
