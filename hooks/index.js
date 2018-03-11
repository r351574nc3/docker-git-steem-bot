const Promise = require('bluebird')
const steem = Promise.promisifyAll(require('steem'))
const fs = Promise.promisifyAll(require('fs'))
const shell = require('shelljs');


const defaults = {
    comment_options: {
        "extensions":[],
        "operations":[
            [
                "comment_options",
                {
                    "author":"",
                    "permlink":"",
                    "max_accepted_payout":"1000000.000 SBD",
                    "percent_steem_dollars": "10000",
                    "allow_votes": true,
                    "allow_curation_rewards": true,
                    "extensions":[]
                }
            ]
        ]
    },
    metadata: { tags: [], app: 'r351574nc3/docker-git-steem-bot' },
    beneficiaries: []
}

function load_post() {
    return fs.readFileAsync(0, 'utf8')
}

function load_beneficiaries(repo) {
    if (shell.exec(`git -C ${repo} notes --ref=beneficiaries list`) == '') {
        return defaults.beneficiaries
    }
    let ref = shell.exec(`git -C ${repo} notes --ref=beneficiaries list`).exec("cut -f 2 -d ' '")
    let data = shell.exec(`git -C ${repo} notes --ref=beneficiaries show ${ref}`)

    
    if (data != '') {
        let retval = [
            [
                0,
                {
                    beneficiaries: [
                    ]
                }
            ]
        ]
        JSON.parse(data).beneficiaries.split(",").forEach((kvpair) => {
            let { account, weight } = kvpair.split(":");
            retval[0][1].beneficiaries.push({ account: account, weight: weight })            
        })
        return retval
    }
    return defaults.beneficiaries
    
}

function load_metadata(repo) {
    if (shell.exec(`git -C ${repo} notes --ref=metadata list`) == '') {
        return defaults.metadata
    }
    let ref = shell.exec(`git -C ${repo} notes --ref=metadata list`).exec("cut -f 2 -d ' '")
    let data = shell.exec(`git -C ${repo} notes --ref=metadata show ${ref}`)
    if (data != '') {
        let retval = JSON.parse(data)
        retval.app = 'r351574nc3/docker-git-steem-bot'
    }
    return defaults.metadata
}

function load_comment_options(repo) {
    if (shell.exec(`git -C ${repo} notes --ref=comment_options list`) == '') {
        return defaults.comment_options
    }

    let ref = shell.exec(`git -C ${repo} notes --ref=comment_options list`).exec("cut -f 2 -d ' '")
    let retval = shell.exec(`git -C ${repo} notes --ref=comment_options show ${ref}`)
    if (retval != '') {
        return JSON.parse(retval)
    }
    return defaults.comment_options
}

function main() {
    let user = process.env.STEEM_NAME || "Not set"
    let wif = process.env.STEEM_WIF || "Not set"
    let permlink = process.argv[2]
    let title = process.argv[3]
    let repo  = process.argv[4]

    let metadata = load_metadata(repo);
    let comment_options = load_comment_options(repo);
    comment_options.operations[0][1].author = user
    comment_options.operations[0][1].permlink = permlink
    comment_options.operations[0][1].extensions = load_beneficiaries(repo);

    load_post().then((body) => {
        console.log("Permlink ", permlink)
        return steem.broadcast.commentAsync(
            wif,
            '', // Leave parent author empty
            'blog', // Main tag
            user, // Author
            permlink + '-post', // Permlink
            title, // Title
            body, // Body
            metadata
        )
    })
    .then((results) => {
        steem.broadcast.send(wif, comment_options, function(err, results) {
            if (err) {
                console.log("Unable to set comment options ", JSON.stringify(err));
                return
            }
            console.log("Results ", results)
        });
    })
        .catch((err) => {
            console.log(err)
        })
    
    console.log("Exiting")
}

return main()
