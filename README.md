# docker-git-steem-bot

Steem bot docker image for using git to post to steem

## Getting Started

Curl the setup script
```
export GITHUB_USER=r351574nc3
export GITHUB_TOKEN=<your token>
curl -OL https://raw.githubusercontent.com/r351574nc3/docker-git-steem-bot/master/setup.sh && sh setup.sh $GITHUB_USER $GITHUB_TOKEN steemit-posts && source $HOME/.steemgitrc
```

New Aliases will be added:
```
steemgit='docker run --privileged --rm -v /Users/leoprzybylski/src/github.com/r351574nc3/docker-git-steem-bot:/work -v /Users/leoprzybylski/.steemgit:/steem --entrypoint=git r351574nc3/git-steem-bot:latest'
steemgit_setup='docker run --privileged --rm -v /Users/leoprzybylski/src/github.com/r351574nc3/docker-git-steem-bot:/work -v /Users/leoprzybylski/.steemgit:/steem r351574nc3/git-steem-bot:latest /opt/bin/setup.sh github.com r351574nc3 <your token>'
```

Run `steemgit_setup`

```
~/s/g/r/docker-git-steem-bot git:master ❯❯❯     steemgit_setup steemit-posts                                                                              ⏎ ◼
https://r351574nc3:$GITHUB_TOKEN@github.com/r351574nc3/steemit-posts
Cloning into bare repository 'steemit-posts.git'...
Cloning into 'steemit-posts'...
```

## Posting

Create a new file
```
touch new-post.md
```

Commit change
```
steemgit commit -a -S -m "Committing change"
```

Push commit
```
steemgit push steem master
```

> **Note** pushing to `steem` instead of `origin` (there is no `origin`)

