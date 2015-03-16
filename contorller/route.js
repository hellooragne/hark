var rest = require('restler');
var urlencode = require("urlencode");
sprintf = require('sprintf').sprintf;

module.exports = function(app) {

	var route_db = require("../model/route_db");
	var route_user_db = require("../model/route_user_db");

	app.get('/route/get', function (req, res) {

		username = req.query.username;
		resource = req.query.resource;

		console.log('/route/add' + username);

		var UserData = {
			"UserName" : username,
			"limit": 10,
			"skip": 0
		};

		route_user_db.search(UserData, function(DbRes) {
			try {
				if(DbRes.length) {
					console.log(DbRes);
					if (DbRes[0]['RouteCode'] != null) {
						console.log(DbRes[0]['RouteCode']);
						res.send(DbRes[0]['RouteCode']);
						return;
					} 
				} 
				else {
					var data = {
						"limit": 10,
						"skip": 0
					};

					route_db.search(data, function(DbRes) {
						try {
							if(DbRes.length) {
								console.log(DbRes);

								var num = Math.floor(Math.random() * (DbRes.length));

								if (DbRes[num]['RouteCode'] != null) {
									console.log(DbRes[num]['RouteCode']);
									res.send(DbRes[num]['RouteCode']);
									return;
								} else {
									res.send('false');
									return;
								}
							} else {
								res.send('false');
								return;
							}
						}
						catch(err) {
							console.log(err);
							res.send('false');
							return;
						}
					});
				}
			}
			catch(err) {
				console.log(err);
			}
		});
	});

	app.get('/route/add', function (req, res) {
		console.log('/route/add' + req.query.data);
		data = JSON.parse(req.query.data);
		
		route_db.add(data, function(add_res) {
			var Strres=JSON.stringify(add_res);
			res.send(Strres);
			
		});
	});

	app.get('/route/search', function (req, res) {
		var data = {
			"limit": 100,
			"skip": 0
		};
		
		route_db.search(data, function(DbRes) {
			try {
				var Strres=JSON.stringify(DbRes);
				res.send(Strres);	 
			}
			catch(err) {
				res.send('error');
			}
		});
	});

	app.get('/route/del', function (req, res) {
		console.log('/route/del' + req.query.data);
		data = JSON.parse(req.query.data);
		
		route_db.del(data, function(add_res) {
			var Strres=JSON.stringify(add_res);
			res.send(Strres);
			
		});
	});




	app.get('/routeuser/add', function (req, res) {
		console.log('/routeuser/add' + req.query.data);
		data = JSON.parse(req.query.data);
		
		route_user_db.add(data, function(add_res) {
			var Strres=JSON.stringify(add_res);
			res.send(Strres);
			
		});
	});

	app.get('/routeuser/search', function (req, res) {
		var data = {
			"limit": 100,
			"skip": 0
		};
		
		route_user_db.search(data, function(DbRes) {
			try {
				var Strres=JSON.stringify(DbRes);
				res.send(Strres);	 
			}
			catch(err) {
				res.send('error');
			}
		});
	});

	app.get('/routeuser/del', function (req, res) {
		console.log('/routeuser/del' + req.query.data);
		data = JSON.parse(req.query.data);
		
		route_user_db.del(data, function(add_res) {
			var Strres=JSON.stringify(add_res);
			res.send(Strres);
			
		});
	});
};
