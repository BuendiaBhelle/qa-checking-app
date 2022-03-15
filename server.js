require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('file-system');
const logger = require("./middleware/logger.js");
const sheet = require('./middleware/gsheet.js');

const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const checkout_sunrisejewelryusa_dev_p1 = require("./modules/checkout/sunrisejewelryusa/dev/product1/index");
const checkout_sunrisejewelryusa_dev_p2 = require("./modules/checkout/sunrisejewelryusa/dev/product2/index");
const image_optimization = require("./modules/image_optimization/image_optimization");
const visibility = require("./modules/visibility/visibility");
const webforms_accidentchiropracticaz_dev_f1 = require("./modules/webforms/accidentchiropracticaz/dev/form1/index");
const webforms_accidentchiropracticaz_dev_f2 = require("./modules/webforms/accidentchiropracticaz/dev/form2/index");
const webforms_accidentchiropracticaz_live_f1 = require("./modules/webforms/accidentchiropracticaz/live/form1/index");
const webforms_accidentchiropracticaz_live_f2 = require("./modules/webforms/accidentchiropracticaz/live/form2/index");
const webforms_advancedimagemedspa_dev_f1 = require("./modules/webforms/advancedimagemedspa/dev/form1/index");
const webforms_advancedimagemedspa_dev_f2 = require("./modules/webforms/advancedimagemedspa/dev/form2/index");
const webforms_advancedimagemedspa_dev_f3 = require("./modules/webforms/advancedimagemedspa/dev/form3/index");
const webforms_advancedimagemedspa_live_f1 = require("./modules/webforms/advancedimagemedspa/live/form1/index");
const webforms_advancedimagemedspa_live_f2 = require("./modules/webforms/advancedimagemedspa/live/form2/index");
const webforms_advancedimagemedspa_live_f3 = require("./modules/webforms/advancedimagemedspa/live/form3/index");
const webforms_aerialengagement_dev_f1 = require("./modules/webforms/aerialengagement/dev/form1/index");
const webforms_aerialengagement_live_f1 = require("./modules/webforms/aerialengagement/live/form1/index");
const webforms_americanleatherusa_dev_f1 = require("./modules/webforms/americanleatherusa/dev/form1/index");
const webforms_americanleatherusa_live_f1 = require("./modules/webforms/americanleatherusa/live/form1/index");
const webforms_andresperezjurado_dev_f1 = require("./modules/webforms/andresperezjurado/dev/form1/index");
const webforms_andresperezjurado_live_f1 = require("./modules/webforms/andresperezjurado/live/form1/index");
const webforms_azdoordoctor_dev_f1 = require("./modules/webforms/azdoordoctor/dev/form1/index");
const webforms_azdoordoctor_dev_f2 = require("./modules/webforms/azdoordoctor/dev/form2/index");
const webforms_azdoordoctor_dev_f3 = require("./modules/webforms/azdoordoctor/dev/form3/index");
const webforms_azdoordoctor_live_f1 = require("./modules/webforms/azdoordoctor/live/form1/index");
const webforms_azdoordoctor_live_f2 = require("./modules/webforms/azdoordoctor/live/form2/index");
const webforms_azdoordoctor_live_f3 = require("./modules/webforms/azdoordoctor/live/form3/index");
const webforms_biltmoreloanandjewelry_dev_f1 = require("./modules/webforms/biltmoreloanandjewelry/dev/form1/index");
const webforms_biltmoreloanandjewelry_dev_f2 = require("./modules/webforms/biltmoreloanandjewelry/dev/form2/index");
const webforms_biltmoreloanandjewelry_dev_f3 = require("./modules/webforms/biltmoreloanandjewelry/dev/form3/index");
const webforms_biltmoreloanandjewelry_dev_f4 = require("./modules/webforms/biltmoreloanandjewelry/dev/form4/index");
const webforms_biltmoreloanandjewelry_dev_f5 = require("./modules/webforms/biltmoreloanandjewelry/dev/form5/index");
const webforms_biltmoreloanandjewelry_dev_f6 = require("./modules/webforms/biltmoreloanandjewelry/dev/form6/index");
const webforms_biltmoreloanandjewelry_live_f1 = require("./modules/webforms/biltmoreloanandjewelry/live/form1/index");
const webforms_biltmoreloanandjewelry_live_f2 = require("./modules/webforms/biltmoreloanandjewelry/live/form2/index");
const webforms_biltmoreloanandjewelry_live_f3 = require("./modules/webforms/biltmoreloanandjewelry/live/form3/index");
const webforms_biltmoreloanandjewelry_live_f4 = require("./modules/webforms/biltmoreloanandjewelry/live/form4/index");
const webforms_biltmoreloanandjewelry_live_f5 = require("./modules/webforms/biltmoreloanandjewelry/live/form5/index");
const webforms_biltmoreloanandjewelry_live_f6 = require("./modules/webforms/biltmoreloanandjewelry/live/form6/index");
const webforms_buckeyederm_dev_f1 = require("./modules/webforms/buckeyederm/dev/form1/index");
const webforms_buckeyederm_live_f1 = require("./modules/webforms/buckeyederm/live/form1/index");
const webforms_canyonfallshairextensioncompany_dev1_f1 = require("./modules/webforms/canyonfallshairextensioncompany/dev1/form1/index");
const webforms_canyonfallshairextensioncompany_dev1_f2 = require("./modules/webforms/canyonfallshairextensioncompany/dev1/form2/index");
const webforms_canyonfallshairextensioncompany_dev2_f1 = require("./modules/webforms/canyonfallshairextensioncompany/dev2/form1/index");
const webforms_canyonfallshairextensioncompany_dev2_f2 = require("./modules/webforms/canyonfallshairextensioncompany/dev2/form2/index");
const webforms_crexendo_dev_f1 = require("./modules/webforms/crexendo/dev/form1/index");
const webforms_crexendo_dev_f2 = require("./modules/webforms/crexendo/dev/form2/index");

