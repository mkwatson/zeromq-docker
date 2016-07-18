#!/bin/sh

# start price lookup
docker run \
	--expose 3000/tcp \
	--name price_lookup \
	-a STDOUT \
	-a STDERR \
	zeromq node price-lookup.js &

# start city lookup
docker run \
	--expose 3000/tcp \
	--name city_lookup \
	--link price_lookup:price_lookup \
	-a STDOUT \
	-a STDERR \
	zeromq node city-lookup.js &

# start zip generator
docker run \
	--name zip_generator \
	--link city_lookup:city_lookup
	-a STDOUT \
	-a STDERR \
	-d \
	zeromq node zip-generator.js