var port = Number(process.env.PORT || 8005);
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
app.set('views', __dirname + '/app/partials');
app.engine('html', require('jade').renderFile);

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.listen(port);