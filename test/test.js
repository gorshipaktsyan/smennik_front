var Organizations = require('../lib/collections/organizations.js');

var orgsData = require('./data.js');

var orgs = new Organizations(orgsData);

console.log(orgs.at(0).branches.at(0).url());
