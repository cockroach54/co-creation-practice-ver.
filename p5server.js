var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./'));
app.get('/', function(req, res){
    res.send('./index.html');
});

app.listen(7000);
console.log('listening.......');