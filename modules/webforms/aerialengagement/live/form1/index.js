const wordpressStart = require("./chores/wordpress_start");
const webforms = require("./chores/webforms");
const wordpressFinish = require("./chores/wordpress_finish");

async function index(domain, username, password, email, timestamp) {
    await wordpressStart.wordpressStart(domain, username, password, email, timestampl);
    await webforms.webforms(domain, timestamp);
    await wordpressFinish.wordpressFinish(domain, username, password, timestamp);
}



module.exports = { index };


