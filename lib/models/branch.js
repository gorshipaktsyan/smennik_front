var Model = require('ampersand-model');

var Branch;

Branch = Model.extend({
    props: {
        id              : 'number',
        name            : 'string',
        email           : 'string',
        telephone       : 'string',
        faxnumber       : 'string',
        workinghours    : 'string',
        addressregion   : 'string',
        postalcode      : 'string',
        streetaddress   : 'string',
        lat             : ['number', true, 50],
        lng             : ['number', true, 14.5]
    }
});

module.exports = Branch;
