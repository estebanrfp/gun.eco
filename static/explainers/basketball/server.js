var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

var port = 5000;

app.use(serveStatic("./"));
app.listen(port);
console.log('Listening at port: ' + port);