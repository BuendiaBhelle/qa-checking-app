const webdriver = require("selenium-webdriver");
const key = webdriver.Key;
const By = webdriver.By;
const until = webdriver.until;

async function executeTest(timestamp){

    var siteUrl = 'https://www.freddabranyon.com';
    var adminUrl = siteUrl + '/wp-admin';
    var esReportUrl = '/wp-admin/admin.php?page=es_reports';
    var username = 'pvadmin';
    var password = 'cHJxubk0*E8q^J$M1A%Hpk*P';

    let driver = await new webdriver.Builder().forBrowser("chrome").build();

    // driver = await new webdriver.Builder()
    //             .withCapabilities(webdriver.Capabilities.firefox())
    //             .build();
    try{
        await driver.get(adminUrl);
        const originalWindow = await driver.getWindowHandle();
        console.log("WP Admin is loaded");
        await driver.findElement(By.id("user_login")).sendKeys(username);
        await driver.findElement(By.id("user_pass")).sendKeys(password);
        await driver.findElement(By.id('wp-submit')).click();
        console.log("Logged in to WP Admin");
        await driver.executeScript("window.location = \'"+esReportUrl+"\'");
        console.log("ES Report");
        await driver.wait(until.elementLocated(By.className('send_now')), 10000);
        console.log("Send Now Is loaded");
        var done = false;
        while(!done){
            if(driver.findElement(By.css("span.send_now a")).isDisplayed()){
                var url = await driver.findElement(By.css("span.send_now a")).getAttribute('href');
                await driver.switchTo().newWindow('tab');
                await driver.get(url);
                console.log(url);
                await driver.close();
                await driver.switchTo().window(originalWindow);
            }
            else{
                done = true;
            }
        }
    }
    catch(error){  
        console.log(error);
    }

    await driver.quit();

    // do{
    //     driver.navigate().refresh();
    // }while(await driver.findElement(By.tagName('p')))
}   

// executeTest(); 


module.exports = { executeTest };