const wordpressStart = require("./chores/wordpress_start");
const webforms = require("./chores/webforms");
const wordpressFinish = require("./chores/wordpress_finish");

async function index(domain, username, password, email) {
    await wordpressStart.wordpressStart(domain, username, password, email);
    await webforms.webforms(domain);
    await wordpressFinish.wordpressFinish(domain, username, password);
}



module.exports = { index };


