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
curl https://raw.githubusercontent.com/r351574nc3/docker-git-steem-bot/master/setup.sh | sh 
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
```bash
touch new-post.md
```

Commit change
```bash
steemgit add new-post.md
steemgit commit -a -m "Title of Post"
```

> **Note** The first line of the git commit isn't just the summary. It's also the title of your post

Push commit
```bash
~/s/steemit-posts git:master ❯❯❯ steemgit push steem master
remote: 
remote: > git-steem-bot@1.0.0 post /steem/steemit-posts.git/hooks        
remote: > node index.js "steem-post-made-from-git-steem-bot." "This Post Was Created by the Docker git-steem-bot"        
remote: 
remote: { id: 'ae9e9e96b429040553ce8590417fd516f669e947',        
remote:   block_num: 19361977,        
remote:   trx_num: 26,        
remote:   expired: false,        
remote:   ref_block_num: 28839,        
remote:   ref_block_prefix: 528799349,        
remote:   expiration: '2018-01-28T03:05:18',        
remote:   operations: [ [ 'comment', [Object] ] ],        
remote:   extensions: [],        
remote:   signatures:         
remote:    [ '206b2ddeb11f7cdfe9721c51a8ac7f8ccd59397d67e529d5f71804d023fef5daba7ec8cd6c9351a270ed7a0ead2ad4ee57cae767351c2641199d0584494f11168a' ] }        
remote: /steem/steemit-posts.git        
To /steem/steemit-posts.git
   48adba9..7fe7ed7  master -> master
```

> **Note** pushing to `steem` instead of `origin` (there is no `origin`)

## Comment Options

Comment options allow users to specify the following:
* Allowing votes
* Allowing curation rewards
* Beneficiaries
* Maximum Payout
* SBD payout percentage

There are several cases for this. Two most common would be rewards refusal and beneficiary assignment. Let's look at both cases.

### Refusing Rewards

**No Voting**
```
steemgit add new-post.md
steemgit comment_options "0 SBD" 0 false false  // No rewards, no curation, no votes
steemgit commit -a -m "Title of Post"
```

**Voting, but no rewards**
```
steemgit add new-post.md
steemgit comment_options "0 SBD" 0 true false  // No rewards, no curation, yes votes
steemgit commit -a -m "Title of Post"
```


### Assigning Beneficiares

```
steemgit add new-post.md
steemgit beneficiaries gtg:2500,drakos:2500
steemgit commit -a -m "Title of Post"
```

### Options after the fact

Supposing that you already committed your post, you can still make changes before pushing.
```
steemgit add new-post.md
steemgit commit -a -m "Title of Post"
steemgit beneficiaries gtg:2500,drakos:2500
steemgit commit -a --amend
```

## Post Metadata

It's possible to add custom metadata to posts. Custom metadata has infinite use cases, so we won't go into them. This is how to do it if you need to:

```
steemgit add new-post.md
steemgit metadata metadata.json
steemgit commit -a -m "Title of Post"
```

### From stdin
```
steemgit add new-post.md
steemgit metadata <<EOF
json_metadata: {
    "tags": [ "awesome" ]
}
EOF
steemgit commit -a -m "Title of Post"
```

