var View = require('ampersand-view');

var forEach = require('lodash.foreach');

var Calc;

Calc = View.extend({
    events: {
        'change .root select': 'changeAttrs',

        'keyup  [data-hook="input-value"]'  : 'changeValDir',
        'change [data-hook="input-value"]'  : 'changeValDir',

        'change [data-hook="output-rate"]'  : 'changeValDir',

        'keyup  [data-hook="output-value"]' : 'changeValRev',
        'change [data-hook="output-value"]' : 'changeValRev',

        'change [data-hook="input-rate"]'   : 'changeValRev'
    },
    props: {
        organization: 'number',
        type: 'string',
        inputRate: ['string', false, 'usd'],
        outputRate: ['string', false, 'eur']
    },
    initialize: function () {
        this.changeAttrs();

        this.delegate();
    },
    delegate: function () {
        this.on('change:organization', this.render);
        this.on('change:type', this.render);
    },
    render: function () {
        var organization = this.parent.collection.get(this.organization);

        var htmlBuy  = '',
            htmlSell = '';

        var type = this.type;

        var inputRate  = this.inputRate,
            outputRate = this.outputRate;

        organization.rates.forEach(function (rate) {
            if (rate['buy-' + type] == '-')
                return this;

            console.log(rate.code == inputRate ? ' selected ' : '', rate.code, inputRate)

            htmlBuy +=
                '<option '
                    + 'value="' + rate['buy-' + type] + '" '
                    + (rate.code == inputRate ? 'selected' : '')
                    + '>'
                + rate.code
                + '</option>';

            htmlSell +=
                '<option '
                    + 'value="' + rate['sell-' + type] + '" '
                    + (rate.code == outputRate ? 'selected' : '')
                    + '>'
                + rate.code
                + '</option>';
        });

        this.queryByHook('input-rate').innerHTML  = htmlBuy;
        this.queryByHook('output-rate').innerHTML = htmlSell;

        this.changeValDir();
    },
    changeAttrs: function () {
        this.organization = this.queryByHook('organization').value * 1;
        this.type         = this.queryByHook('type').value;
    },
    changeValDir: function () {
        var value = this.queryByHook('input-value').value * 1,
            ratio = this.queryByHook('input-rate').value / this.queryByHook('output-rate').value;

        this.queryByHook('output-value').value = isNaN(value)
            ? '-'
            : (value * ratio).toFixed(2);
    },
    changeValRev: function () {
        var value = this.queryByHook('output-value').value * 1,
            ratio = this.queryByHook('output-rate').value / this.queryByHook('input-rate').value;

        this.queryByHook('input-value').value = isNaN(value)
            ? '-'
            : (value * ratio).toFixed(2);
    }
});

module.exports = Calc;
