var Q = require('q');
var Promise = require('bluebird');
var GithubApi = require('github');
var path = require("path");

var github = new GithubApi({
    version: '3.0.0'
});

var express = require('express');
var util = require('util');
var app = express();
var http = require('http');
var exphbs = require('express3-handlebars');
var service = require('drupalRESTws_service');
var routeCache = require('route-cache');
var request = require('hyperquest');
var wait = require('event-stream').wait;

var cacheLong = 600;

app.use('/public', express.static(path.join(__dirname, "/public")));

// sets the templating engine to handlebars
app.engine('handlebars',
    exphbs({defaultLayout: 'main'}));

// sets the view engine is also handlebars
app.set('view engine', 'handlebars');

app.get('/api', routeCache.cacheSeconds(cacheLong), function(req, res) {
    service.model()
        .then(function(data) {
            res.json(data);
        })
});

var port = Number(process.env.PORT || 5000);
app.listen(port);
console.log("listening on port 5000");