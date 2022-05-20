const app = require("./nitropack");

// insertRow,
// listTestDetails,
// mobileScore,
// desktopScore,


async function index(timestamp) {
    await app.insertRow(timestamp);

    setTimeout(async function() {
        await app.listTestDetails(timestamp);

        setTimeout(async function() {
            await app.mobileScore(timestamp);

            setTimeout(async function() {
                await app.desktopScore(timestamp);

            }, 3000); 

        }, 3000); 

    }, 3000);  
}


module.exports = { index };
