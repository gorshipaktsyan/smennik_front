var pick = require('lodash.pick');

var View = require('ampersand-view');

var template = require('../templates/bank-branch-item.hbs'),
    infoTpl  = require('../templates/bank-branch-info.hbs');

var ItemView;

ItemView = View.extend({
    template: template,
    events: {
        'click '         : 'select'
    },
    props: {
        active  : ['boolean', true, false]
    },
    derived: {
        position: {
            deps: ['model.lat', 'model.lng'],
            fn: function () {
                return pick(this.model, 'lat', 'lng');
            }
        },
        icon: {
            deps: ['active'],
            fn: function () {
                return '/assets/icons/marker-'
                    + (this.active ? 'active' : 'default')
                    + '.png';
            }
        }
    },
    bindings: {
        'active': {
            type: 'booleanClass',
            name: 'active',
            selector: '.list-group-item'
        }
    },
    render: function (options) {
        this.renderWithTemplate(this.model, this.template);

        this.marker = new google.maps.Marker({
            title       : this.name,
            position    : this.position,
            icon        : this.icon,
            map         : this.parent.map
        });

        this.info   = new google.maps.InfoWindow({
            content     : infoTpl(this.model)
        });

        this.parent.bound
            .extend(this.marker.getPosition());

        this.delegate();

        return this;
    },
    delegate: function () {
        var self   = this,
            info   = this.info,
            model  = this.model,
            marker = this.marker;

        var select = this.select.bind(this);

        marker.addListener('click', select);

        info.addListener('closeclick', this.reset.bind(this));

        this.on('change:icon', function (item, icon) {
            marker.setIcon(icon);
        });

        this.on('change:active', function (item, active) {
            if (!active)
                return info.close();

            info.open(this.parent.map, marker);
        });

        return this;
    },
    reset: function () {
        this.active = false;
        this.parent.reset();
    },
    select: function () {
        if (!this.active)
            this.parent.select(this.model);

        return this;
    }
});

module.exports = ItemView;
