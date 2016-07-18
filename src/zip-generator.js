// zip-generator.js
var zmq = require('zmq'),
	sock = zmq.socket('push'),
	cityLookupAddr = CITY_LOOKUP_PORT,
	zips = [10022, 90067, 94104, 20006, 60606];

sock.bindSync(cityLookupAddr);
console.log('Publisher bound to ' + cityLookupAddr);

// setInterval(function() {
// 	var zip = zips[Math.floor(Math.random() * zips.length)];
// 	console.log('Zip generator sending: ' + zip);
// 	sock.send(zip);
// }, 3000);

var zip = zips[Math.floor(Math.random() * zips.length)];
console.log('Zip generator sending: ' + zip);
sock.send(zip);