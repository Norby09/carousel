var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser');

var app = express();

var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log('cors');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/save', function(req, res) {

    fs.writeFile("../src/carousel-preview.json", req.body.data , function(err) {
        if(err) {
            return res.status(500).send('Could not save the file!');
        }
        res.send('File successfully saved!');
    });

});

app.listen(port, function () {
    console.log(`Api running on port ${port}`);
});

module.exports = app;


