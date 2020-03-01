FROM mhart/alpine-node:latest

RUN apk add --no-cache --virtual .build-deps \
    git \
    bash \
    curl \
    ca-certificates \
    && update-ca-certificates

RUN mkdir -p /webjet/cinemaworld
ADD . /webjet/cinemaworld/
WORKDIR /webjet/cinemaworld/

RUN npm install

ENTRYPOINT ["tail", "-f", "/dev/null"]
