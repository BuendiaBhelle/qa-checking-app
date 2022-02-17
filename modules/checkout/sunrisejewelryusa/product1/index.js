const wordpressStart = require("./chores/wordpress_start");
const checkout = require("./chores/checkout");
const wordpressFinish = require("./chores/wordpress_finish");

async function index() {
    await wordpressStart.wordpressStart();
    await checkout.checkout();
    await wordpressFinish.wordpressFinish();
}



module.exports = { index };


