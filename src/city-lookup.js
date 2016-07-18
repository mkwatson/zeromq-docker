// city-lookup.js
var zmq = require('zmq'),
	pullSock = zmq.socket('pull'),
	pushSock = zmq.socket('push'),
	priceLookupAddr = process.env.PRICE_LOOKUP_PORT,
	cityZips = {
		'10022': 'NY',
		'90067': 'LA',
		'94104': 'SF',
		'20006': 'DC',
		'60606': 'CH'
	};

pullSock.connect('tcp://127.0.0.1:3000');
console.log('City lookup subscriber connected to port 3000');

console.log('Price lookup address: ' + priceLookupAddr);

pushSock.bindSync(priceLookupAddr);
console.log('City lookup publisher bound to ' + priceLookupAddr);

pullSock.on('message', function(zip) {
	console.log('City lookup recieved: ' + zip);
	city = cityZips[zip];
	console.log('City lookup sending: ' + city);
	pushSock.send(city);
});