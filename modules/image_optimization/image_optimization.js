const {Builder, By, Key} = require("selenium-webdriver");
const config = require("../image_optimization/config");

const { dirname } = require("path");
const { spawn } = require("child_process");
const { driver, By2, windowsAppDriverCapabilities } = require("selenium-appium");

const webpagetest_url = config.webpagetest_url;
const optimization_tab = config.optimization_tab;
const program = config.program;
const appExe = config.appExe;

async function imageOptimization(url) {
    let driver_web = await new Builder().forBrowser("chrome").build();
    try {
        await driver_web.get(webpagetest_url);
        await driver_web.findElement(By.name("url")).sendKeys(url, Key.RETURN);
    
        await driver_web.sleep(40000);
    
        const current_url = await driver_web.getCurrentUrl();
    
        console.log("Current URL: " + current_url);
    
        const webpagetest_result_url = current_url + optimization_tab;
    
        await driver_web.switchTo().newWindow('tab');
        await driver_web.get(webpagetest_result_url);
    
        console.log("Webpagetest Result URL: " + webpagetest_result_url);
        
        // open notepad
        try {
            spawn(program, [], { cwd: dirname(program) });

            await driver.startWithCapabilities(windowsAppDriverCapabilities(appExe));
    
            const element = By2.nativeXpath('//*[@ClassName="Edit"]');
            await element.click();
            await element.sendKeys(webpagetest_result_url);
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { imageOptimization };