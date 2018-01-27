#!/bin/sh

rm -rf $HOME/.steemgit $HOME/.steemgitrc $3
mkdir -p $HOME/.steemgit

cat > $HOME/.steemgitrc <<EOF
GIT_USER=$1
GIT_TOKEN=$2
STEEMIT_GIT_PROJECT=$3
alias steemgit='docker run --privileged --rm -v $PWD:/work -v $HOME/.steemgit:/steem --entrypoint=git r351574nc3/git-steem-bot:latest'
alias steemgit_setup='docker run --privileged --rm -v $PWD:/work -v $HOME/.steemgit:/steem r351574nc3/git-steem-bot:latest /opt/bin/setup.sh github.com $GIT_USER $GIT_TOKEN'

export GIT_USER GIT_TOKEN STEEMIT_GIT_PROJECT
EOF

source $HOME/.steemgitrc