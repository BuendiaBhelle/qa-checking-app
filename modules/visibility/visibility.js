const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");

let search_engine = "https://www.google.com/";

//google chrome
async function chrome(site_name) {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(search_engine);
    await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);

}

//firefox
async function firefox(site_name) {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get(search_engine);
    await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
}

//microsoft edge
async function edge(site_name) {
    let options = new microsoftedge.Options().setEdgeChromium(true);
    let driver = microsoftedge.Driver.createSession(options);
    await driver.get(search_engine);
    await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
}

module.exports = { chrome, firefox, edge };