const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");

let search_engine = "https://www.google.com/";

//google chrome
async function chrome(site_name) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
    } catch (error) {
        console.log(error);
    }
}

//firefox
async function firefox(site_name) {
    let driver = await new Builder().forBrowser("firefox").build();
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
    } catch (error) {
        console.log(error);
    }
}

//microsoft edge
async function edge(site_name) {
    let options = new microsoftedge.Options().setEdgeChromium(true);
    let driver = microsoftedge.Driver.createSession(options);
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { chrome, firefox, edge };