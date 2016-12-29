var View = require('ampersand-view');

var get         = require('lodash.get'),
    map         = require('lodash.map'),
    forEach     = require('lodash.foreach'),
    transform   = require('lodash.transform');

var Cookie = require('js-cookie');

var template = require('../templates/main-tbody.hbs');

var Calc = require('./calc.js');

var MainView;

MainView = View.extend({
    props: {
        currencies  : 'array',
        type        : ['string', true, 'cash']
    },
    events: {
        'change .currency select'   : 'changeCurrencies',
        'click .navbar button'      : 'changeType'
    },
    initialize: function () {
        this.calc = new Calc({
            el    : this.query('#calc'),
            parent: this
        });

        this.changeCurrencies();

        return this;
    },
    render: function () {
        this.query('tbody').innerHTML = template(
            compact(this.collection, this.serialize())
        );

        this.query('table').classList.remove('hidden');
        this.query('tbody>tr:nth-last-child(1)').classList.add('mx');
        this.query('tbody>tr:nth-last-child(2)').classList.add('mx');
        if (!this.calc.rendered)
            this.calc.render();

        this.delegate();
    },
    delegate: function () {
        this.on('change', this.render);
    },
    changeCurrencies: function (e) {
        var $currencies = this.queryAll('.currency select');

        this.currencies = transform($currencies, function(memo, $currency){
            var $selected = $currency.options[$currency.selectedIndex],
                $bulk     = $selected.parentElement.previousElementSibling;

            var bulk = $selected.dataset.bulk || 1;

            memo.push({
                code: $selected.value,
                bulk: bulk
            });

            $bulk.textContent = bulk;
        }, []);

        var currencies = map(this.currencies, function (currency) {
                return currency.code;
            });

        Cookie.set('currencies', currencies);
    },
    changeType: function (e) {
        var $self = e.target,
            $next = $self.nextElementSibling || $self.previousElementSibling;

        var type = $self.value;

        if (type == this.type)
            return this;

        $self.classList.add('active', 'btn-success');
        $next.classList.remove('active', 'btn-success');

        this.type = type;
    }
});

function compact (organizations, filters) {
    var data = [],
        extr = [{}, {}, {}];


    organizations.forEach(function (organization) {
        var row = organization.toJSON();


        var val = value.bind(this, organization.rates);

        row.rates = transform(filters.currencies, function (memo, currency, i) {
            var buy  = val('buy', currency),
                sell = val('sell', currency);

            opt('buy', buy, i);
            opt('sell', sell, i);

            memo.push({
                bulk    : currency.bulk || 1,
                buy     : buy,
                sell    : sell
            });
        }, []);

        data.push(row);

    });


     data.splice(18, 1);



    forEach(data, function (row) {
        forEach(row.rates, function (rate, i) {
            if (rate.buy == extr[i]['buy-max'])
                rate['buy-max'] = true;

            if (rate.sell == extr[i]['sell-min'])
                rate['sell-min'] = true;
        });
    });

    function opt (action, value, i) {
        if (!value || value == '-')
            return void 0;

        var dopt = extr[i];

        kopt(action, 'min', value);
        kopt(action, 'max', value);

        function kopt(action, side, value) {
            var key = [action, side].join('-');

            if (!dopt[key])
                dopt[key] = value;
            else
                dopt[key] = Math[side](dopt[key], value);
        }
    }

    function value (rates, action, currency) {
        var rate  = rates.get(currency.code),
            value = get(rate, action + '-' + filters.type);

        if (!value)
            return '-';

        return value * currency.bulk;
    }

    return {
        organizations   : data,
        extreme         : extr
    }
}

module.exports = MainView;
