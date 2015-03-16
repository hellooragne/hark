var db_url   = 'mongodb://127.0.0.1:27017/freeswitch';

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var collection = {};
collection['bson'] = require('mongodb').BSONPure;

MongoClient.connect(db_url, {wtimeout:200}, function(err, db) {
	collection['callauth']  = db.collection('callauth');
	collection['callroute']  = db.collection('callroute');
	collection['callrouteuser']  = db.collection('callrouteuser');
});


module.exports = collection;
