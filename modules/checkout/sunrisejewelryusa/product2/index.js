const wordpressStart = require("./chores/wordpress_start");
const checkout = require("./chores/checkout");
const wordpressFinish = require("./chores/wordpress_finish");

async function index(username, password) {
    await wordpressStart.wordpressStart(username, password);
    await checkout.checkout(username, password);
    await wordpressFinish.wordpressFinish(username, password);
}



module.exports = { index };


