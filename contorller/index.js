module.exports = function(app) {
	require('./auth.js')(app);
	require('./route.js')(app);
};