const webforms_indinspect_dev_f1 = require("./modules/webforms/indinspect/dev/form1/index");
const webforms_indinspect_dev_f2 = require("./modules/webforms/indinspect/dev/form2/index");
const webforms_indinspect_live_f1 = require("./modules/webforms/indinspect/live/form1/index");
const responsiveness_desktop1 = require("./modules/responsiveness/desktop/windows11/windows11");
const responsiveness_desktop2 = require("./modules/responsiveness/desktop/windows8/windows8");
const responsiveness_desktop3 = require("./modules/responsiveness/desktop/windows7/windows7");
const responsiveness_desktop4 = require("./modules/responsiveness/desktop/macos_sierra/macos_sierra");
const responsiveness_mobile1 = require("./modules/responsiveness/mobile/samsung_galaxy_m30s/samsung_galaxy_m30s");
const responsiveness_mobile2 = require("./modules/responsiveness/mobile/google_pixel_5/google_pixel_5");
const responsiveness_mobile3 = require("./modules/responsiveness/mobile/oneplus_9/oneplus_9");
const responsiveness_mobile4 = require("./modules/responsiveness/mobile/xiaomi_mi_11/xiaomi_mi_11");
const responsiveness_mobile5 = require("./modules/responsiveness/mobile/realme_5/realme_5");
const responsiveness_mobile6 = require("./modules/responsiveness/mobile/huawei_p30_pro/huawei_p30_pro");
const responsiveness_mobile7 = require("./modules/responsiveness/mobile/sony_xperia_xz2/sony_xperia_xz2");
const responsiveness_mobile8 = require("./modules/responsiveness/mobile/moto_g6/moto_g6");
const responsiveness_mobile9 = require("./modules/responsiveness/mobile/lg_g6/lg_g6");
const responsiveness_mobile10 = require("./modules/responsiveness/mobile/iphone_13_pro_max/iphone_13_pro_max");
const responsiveness_mobile11 = require("./modules/responsiveness/mobile/iphone_13_pro/iphone_13_pro");
const responsiveness_mobile12 = require("./modules/responsiveness/mobile/iphone_13/iphone_13");
const responsiveness_mobile13 = require("./modules/responsiveness/mobile/iphone_12_pro_max/iphone_12_pro_max");
const responsiveness_mobile14 = require("./modules/responsiveness/mobile/iphone_11_pro_max/iphone_11_pro_max");
const responsiveness_mobile15 = require("./modules/responsiveness/mobile/iphone_x/iphone_x");

