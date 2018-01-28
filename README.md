# docker-git-steem-bot

Steem bot docker image for using git to post to steem

## Getting Started

### Create Github Token

1. Go to the Settings Menu
1. Select `Developer settings`
![](docs/images/developer_settings.png)
1. Select `Personal access tokens`
![](docs/images/personal_access_tokens.png)
1. Create an access token with publishing rights


### Setup Environment Variables

```bash
export GITHUB_USER=<github username>
export GITHUB_TOKEN=<github token>
export STEEM_NAME=<steemit user name>
export STEEM_WIF=<steemit posting private key>
export STEEMIT_GIT_PROJECT=<github project for steemit posts>
```

### Setup Script

Curl the setup script
```bash
export GITHUB_USER=r351574nc3
export GITHUB_TOKEN=<your token>
curl -OL https://raw.githubusercontent.com/r351574nc3/docker-git-steem-bot/master/setup.sh && sh 
source $HOME/.steemgitrc
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
steemgit add new-post.md
steemgit commit -a -m "Title of Post"
```

> **Note** The first line of the git commit isn't just the summary. It's also the title of your post

Push commit
```
steemgit push steem master
```

> **Note** pushing to `steem` instead of `origin` (there is no `origin`)

