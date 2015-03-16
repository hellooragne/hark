var collection = require('./db.js');
sprintf = require('sprintf').sprintf;

var route_db = {
	add: function(list, get_cb)	{
		collection['callroute'].insert(list, function(err, docs) {
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
			
		//collection['callroute'].find(req).limit(l).sort({"_id":-1}).skip(s).toArray(function(err, docs) {
		collection['callroute'].find(req).limit(l).skip(s).toArray(function(err, docs) {
			get_cb(docs);
		});
	},

	del: function(req, get_cb) {
		if (req["_id"] != null) {
			req["_id"] = collection["bson"].ObjectID(req["_id"]);
		}
		collection['callroute'].remove(req, function(err, result) {
			get_cb(result);
		});
	},

	update: function(id, req, get_cb) {
		id = collection["bson"].ObjectID(id);
		collection['callroute'].update({_id:id}, {$set:req}, function(err, result) {
			get_cb(result);
		});
	}
};

module.exports = route_db;
