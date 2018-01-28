#!/bin/sh

PROVIDER=github.com
USER=$GITHUB_USER
REPO=$STEEMIT_GIT_PROJECT
TOKEN=$GITHUB_TOKEN

URL="https://$USER:$TOKEN@$PROVIDER/$USER/$REPO"
cd /steem \
    && git clone --bare $URL \
    && cp -rf /opt/hooks/* "${REPO}.git"/hooks
cd /work \
    && git clone $URL \
    && cd $REPO \
    && git config user.name $USER \
    && git config user.email $USER \
    && git remote add steem $(echo /steem/$(ls -1 /steem | head -1)) \
    && git remote rm origin 