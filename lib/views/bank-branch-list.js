var Coll = require('ampersand-collection');

var View = require('ampersand-view');

var pick = require('lodash.pick');

var BranchView = require('./bank-branch-item.js');

var template = require('../templates/bank-branch-list.hbs');

var ListView;

ListView = View.extend({
    template: template,
    events: {
        'change [data-hook=select_reg]' : 'select_reg'
    },
    props: {
        active: 'any'
    },
    session: {
        zoom : ['number', true, 8],
        lat  : ['number', true, 50],
        lng  : ['number', true, 15.5]
    },
    derived: {
        center  : {
            deps: ['lat', 'lng'],
            fn  : function () {
                if (this.bound)
                    return this.bound.getCenter();

                return pick(this, ['lat', 'lng']);
            }
        },
        settings: {
            deps: ['zoom', 'center'],
            fn  : function () {
                return  {
                    zoom    : this.zoom,
                    center  : this.center
                }
            }
        }
    },
    initialize: function () {
        this.map    = new google.maps.Map(this.query('.map'), this.settings);

        return this;
    },
    render: function() {
        var branches = this.collection;

        if (!branches || !branches.length)
            return this;

        this.innerHTML = '';

        var $list = this.queryByHook('list');


        this.bound  = new google.maps.LatLngBounds();

        $list.innerHTML = '';

        var listData = this.regionValue ? new Coll( this.collection.filter("addressregion", this.regionValue) ) : this.collection;

        //this.collection.models.slice(1,2);
        this.list = this.renderCollection(listData, BranchView, $list);

        setTimeout(this.reset.bind(this, true), 80);

        this.delegate();
    },
    delegate: function () {

        return this;
    },
    reset: function (resize) {
        var map = this.map,
            zoom = this.zoom,
            ev;

        if (resize)
            google.maps.event.trigger(map, 'resize');

        /*ev = google.maps.event.addListener(map, 'idle', function() {
            console.log(map.getZoom(), zoom);
            if (map.getZoom() > zoom)


            map.setCenter()
                google.maps.event.removeListener(ev);
        });*/

        map.fitBounds(this.bound);
        map.setZoom(zoom);
    },
    select: function (branch) {
        var prev = this.itemByModel(this.active),
            next = this.itemByModel(branch);

        if (prev == branch)
            return this;

        if (prev)
            prev.active = false;

        if (next)
            next.active = true;

        this.active = branch;

        return this;
    },
    //
    itemByModel: function (model) {
        if (!model)
            return void 0;

        return this.list
            ._getViewByModel(model);
    },

    select_reg: function (e) {
        var regionsList = {
            'All' : 'all',
            'Prague' : 'a',
            'Central Bohemia' : 's',
            'South Bohemia' : 'c',
            'Plzeň' : 'p',
            'Karlovy Vary' :'k',
            'Ústí nad Labem' : 'u',
            'Liberec' : 'l',
            'Hradec Králové' : 'h',
            'Pardubice' : 'e',
            'Olomounc' : 'm',
            'Moravia-Silesia' : 't',
            'South Moravia' : 'b',
            'Zlin' : 'z',
            'Vysočina' : 'j'
        };

        this.regionValue = regionsList[e.target.value];
        if (e.target.value == 'All') {
            this.regionValue = undefined;
        }

        this.render();

    }


});


module.exports = ListView;
