module.exports = [
    {
        id      : '1',
        name    : 'European Russian Bank',
        link    : 'http://www.erbank.cz',
        logo    : '/test.jpg',

        type    : 'bank',
        slug    : 'european-russian-bank',

        branches: [{
            id              : '1',
            name            : 'Praha',
            telephone       : '420 236 073 757',
            faxnumber       : '420 236 073 750',
            addressregion   : 'Prague',
            postalcode      : '15000',
            streetaddress   : 'Štefánikova 78/50',
            lat             : 49.930008,
            lng             : 15.369873,
            workinghours    : 'Mo.-Fr. 09:00-17:00'
        }, {
            id              : '2',
            name            : 'Karlovy Vary',
            telephone       : '420 353 350 110',
            workinghours    : 'Mo.-Fr. 09:00-17:00',
            addressregion   : 'Karlovy Vary',
            postalcode      : '36001',
            streetaddress   : 'Ondřejská 2159/10',
            lat             : 50.2250459,
            lng             : 12.882216
        }]
    }, {
        id      : '2',
        name    : 'Sberbank CZ',
        link    : 'https://www.sberbankcz.cz/',
        logo    : '/test.jpg',

        type    : 'bank',
        slug    : 'sberbank',

        branches: [{
            id              : '3',
            name            : 'Olomouc',
            email           : 'olomouc@sberbankcz.cz',
            telephone       : '420 800 133 444',
            faxnumber       : '420 585 202 755',
            workinghours    : 'Mo.-Fr. 08:30-16:30',
            addressregion   : 'Olomouc',
            postalcode      : '77200',
            streetaddress   : 'Horní náměstí 17',
            lat             : 49.593367,
            lng             : 17.251555
        }]
    }
];
