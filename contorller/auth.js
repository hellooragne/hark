var rest = require('restler');
var urlencode = require("urlencode");
sprintf = require('sprintf').sprintf;

module.exports = function(app) {

	var auth_db = require("../model/auth_db");

	app.get('/auth/check', function (req, res) {
		username = req.query.username;
		resource = req.query.resource;

	    var data = {
			"username" : username,
			"limit": 10,
			"skip": 0
		};
		
		auth_db.search(data, function(DbRes) {
			try {
				if(DbRes.length) {
					console.log(DbRes);
					if (DbRes[0]['resource'][resource] != null) {
						console.log(DbRes[0]['resource'][resource]);
						res.send(DbRes[0]['resource'][resource]);
					} else {
						res.send('true');
					}
				} else {
					res.send('true');
				}
			}
			catch(err) {
				res.send('true');
			}
		});
	});

	app.get('/auth/update', function (req, res) {
		id   = req.query.id;

		data = req.query.data;
		console.log(typeof(data));
		console.log(data);

		try {
			data = JSON.parse(req.query.data);
			auth_db.update(id, data, function(){
				res.send('{"res":"true"}');
			});
		}
		catch(err) {
				res.send('{"res":"error"}');
		}
		
	});

	app.get('/auth/search', function (req, res) {
		var data = {
			"limit": 100,
			"skip": 0
		};
		
		auth_db.search(data, function(DbRes) {
			try {
				var Strres=JSON.stringify(DbRes);
				res.send(Strres);	 
			}
			catch(err) {
				res.send('error');
			}
		});
	});

};
