// price-lookup.js
var zmq = require('zmq'),
	sock = zmq.socket('pull'),
	priceCities = {
		'NY': 2000000,
		'LA': 1750000,
		'SF': 1500000,
		'DC': 1250000,
		'CH': 1000000
	};

sock.connect('tcp://127.0.0.1:3000');
console.log('Price lookup subscriber connected to port 3000');

sock.on('message', function(city) {
	console.log('Price lookup recieved: ' + city);
	price = priceCities[city];
	console.log('Price lookup: ' + price);
});