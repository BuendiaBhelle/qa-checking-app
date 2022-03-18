const wordpressStart = require("./chores/wordpress_start");
const checkout = require("./chores/checkout");
const wordpressFinish = require("./chores/wordpress_finish");

async function index(domain, username, password, email, timestamp) {
    await wordpressStart.wordpressStart(domain, username, password, email, timestamp);
    await checkout.checkout(domain, username, password, email, timestamp);
    await wordpressFinish.wordpressFinish(domain, username, password, email, timestamp);
}



module.exports = { index };


