var Collection = require('ampersand-collection');

var lodashMixin = require('ampersand-collection-lodash-mixin'),
    restMixins = require('ampersand-collection-rest-mixin');

var Organization = require('../models/organization');


var Organizations;

Organizations = Collection.extend(lodashMixin, restMixins, {
    model: Organization,
    url: '/',
    mainIndex: 'id',
    indexes: ['slug'],
    ajaxConfig: {
        headers: {
            'X-Requested-With'  : 'XMLHttpRequest'
        }
    }
});


module.exports = Organizations;
