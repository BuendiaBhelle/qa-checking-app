const app = require("./nitropack");

// insertRow,
// listTestDetails,
// mobile_and_desktopScore,


async function index(timestamp) {
    await app.insertRow(timestamp);

    setTimeout(async function() {
        await app.listTestDetails(timestamp);

        setTimeout(async function() {
            await app.mobile_and_desktopScore(timestamp);

        }, 3000); 

    }, 3000);  
}


module.exports = { index };
