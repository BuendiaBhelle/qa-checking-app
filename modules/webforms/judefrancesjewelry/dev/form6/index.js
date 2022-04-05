const wordpressStart = require("./chores/wordpress_start");
const webforms = require("./chores/webforms");
const wordpressFinish = require("./chores/wordpress_finish");

async function index(domain, checkbox, username, password, email, timestamp) {
    // await wordpressStart.wordpressStart(domain, checkbox, username, password, email, timestamp);
    // await webforms.webforms(domain, timestamp);
    await wordpressFinish.wordpressFinish(domain, checkbox, username, password, timestamp);
}



module.exports = { index };


