var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'annas00n'
});

c.query('SHOW DATABASES', function(err, rows) {
  if (err)
    throw err;
  console.dir(rows);
});

c.end();
