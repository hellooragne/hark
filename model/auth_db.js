var collection = require('./db.js');
sprintf = require('sprintf').sprintf;

var auth_db = {
	add: function(list, get_cb)	{
		collection['callauth'].insert(list, function(err, docs) {});
		get_cb();
	},

	search: function(req, get_cb) {
		l = req['limit'];    
		s = req['skip'];  
		delete req['limit'];
		delete req['skip'];
		if (req["_id"] != null) {
			req["_id"] = collection["bson"].ObjectID(req["_id"]);
		}
			
		//collection['callauth'].find(req).limit(l).sort({"_id":-1}).skip(s).toArray(function(err, docs) {
		collection['callauth'].find(req).limit(l).skip(s).toArray(function(err, docs) {
			get_cb(docs);
		});
	},

	del: function(req, get_cb) {
		req["_id"] = collection["bson"].ObjectID(req["_id"]);
		collection['callauth'].remove(req, function(err, result) {
			get_cb(result);
		});
	},

	update: function(id, req, get_cb) {
		id = collection["bson"].ObjectID(id);
		collection['callauth'].update({_id:id}, {$set:req}, function(err, result) {
			get_cb(result);
		});
	}
};

module.exports = auth_db;
