const Promise = require('bluebird')
const steem = Promise.promisifyAll(require('steem'))
const fs = Promise.promisifyAll(require('fs'))



function load_post() {
    return fs.readFileAsync(0, 'utf8')
}

function main() {
    let user = process.env.STEEM_NAME || "Not set"
    let wif = process.env.STEEM_WIF || "Not set"
    let permlink = process.argv[2]
    let title = process.argv[3]
/*
    load_post().then((body) => {
        var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        return steem.broadcast.commentAsync(
            wif,
            '', // Leave parent author empty
            'blog', // Main tag
            user, // Author
            permlink + '-post', // Permlink
            title, // Title
            body, // Body
            { tags: [], app: 'r351574nc3/docker-git-steem-bot' }
        )
    }).then((results) => {
        console.log(results)
    }) 
*/
}

main()