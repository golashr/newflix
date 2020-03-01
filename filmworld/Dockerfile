FROM mhart/alpine-node:latest

RUN apk add --no-cache --virtual .build-deps \
    git \
    bash \
    curl \
    ca-certificates \
    && update-ca-certificates

RUN mkdir -p /webjet/filmworld
ADD . /webjet/filmworld/
WORKDIR /webjet/filmworld/

RUN npm install

ENTRYPOINT ["tail", "-f", "/dev/null"]
