#!/bin/sh

rm -rf $HOME/.steemgit $HOME/.steemgitrc $3
mkdir -p $HOME/.steemgit

cat > $HOME/.steemgitrc <<EOF
GITHUB_USER=$GITHUB_USER
GITHUB_TOKEN=$GITHUB_TOKEN
STEEM_NAME=$STEEM_NAME
STEEM_WIF=$STEEM_WIF
STEEMIT_GIT_PROJECT=$STEEMIT_GIT_PROJECT
alias steemgit='docker run --privileged --rm -e STEEM_NAME=$STEEM_NAME -e STEEMIT_GIT_PROJECT=$STEEM_GIT_PROJECT -e STEEM_WIF=$STEEM_WIF -e GITHUB_USER=$GITHUB_USER -e GITHUB_TOKEN=$GITHUB_TOKEN -v $PWD:/work -v $HOME/.steemgit:/steem --entrypoint=/opt/bin/steemgit r351574nc3/git-steem-bot:latest'
alias steemgit_setup='docker run --privileged --rm -e STEEM_NAME=$STEEM_NAME -e STEEMIT_GIT_PROJECT=$STEEM_GIT_PROJECT -e STEEM_WIF=$STEEM_WIF -e GITHUB_USER=$GITHUB_USER -e GITHUB_TOKEN=$GITHUB_TOKEN -v $PWD:/work -v $HOME/.steemgit:/steem r351574nc3/git-steem-bot:latest /opt/bin/setup.sh'

export GITHUB_USER GITHUB_TOKEN STEEM_NAME STEEM_WIF STEEMIT_GIT_PROJECT
EOF

source $HOME/.steemgitrc