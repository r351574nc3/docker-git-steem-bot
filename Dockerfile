FROM alpine:latest

USER root

RUN apk update \
    && apk add \
        git \
        nodejs \
    && mkdir -p /opt

ADD bin /opt/bin
ADD hooks /opt/hooks

RUN chmod -R 755 /opt/bin /opt/hooks

RUN adduser -D steembot steembot 

USER steembot

VOLUME [ "/work", "/steem" ] 

WORKDIR /work

ENTRYPOINT [ "/bin/sh" ]