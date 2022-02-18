const wordpressStart = require("./chores/wordpress_start");
const checkout = require("./chores/checkout");
const wordpressFinish = require("./chores/wordpress_finish");

async function index(username, password, email) {
    await wordpressStart.wordpressStart(username, password, email);
    await checkout.checkout(username, password, email);
    await wordpressFinish.wordpressFinish(username, password, email);
}



module.exports = { index };


