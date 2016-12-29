var State = require('ampersand-state');

var Rate;

Rate = State.extend({
    idAttribute : 'code',
    props: {
        code: 'string',

        name: 'string',
        bulk: 'number',

        'buy-cash'      : 'number',
        'sell-cash'     : 'number',
        'buy-noncash'   : 'number',
        'sell-noncash'  : 'number'
    }
});

module.exports = Rate;
