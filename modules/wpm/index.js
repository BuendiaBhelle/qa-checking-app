const app = require("./wpm");

// insertRow
// listSitesWithIssues


async function index(timestamp) {
    await app.insertRow(timestamp);

    setTimeout(async function() {
        await app.listSitesWithIssues(timestamp);
    }, 4000);  
}


module.exports = { index };