const responsiveness_tablet1 = require("./modules/responsiveness/tablet/ipad_air_4th_gen/ipad_air_4th_gen");
const responsiveness_tablet2 = require("./modules/responsiveness/tablet/galaxy_tab_s7_plus/galaxy_tab_s7_plus");
const responsiveness_tablet3 = require("./modules/responsiveness/tablet/galaxy_tab_s6/galaxy_tab_s6");
const expiry = 1000 * 60 * 60 * 24;
var date = new Date();
var dateString = date.getUTCFullYear() +"/"+ (date.getUTCMonth()+1) +"/"+ date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();


app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: expiry },
    resave: false 
}));

const success_msg = 'Success.<br><br><a href="http://localhost:3000/post">Return home</a>';

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/login.html');
});

app.get('/post', function(req, res){
    session=req.session;

    var userId = session.userid;
    
    if(userId){
        logger.errorLog();
        res.sendFile(__dirname + '/index.html');
    }
    else {
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const passwordData = process.env.ADMIN_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, 10);
    const usernameData = [
        "mbuendia@optimizex.com",
        "jmagnaye@optimizex.com",
        "ragulto@optimizex.com",
        "jaguilar@optimizex.com"
    ]
    session=req.session;
    session.userid=req.body.username;
    console.log(req.session)
    module.exports.userId = session.userid;
    
    try {
        logger.errorLog();
        if (usernameData.includes(username)) {
            console.log("user is allowed.");
            if (await bcrypt.compare(passwordData, hashedPassword)) {
                res.redirect("/post");
                logger.logger.log({ level: 'info', message: 'login success.', tester: this.userId });
                console.log("login success.");
                let value = [
                    "",
                    "info",
                    "login success.",
                    this.userId,
                    dateString
                ]
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                res.send('Login failed.');
                logger.logger.log({ level: 'error', message: 'login failed.', tester: this.userId });
                console.log("login failed.");
                let value = [
                    "",
                    "error",
                    "login failed.",
                    this.userId,
                    dateString
                ]
                await sheet.addRow();
                await sheet.appendValues(value);
            }
            logger.logger.log({ level: 'info', message: 'user is allowed.', tester: this.userId });
            console.log("user is allowed.");
            let value = [
                "",
                "info",
                "user is allowed.",
                this.userId,
                dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            res.send('User is not allowed.');
            logger.logger.log({ level: 'error', message: 'user is not allowed.', tester: this.userId });
            console.log("user is not allowed.");
            let value = [
                "",
                "error",
                "user is not allowed.",
                this.userId,
                dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        res.status(500).send();
        logger.logger.log({ level: 'error', message: error, tester: this.userId });
        console.log(error);
        let value = [
            "",
            "error",
            JSON.stringify(error),
            this.userId,
            dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }
});

app.get('/logout', async (req,res) => {
    logger.errorLog();
    try {
        req.session.destroy();
        res.redirect('/');
        logger.logger.log({ level: 'info', message: 'logout success.', tester: this.userId });
        console.log("logout success.");
        // let value = [
        //     "",
        //     "info",
        //     "logout success.",
        //     this.userId,
        //     dateString
        // ]
        // await sheet.addRow();
        // await sheet.appendValues(value);
        await sheet.clearLogs();
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'logout failed.', tester: this.userId });
        console.log("logout failed.");
        let value = [
            "",
            "error",
            "logout failed.",
            this.userId,
            dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    fs.writeFile("./middleware/logs/combined.log", "");
    fs.writeFile("./middleware/logs/error.log", "");
});

app.post('/post/checkout', function(req, res) {
    logger.errorLog();
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    const checkout = req.body.checkout;
    var checkbox_checkout = req.body.checkbox_checkout;
    const product = req.body.product;
    console.log("email: " + email);
    console.log("checkout: " + checkout);
    console.log("product: " + product);

    console.log("username_server: " + username);
    console.log("password_server: " + password);
    try {
        switch (checkout) {
            case "sunrisejewelryusa":
                switch (checkbox_checkout) {
                    case "dev":
                        var domain = "https://sunrisejewelryusa.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (product) {
                            case "product1":
                                console.log("checkout: " + checkout);
                                console.log("product1 selected.");
                                checkout_sunrisejewelryusa_dev_p1.index(domain, username, password, email);
                                break;
                            case "product2":
                                console.log("checkout: " + checkout);
                                console.log("product2 selected.");
                                checkout_sunrisejewelryusa_dev_p2.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.sunrisejewelryusa.com/";
                        console.log(domain);
                        console.log("live");
                        // switch (product) {
                        //     case "product1":
                        //         console.log("checkout: " + checkout);
                        //         console.log("product1 selected.");
                        //         checkout_sunrisejewelryusa_dev_p1.index(domain, username, password, email);
                        //         break;
                        //     case "product2":
                        //         console.log("checkout: " + checkout);
                        //         console.log("product2 selected.");
                        //         checkout_sunrisejewelryusa_dev_p2.index(domain, username, password, email);
                        //         break;
                        //     default:
                        //         break;
                        // }
                        break;
                
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/image_optimization', function(req, res) {
    logger.errorLog();
    var url = req.body.url;
    console.log("URL: " + url);
    try {
        image_optimization.imageOptimization(url);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/visibility', async (req, res) => {
    logger.errorLog();
    // sheet.gsheet();
    const site_name = req.body.site_name;
    console.log("Site Name: " + site_name);
    try {
        await visibility.chrome(site_name);
        await visibility.firefox(site_name);
        await visibility.edge(site_name);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});


app.post('/post/webforms', async (req, res) => {
    logger.errorLog();
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var site = req.body.site;
    var checkbox = req.body.checkbox;
    var checkbox_cfhec = req.body.checkbox_cfhec;
    console.log("username: " + username);
    console.log("password: " + password);  
    console.log("email: " + email); 
    try {
        switch (site) {
            case "accidentchiropracticaz":
                var site_accidentchiropracticaz = req.body.site_accidentchiropracticaz;
                console.log("Site: " + site_accidentchiropracticaz);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://accidentchiropracticazdev.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_accidentchiropracticaz) {
                            case "form1":
                                console.log("form1");
                                await webforms_accidentchiropracticaz_dev_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                await webforms_accidentchiropracticaz_dev_f2.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.accidentchiropracticaz.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_accidentchiropracticaz) {
                            case "form1":
                                console.log("form1");
                                webforms_accidentchiropracticaz_live_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_accidentchiropracticaz_live_f2.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "advancedimagemedspa":
                var site_advancedimagemedspa = req.body.site_advancedimagemedspa;
                console.log("Site: " + site_advancedimagemedspa);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://advancedimagemedspadev.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_advancedimagemedspa) {
                            case "form1":
                                console.log("form1");
                                webforms_advancedimagemedspa_dev_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_advancedimagemedspa_dev_f2.index(domain, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_advancedimagemedspa_dev_f3.index(domain, checkbox, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.advancedimagemedspa.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_advancedimagemedspa) {
                            case "form1":
                                console.log("form1");
                                webforms_advancedimagemedspa_live_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_advancedimagemedspa_live_f2.index(domain, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_advancedimagemedspa_live_f3.index(domain, checkbox, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "aerialengagement":
                var site_aerialengagement = req.body.site_aerialengagement;
                console.log("Site: " + site_aerialengagement);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://aerialengagementdev.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_aerialengagement) {
                            case "form1":
                                console.log("form1");
                                webforms_aerialengagement_dev_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.aerialengagement.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_aerialengagement) {
                            case "form1":
                                console.log("form1");
                                webforms_aerialengagement_live_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "americanleatherusa":
                var site_americanleatherusa = req.body.site_americanleatherusa;
                console.log("Site: " + site_americanleatherusa);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://americanleatherusa.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_americanleatherusa) {
                            case "form1":
                                console.log("form1");
                                webforms_americanleatherusa_dev_f1.index(domain, username, password, email)
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.americanleatherusa.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_americanleatherusa) {
                            case "form1":
                                console.log("form1");
                                webforms_americanleatherusa_live_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "andresperezjurado":
                var site_andresperezjurado = req.body.site_andresperezjurado;
                console.log("Site: " + site_andresperezjurado);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://andresperezjurado.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_andresperezjurado) {
                            case "form1":
                                console.log("form1");
                                webforms_andresperezjurado_dev_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.andresperezjurado.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_andresperezjurado) {
                            case "form1":
                                console.log("form1");
                                webforms_andresperezjurado_live_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "azdoordoctor":
                var site_azdoordoctor = req.body.site_azdoordoctor;
                console.log("Site: " + site_azdoordoctor);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://azdoordoctor.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_azdoordoctor) {
                            case "form1":
                                console.log("form1");
                                webforms_azdoordoctor_dev_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_azdoordoctor_dev_f2.index(domain, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_azdoordoctor_dev_f3.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.azdoordoctor.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_azdoordoctor) {
                            case "form1":
                                console.log("form1");
                                webforms_azdoordoctor_live_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_azdoordoctor_live_f2.index(domain, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_azdoordoctor_live_f3.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "biltmoreloanandjewelry":
                var site_biltmoreloanandjewelry = req.body.site_biltmoreloanandjewelry;
                console.log("Site: " + site_biltmoreloanandjewelry);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://biltmorelandj.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_biltmoreloanandjewelry) {
                            case "form1":
                                console.log("form1");
                                webforms_biltmoreloanandjewelry_dev_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_biltmoreloanandjewelry_dev_f2.index(domain, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_biltmoreloanandjewelry_dev_f3.index(domain, username, password, email);
                                break;
                            case "form4":
                                console.log("form4");
                                webforms_biltmoreloanandjewelry_dev_f4.index(domain, username, password, email);
                                break;
                            case "form5":
                                console.log("form5");
                                webforms_biltmoreloanandjewelry_dev_f5.index(domain, username, password, email);
                                break;
                            case "form6":
                                console.log("form6");
                                webforms_biltmoreloanandjewelry_dev_f6.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.biltmoreloanandjewelry.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_biltmoreloanandjewelry) {
                            case "form1":
                                console.log("form1");
                                webforms_biltmoreloanandjewelry_live_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_biltmoreloanandjewelry_live_f2.index(domain, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_biltmoreloanandjewelry_live_f3.index(domain, username, password, email);
                                break;
                            case "form4":
                                console.log("form4");
                                webforms_biltmoreloanandjewelry_live_f4.index(domain, username, password, email);
                                break;
                            case "form5":
                                console.log("form5");
                                webforms_biltmoreloanandjewelry_live_f5.index(domain, username, password, email);
                                break;
                            case "form6":
                                console.log("form6");
                                webforms_biltmoreloanandjewelry_live_f6.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "buckeyederm":
                var site_buckeyederm = req.body.site_buckeyederm;
                console.log("Site: " + site_buckeyederm);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://buckeyedermdev.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_buckeyederm) {
                            case "form1":
                                console.log("form1");
                                webforms_buckeyederm_dev_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.buckeyederm.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_buckeyederm) {
                            case "form1":
                                console.log("form1");
                                webforms_buckeyederm_live_f1.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "canyonfallshairextensioncompany":
                var site_canyonfallshairextensioncompany = req.body.site_canyonfallshairextensioncompany;
                console.log("Site: " + site_canyonfallshairextensioncompany);
                switch (checkbox_cfhec) {
                    case "dev1":
                        var domain = "https://dev.thehairextensioncompany.com/";
                        console.log(domain);
                        console.log("dev1");
                        switch (site_canyonfallshairextensioncompany) {
                            case "form1":
                                console.log("form1");
                                webforms_canyonfallshairextensioncompany_dev1_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_canyonfallshairextensioncompany_dev1_f2.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "dev2":
                        var domain = "https://thehairextensioncompany.primeview.com/";
                        console.log(domain);
                        console.log("dev2");
                        switch (site_canyonfallshairextensioncompany) {
                            case "form1":
                                console.log("form1");
                                webforms_canyonfallshairextensioncompany_dev2_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_canyonfallshairextensioncompany_dev2_f2.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "crexendo":
                var site_crexendo = req.body.site_crexendo;
                console.log("Site: " + site_crexendo);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://crexendoredesign.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_crexendo) {
                            case "form1":
                                console.log("form1");
                                webforms_crexendo_dev_f1.index(domain, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_crexendo_dev_f2.index(domain, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = "https://thehairextensioncompany.primeview.com/";
                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_canyonfallshairextensioncompany) {
                    //         case "form1":
                    //             console.log("form1");
                    //             webforms_canyonfallshairextensioncompany_dev2_f1.index(domain, username, password, email);
                    //             break;
                    //         case "form2":
                    //             console.log("form2");
                    //             webforms_canyonfallshairextensioncompany_dev2_f2.index(domain, username, password, email);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "indinspect":
                var site_indinspect = req.body.site_indinspect;
                console.log("Site: " + site_indinspect);
                switch (checkbox) {
                    case "dev":
                        var domain = "https://indinspectdev.primeview.com/";
                        console.log(domain);
                        console.log("dev");
                        switch (site_indinspect) {
                            case "form1":
                                console.log("form1");
                                webforms_indinspect_dev_f1.index(domain, checkbox, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_indinspect_dev_f2.index(domain, checkbox, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = "https://www.indinspect.com/";
                        console.log(domain);
                        console.log("live");
                        switch (site_indinspect) {
                            case "form1":
                                console.log("form1");
                                webforms_indinspect_live_f1.index(domain, checkbox, username, password, email);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});


app.post('/post/responsiveness', function(req, res) {
    logger.errorLog();
    var url = req.body.url;
    var device = req.body.device;
    var email = req.body.email;
    var password = req.body.password;
    console.log("URL: " + url);
    console.log("Device: " + device);
    console.log("email: " + email);
    console.log("password: " + password);
    try {
        switch (device) {
            case "desktop":
                var version_desktop = req.body.version_desktop;
                console.log("Version: " + version_desktop);
                switch (version_desktop) {
                    case "version1":
                        responsiveness_desktop1.windows11(url, email, password);
                        break;
                    case "version2":
                        responsiveness_desktop2.windows8(url, email, password);
                        break;
                    case "version3":
                        responsiveness_desktop3.windows7(url, email, password);
                        break;
                    case "version4":
                        responsiveness_desktop4.macos_sierra(url, email, password);
                        break;
                    default:
                        break;
                }
                break;
            case "mobile":
                var version_mobile = req.body.version_mobile;
                console.log("Version: " + version_mobile);
                switch (version_mobile) {
                    case "version1":
                        responsiveness_mobile1.samsung_galaxy_m30s(url, email, password);
                        break;
                    case "version2":
                        responsiveness_mobile2.google_pixel_5(url, email, password);
                        break;
                    case "version3":
                        responsiveness_mobile3.oneplus_9(url, email, password);
                        break;
                    case "version4":
                        responsiveness_mobile4.xiaomi_mi_11(url, email, password);
                        break;
                    case "version5":
                        responsiveness_mobile5.realme_5(url, email, password);
                        break;
                    case "version6":
                        responsiveness_mobile6.huawei_p30_pro(url, email, password);
                        break;
                    case "version7":
                        responsiveness_mobile7.sony_xperia_xz2(url, email, password);
                        break;
                    case "version8":
                        responsiveness_mobile8.moto_g6(url, email, password);
                        break;
                    case "version9":
                        responsiveness_mobile9.lg_g6(url, email, password);
                        break;
                    case "version10":
                        responsiveness_mobile10.iphone_13_pro_max(url, email, password);
                        break;
                    case "version11":
                        responsiveness_mobile11.iphone_13_pro(url, email, password);
                        break;
                    case "version12":
                        responsiveness_mobile12.iphone_13(url, email, password);
                        break;
                    case "version13":
                        responsiveness_mobile13.iphone_12_pro_max(url, email, password);
                        break;
                    case "version14":
                        responsiveness_mobile14.iphone_11_pro_max(url, email, password);
                        break;
                    case "version15":
                        responsiveness_mobile15.iphone_x(url, email, password);
                        break;
                    default:
                        break;
                }
                break;
            case "tablet":
                var version_tablet = req.body.version_tablet;
                console.log("Version: " + version_tablet);
                switch (version_tablet) {
                    case "version1":
                        responsiveness_tablet1.ipad_air_4th_gen(url, email, password);
                        break;
                    case "version2":
                        responsiveness_tablet2.galaxy_tab_s7_plus(url, email, password);
                        break;
                    case "version3":
                        responsiveness_tablet3.galaxy_tab_s6(url, email, password);
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});


http.listen(3000, function(){
  console.log('listening on port 3000');
});


