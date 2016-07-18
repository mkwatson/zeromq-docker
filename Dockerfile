FROM node

WORKDIR /tmp

# Install zeromq
RUN	wget https://github.com/zeromq/zeromq4-1/releases/download/v4.1.5/zeromq-4.1.5.tar.gz \
	&& tar -zxvf zeromq-4.1.5.tar.gz \
	&& cd zeromq-4.1.5 \
	&& ./configure \
	&& make \
	&& make install \
	&& ldconfig \
	&& cd .. \
	&& echo "deb http://httpredir.debian.org/debian/ experimental main contrib non-free" >> /etc/apt/sources.list \
	&& echo "deb-src http://httpredir.debian.org/debian/ experimental main contrib non-free" >> /etc/apt/sources.list \
	&& apt-get update \
	&& apt-get install -y libzmq3-dev

WORKDIR /usr/src/app

COPY src/ .

RUN npm install nan zmq
