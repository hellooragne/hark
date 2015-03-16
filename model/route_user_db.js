var collection = require('./db.js');
sprintf = require('sprintf').sprintf;

var routeuser_db = {
	add: function(list, get_cb)	{
		collection['callrouteuser'].insert(list, function(err, docs) {
			get_cb(docs);
		});
	},

	search: function(req, get_cb) {
		l = req['limit'];    
		s = req['skip'];  
		delete req['limit'];
		delete req['skip'];
		if (req["_id"] != null) {
			req["_id"] = collection["bson"].ObjectID(req["_id"]);
		}
			
		//collection['callrouteuser'].find(req).limit(l).sort({"_id":-1}).skip(s).toArray(function(err, docs) {
		collection['callrouteuser'].find(req).limit(l).skip(s).toArray(function(err, docs) {
			get_cb(docs);
		});
	},

	del: function(req, get_cb) {
		if (req["_id"] != null) {
			req["_id"] = collection["bson"].ObjectID(req["_id"]);
		}
		collection['callrouteuser'].remove(req, function(err, result) {
			get_cb(result);
		});
	},

	update: function(id, req, get_cb) {
		id = collection["bson"].ObjectID(id);
		collection['callrouteuser'].update({_id:id}, {$set:req}, function(err, result) {
			get_cb(result);
		});
	}
};

module.exports = routeuser_db;
