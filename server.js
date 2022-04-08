require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('file-system');
const logger = require("./middleware/logger.js");
const sheet = require('./middleware/gsheet.js');
const config = require("./server_config");

const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const checkout_sunrisejewelryusa_dev_p1 = require("./modules/checkout/sunrisejewelryusa/dev/product1/index");
const checkout_sunrisejewelryusa_dev_p2 = require("./modules/checkout/sunrisejewelryusa/dev/product2/index");
const image_optimization = require("./modules/image_optimization/image_optimization");
const visibility = require("./modules/visibility/visibility");

const webforms_accidentchiropracticaz_f1 = require("./modules/webforms/contactform7/forms/accidentchiropracticaz/form1/index");
const webforms_accidentchiropracticaz_f2 = require("./modules/webforms/contactform7/forms/accidentchiropracticaz/form2/index");
const webforms_advancedimagemedspa_f1 = require("./modules/webforms/contactform7/forms/advancedimagemedspa/form1/index");
const webforms_advancedimagemedspa_f2 = require("./modules/webforms/contactform7/forms/advancedimagemedspa/form2/index");
const webforms_advancedimagemedspa_f3 = require("./modules/webforms/contactform7/forms/advancedimagemedspa/form3/index");
const webforms_aerialengagement_f1 = require("./modules/webforms/contactform7/forms/aerialengagement/form1/index");
const webforms_americanleatherusa_f1 = require("./modules/webforms/contactform7/forms/americanleatherusa/form1/index");
const webforms_andresperezjurado_f1 = require("./modules/webforms/contactform7/forms/andresperezjurado/form1/index");
const webforms_azdoordoctor_f1 = require("./modules/webforms/contactform7/forms/azdoordoctor/form1/index");
const webforms_azdoordoctor_f2 = require("./modules/webforms/contactform7/forms/azdoordoctor/form2/index");
const webforms_azdoordoctor_f3 = require("./modules/webforms/contactform7/forms/azdoordoctor/form3/index");
const webforms_biltmoreloanandjewelry_f1 = require("./modules/webforms/contactform7/forms/biltmoreloanandjewelry/form1/index");
const webforms_biltmoreloanandjewelry_f2 = require("./modules/webforms/contactform7/forms/biltmoreloanandjewelry/form2/index");
const webforms_biltmoreloanandjewelry_f3 = require("./modules/webforms/contactform7/forms/biltmoreloanandjewelry/form3/index");
const webforms_biltmoreloanandjewelry_f4 = require("./modules/webforms/contactform7/forms/biltmoreloanandjewelry/form4/index");
const webforms_biltmoreloanandjewelry_f5 = require("./modules/webforms/contactform7/forms/biltmoreloanandjewelry/form5/index");
const webforms_biltmoreloanandjewelry_f6 = require("./modules/webforms/contactform7/forms/biltmoreloanandjewelry/form6/index");
const webforms_buckeyederm_f1 = require("./modules/webforms/contactform7/forms/buckeyederm/form1/index");
const webforms_canyonfallshairextensioncompany_f1 = require("./modules/webforms/contactform7/forms/canyonfallshairextensioncompany/form1/index");
const webforms_canyonfallshairextensioncompany_f2 = require("./modules/webforms/contactform7/forms/canyonfallshairextensioncompany/form2/index");
const webforms_crexendo_f1 = require("./modules/webforms/contactform7/forms/crexendo/form1/index");
const webforms_crexendo_f2 = require("./modules/webforms/contactform7/forms/crexendo/form2/index");
const webforms_ewingconstruction_f1 = require("./modules/webforms/contactform7/forms/ewingconstruction/form1/index");
const webforms_indinspect_f1 = require("./modules/webforms/contactform7/forms/indinspect/form1/index");
const webforms_indinspect_f2 = require("./modules/webforms/contactform7/forms/indinspect/form2/index");
const webforms_judefrancesjewelry_f1 = require("./modules/webforms/contactform7/forms/judefrancesjewelry/form1/index");
const webforms_judefrancesjewelry_f2 = require("./modules/webforms/contactform7/forms/judefrancesjewelry/form2/index");
const webforms_judefrancesjewelry_f3 = require("./modules/webforms/contactform7/forms/judefrancesjewelry/form3/index");
const webforms_judefrancesjewelry_f4 = require("./modules/webforms/contactform7/forms/judefrancesjewelry/form4/index");
const webforms_judefrancesjewelry_f5 = require("./modules/webforms/contactform7/forms/judefrancesjewelry/form5/index");
const webforms_judefrancesjewelry_f6 = require("./modules/webforms/contactform7/forms/judefrancesjewelry/form6/index");
const webforms_kyrenefamilydentistry_f1 = require("./modules/webforms/contactform7/forms/kyrenefamilydentistry/form1/index");
const webforms_kyrenefamilydentistry_f2 = require("./modules/webforms/contactform7/forms/kyrenefamilydentistry/form2/index");
const webforms_optimizex_f1 = require("./modules/webforms/contactform7/forms/optimizex/form1/index");
const webforms_optimizex_f2 = require("./modules/webforms/contactform7/forms/optimizex/form2/index");
const webforms_optimizex_f3 = require("./modules/webforms/contactform7/forms/optimizex/form3/index");

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
var timestamp = date.getUTCFullYear() +"/"+ (date.getUTCMonth()+1) +"/"+ date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();


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
                let value = [ "", "info", "login success.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                res.send('Login failed.');
                logger.logger.log({ level: 'error', message: 'login failed.', tester: this.userId });
                console.log("login failed.");
                let value = [ "", "error", "login failed.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } else {
            res.send('User is not allowed.');
            logger.logger.log({ level: 'error', message: 'user is not allowed.', tester: this.userId });
            console.log("user is not allowed.");
            let value = [ "", "error", "user is not allowed.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        res.status(500).send();
        logger.logger.log({ level: 'error', message: error, tester: this.userId });
        console.log(error);
        let value = [ "", "error", JSON.stringify(error), this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
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
        await sheet.clearLogs();
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'logout failed.', tester: this.userId });
        console.log("logout failed.");
        let value = [ "", "logout failed.", JSON.stringify(error), this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    fs.writeFile("./middleware/logs/combined.log", "");
    fs.writeFile("./middleware/logs/error.log", "");
});

app.post('/post/checkout', async (req, res) => {
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
                                checkout_sunrisejewelryusa_dev_p1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "product2":
                                console.log("checkout: " + checkout);
                                console.log("product2 selected.");
                                checkout_sunrisejewelryusa_dev_p2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
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
        image_optimization.imageOptimization(url, timestamp);
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
        await visibility.chrome(site_name, timestamp);
        await visibility.firefox(site_name, timestamp);
        await visibility.edge(site_name, timestamp);
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
    var qa_email = config.qa_email;
    const module_name = config.module_name.webforms;
    var date = config.date;
    // var checkbox_cfhec = req.body.checkbox_cfhec;
 
    console.log("username: " + username);
    console.log("password: " + password);  
    console.log("email: " + email); 
    try {
        switch (site) {
            case "accidentchiropracticaz":
                var site_accidentchiropracticaz = req.body.site_accidentchiropracticaz;
                var sheetId = config.sheetId.accidentchiropracticaz;
                var ranges = config.ranges.accidentchiropracticaz;
                var range_recipient = config.range_recipient.accidentchiropracticaz;
                var range_thankyou_page = config.range_thankyou_page.accidentchiropracticaz;

                console.log("Site: " + site_accidentchiropracticaz);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.accidentchiropracticaz.dev;
                        var wp_creds_username = config.wp_creds.accidentchiropracticaz.username;
                        var wp_creds_password = config.wp_creds.accidentchiropracticaz.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.accidentchiropracticaz.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_accidentchiropracticaz) {
                            case "form1":
                                var forms = config.forms.accidentchiropracticaz.form1;
                                var row_title = config.row_title.accidentchiropracticaz.dev.form1;
                                var webforms = config.webforms.accidentchiropracticaz.dev.form1;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form1;

                                console.log("form1");
                                await webforms_accidentchiropracticaz_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.accidentchiropracticaz.form2;
                                var row_title = config.row_title.accidentchiropracticaz.dev.form2;
                                var webforms = config.webforms.accidentchiropracticaz.dev.form2;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form2;

                                console.log("form2");
                                await webforms_accidentchiropracticaz_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.accidentchiropracticaz.live;
                        var wp_creds_username = config.wp_creds.accidentchiropracticaz.username;
                        var wp_creds_password = config.wp_creds.accidentchiropracticaz.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.accidentchiropracticaz.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_accidentchiropracticaz) {
                            case "form1":
                                var forms = config.forms.accidentchiropracticaz.form1;
                                var row_title = config.row_title.accidentchiropracticaz.live.form1;
                                var webforms = config.webforms.accidentchiropracticaz.live.form1;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form1;

                                console.log("form1");
                                webforms_accidentchiropracticaz_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.accidentchiropracticaz.form2;
                                var row_title = config.row_title.accidentchiropracticaz.live.form2;
                                var webforms = config.webforms.accidentchiropracticaz.live.form2;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form2;

                                console.log("form2");
                                webforms_accidentchiropracticaz_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
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
                var sheetId = config.sheetId.advancedimagemedspa;
                var ranges = config.ranges.advancedimagemedspa;
                var range_recipient = config.range_recipient.advancedimagemedspa;
                var range_thankyou_page = config.range_thankyou_page.advancedimagemedspa;

                console.log("Site: " + site_advancedimagemedspa);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.advancedimagemedspa.dev;
                        var wp_creds_username = config.wp_creds.advancedimagemedspa.username;
                        var wp_creds_password = config.wp_creds.advancedimagemedspa.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.advancedimagemedspa.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_advancedimagemedspa) {
                            case "form1":
                                var forms = config.forms.advancedimagemedspa.form1;
                                var row_title = config.row_title.advancedimagemedspa.dev.form1;
                                var webforms = config.webforms.advancedimagemedspa.dev.form1;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form1;

                                console.log("form1");
                                webforms_advancedimagemedspa_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.advancedimagemedspa.form2;
                                var row_title = config.row_title.advancedimagemedspa.dev.form2;
                                var webforms = config.webforms.advancedimagemedspa.dev.form2;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form2;

                                console.log("form2");
                                webforms_advancedimagemedspa_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            // case "form3":
                            //     var forms = config.forms.advancedimagemedspa.form3_dev;
                            //     var row_title = config.row_title.advancedimagemedspa.dev.form3;
                            //     var webforms = config.webforms.advancedimagemedspa.dev.form3;
                            //     var contact_form_name = config.contact_form_name.advancedimagemedspa.;
                            //     var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form3_dev;

                            //     console.log("form3");
                            //     webforms_advancedimagemedspa_f3.index(domain, checkbox, username, password, email, timestamp);
                            //     break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.advancedimagemedspa.live;
                        var wp_creds_username = config.wp_creds.advancedimagemedspa.username;
                        var wp_creds_password = config.wp_creds.advancedimagemedspa.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.advancedimagemedspa.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_advancedimagemedspa) {
                            case "form1":
                                var forms = config.forms.advancedimagemedspa.form1;
                                var row_title = config.row_title.advancedimagemedspa.live.form1;
                                var webforms = config.webforms.advancedimagemedspa.live.form1;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form1;

                                console.log("form1");
                                webforms_advancedimagemedspa_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.advancedimagemedspa.form2;
                                var row_title = config.row_title.advancedimagemedspa.live.form2;
                                var webforms = config.webforms.advancedimagemedspa.live.form2;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form2;

                                console.log("form2");
                                webforms_advancedimagemedspa_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            // case "form3":
                            //     var forms = config.forms.advancedimagemedspa.form3_live;
                            //     var row_title = config.row_title.advancedimagemedspa.live.form3;
                            //     var webforms = config.webforms.advancedimagemedspa.live.form3;
                            //     var contact_form_name = config.contact_form_name.advancedimagemedspa.;
                            //     var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form3_live;

                            //     console.log("form3");
                            //     webforms_advancedimagemedspa_f3.index(domain, checkbox, username, password, email, timestamp);
                            //     break;
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
                var sheetId = config.sheetId.aerialengagement;
                var ranges = config.ranges.aerialengagement;
                var range_recipient = config.range_recipient.aerialengagement;
                var range_thankyou_page = config.range_thankyou_page.aerialengagement;

                console.log("Site: " + site_aerialengagement);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.aerialengagement.dev;
                        var wp_creds_username = config.wp_creds.aerialengagement.username;
                        var wp_creds_password = config.wp_creds.aerialengagement.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.aerialengagement.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_aerialengagement) {
                            case "form1":
                                var forms = config.forms.aerialengagement.form1;
                                var row_title = config.row_title.aerialengagement.dev.form1;
                                var webforms = config.webforms.aerialengagement.dev.form1;
                                var contact_form_name = config.contact_form_name.aerialengagement.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.aerialengagement.form1;
                                
                                console.log("form1");
                                webforms_aerialengagement_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = config.domain.aerialengagement.live;
                    //     var wp_creds_username = config.wp_creds.aerialengagement.username;
                    //     var wp_creds_password = config.wp_creds.aerialengagement.password;
                    //     var launch = config.launch.live;
                    //     var wp_menu_name = config.wp_menu_name.aerialengagement.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_aerialengagement) {
                    //         case "form1":
                    //             var forms = config.forms.aerialengagement.form1;
                    //             var row_title = config.row_title.aerialengagement.live.form1;
                    //             var webforms = config.webforms.aerialengagement.live.form1;
                    //             var contact_form_name = config.contact_form_name.aerialengagement.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.aerialengagement.form1;

                    //             console.log("form1");
                    //             webforms_aerialengagement_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "americanleatherusa":
                var site_americanleatherusa = req.body.site_americanleatherusa;
                var sheetId = config.sheetId.americanleatherusa;
                var ranges = config.ranges.americanleatherusa;
                var range_recipient = config.range_recipient.americanleatherusa;
                var range_thankyou_page = config.range_thankyou_page.americanleatherusa;

                console.log("Site: " + site_americanleatherusa);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.americanleatherusa.dev;
                        var wp_creds_username = config.wp_creds.americanleatherusa.username;
                        var wp_creds_password = config.wp_creds.americanleatherusa.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.americanleatherusa.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_americanleatherusa) {
                            case "form1":
                                var forms = config.forms.americanleatherusa.form1;
                                var row_title = config.row_title.americanleatherusa.dev.form1;
                                var webforms = config.webforms.americanleatherusa.dev.form1;
                                var contact_form_name = config.contact_form_name.americanleatherusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.americanleatherusa.form1;

                                console.log("form1");
                                webforms_americanleatherusa_f1.index(domain, username, password, email, timestamp)
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.americanleatherusa.live;
                        var wp_creds_username = config.wp_creds.americanleatherusa.username;
                        var wp_creds_password = config.wp_creds.americanleatherusa.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.americanleatherusa.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_americanleatherusa) {
                            case "form1":
                                var forms = config.forms.americanleatherusa.form1;
                                var row_title = config.row_title.americanleatherusa.live.form1;
                                var webforms = config.webforms.americanleatherusa.live.form1;
                                var contact_form_name = config.contact_form_name.americanleatherusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.americanleatherusa.form1;

                                console.log("form1");
                                webforms_americanleatherusa_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "andresperezjurado":
                var site_andresperezjurado = req.body.site_andresperezjurado;
                var sheetId = config.sheetId.andresperezjurado;
                var ranges = config.ranges.andresperezjurado;
                var range_recipient = config.range_recipient.andresperezjurado;
                var range_thankyou_page = config.range_thankyou_page.andresperezjurado;

                console.log("Site: " + site_andresperezjurado);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.andresperezjurado.dev;
                        var wp_creds_username = config.wp_creds.andresperezjurado.username;
                        var wp_creds_password = config.wp_creds.andresperezjurado.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.andresperezjurado.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_andresperezjurado) {
                            case "form1":
                                var forms = config.forms.andresperezjurado.form1;
                                var row_title = config.row_title.andresperezjurado.dev.form1;
                                var webforms = config.webforms.andresperezjurado.dev.form1;
                                var contact_form_name = config.contact_form_name.andresperezjurado.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.andresperezjurado.form1;

                                console.log("form1");
                                webforms_andresperezjurado_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.andresperezjurado.live;
                        var wp_creds_username = config.wp_creds.andresperezjurado.username;
                        var wp_creds_password = config.wp_creds.andresperezjurado.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.andresperezjurado.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_andresperezjurado) {
                            case "form1":
                                var forms = config.forms.andresperezjurado.form1;
                                var row_title = config.row_title.andresperezjurado.live.form1;
                                var webforms = config.webforms.andresperezjurado.live.form1;
                                var contact_form_name = config.contact_form_name.andresperezjurado.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.andresperezjurado.form1;

                                console.log("form1");
                                webforms_andresperezjurado_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "azdoordoctor":
                var site_azdoordoctor = req.body.site_azdoordoctor;
                var sheetId = config.sheetId.azdoordoctor;
                var ranges = config.ranges.azdoordoctor;
                var range_recipient = config.range_recipient.azdoordoctor;
                var range_thankyou_page = config.range_thankyou_page.azdoordoctor;

                console.log("Site: " + site_azdoordoctor);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.azdoordoctor.dev;
                        var wp_creds_username = config.wp_creds.azdoordoctor.username;
                        var wp_creds_password = config.wp_creds.azdoordoctor.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.azdoordoctor.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_azdoordoctor) {
                            case "form1":
                                var forms = config.forms.azdoordoctor.form1;
                                var row_title = config.row_title.azdoordoctor.dev.form1;
                                var webforms = config.webforms.azdoordoctor.dev.form1;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form1;

                                console.log("form1");
                                webforms_azdoordoctor_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.azdoordoctor.form2;
                                var row_title = config.row_title.azdoordoctor.dev.form2;
                                var webforms = config.webforms.azdoordoctor.dev.form2;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form2;

                                console.log("form2");
                                webforms_azdoordoctor_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.azdoordoctor.form3;
                                var row_title = config.row_title.azdoordoctor.dev.form3;
                                var webforms = config.webforms.azdoordoctor.dev.form3;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form3;

                                console.log("form3");
                                webforms_azdoordoctor_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.azdoordoctor.live;
                        var wp_creds_username = config.wp_creds.azdoordoctor.username;
                        var wp_creds_password = config.wp_creds.azdoordoctor.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.azdoordoctor.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_azdoordoctor) {
                            case "form1":
                                var forms = config.forms.azdoordoctor.form1;
                                var row_title = config.row_title.azdoordoctor.live.form1;
                                var webforms = config.webforms.azdoordoctor.live.form1;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form1;

                                console.log("form1");
                                webforms_azdoordoctor_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.azdoordoctor.form2;
                                var row_title = config.row_title.azdoordoctor.live.form2;
                                var webforms = config.webforms.azdoordoctor.live.form2;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form2;

                                console.log("form2");
                                webforms_azdoordoctor_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.azdoordoctor.form3;
                                var row_title = config.row_title.azdoordoctor.live.form3;
                                var webforms = config.webforms.azdoordoctor.live.form3;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form3;

                                console.log("form3");
                                webforms_azdoordoctor_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "biltmoreloanandjewelry":
                var site_biltmoreloanandjewelry = req.body.site_biltmoreloanandjewelry;
                var sheetId = config.sheetId.biltmoreloanandjewelry;
                var ranges = config.ranges.biltmoreloanandjewelry;
                var range_recipient = config.range_recipient.biltmoreloanandjewelry;
                var range_thankyou_page = config.range_thankyou_page.biltmoreloanandjewelry;

                console.log("Site: " + site_biltmoreloanandjewelry);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.biltmoreloanandjewelry.dev;
                        var wp_creds_username = config.wp_creds.biltmoreloanandjewelry.username;
                        var wp_creds_password = config.wp_creds.biltmoreloanandjewelry.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.biltmoreloanandjewelry.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_biltmoreloanandjewelry) {
                            case "form1":
                                var forms = config.forms.biltmoreloanandjewelry.form1;
                                var row_title = config.row_title.biltmoreloanandjewelry.dev.form1;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form1;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form1;

                                console.log("form1");
                                webforms_biltmoreloanandjewelry_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.biltmoreloanandjewelry.form2;
                                var row_title = config.row_title.biltmoreloanandjewelry.dev.form2;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form2;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form2;

                                console.log("form2");
                                webforms_biltmoreloanandjewelry_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.biltmoreloanandjewelry.form3;
                                var row_title = config.row_title.biltmoreloanandjewelry.dev.form3;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form3;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form3;

                                console.log("form3");
                                webforms_biltmoreloanandjewelry_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form4":
                                var forms = config.forms.biltmoreloanandjewelry.form4;
                                var row_title = config.row_title.biltmoreloanandjewelry.dev.form4;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form4;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form4;

                                console.log("form4");
                                webforms_biltmoreloanandjewelry_f4.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form5":
                                var forms = config.forms.biltmoreloanandjewelry.form5;
                                var row_title = config.row_title.biltmoreloanandjewelry.dev.form5;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form5;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form5;

                                console.log("form5");
                                webforms_biltmoreloanandjewelry_f5.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form6":
                                var forms = config.forms.biltmoreloanandjewelry.form6;
                                var row_title = config.row_title.biltmoreloanandjewelry.dev.form6;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form6;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form6;

                                console.log("form6");
                                webforms_biltmoreloanandjewelry_f6.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.biltmoreloanandjewelry.live;
                        var wp_creds_username = config.wp_creds.biltmoreloanandjewelry.username;
                        var wp_creds_password = config.wp_creds.biltmoreloanandjewelry.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.biltmoreloanandjewelry.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_biltmoreloanandjewelry) {
                            case "form1":
                                var forms = config.forms.biltmoreloanandjewelry.form1;
                                var row_title = config.row_title.biltmoreloanandjewelry.live.form1;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form1;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form1;

                                console.log("form1");
                                webforms_biltmoreloanandjewelry_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.biltmoreloanandjewelry.form2;
                                var row_title = config.row_title.biltmoreloanandjewelry.live.form2;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form2;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form2;

                                console.log("form2");
                                webforms_biltmoreloanandjewelry_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.biltmoreloanandjewelry.form3;
                                var row_title = config.row_title.biltmoreloanandjewelry.live.form3;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form3;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form3;

                                console.log("form3");
                                webforms_biltmoreloanandjewelry_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form4":
                                var forms = config.forms.biltmoreloanandjewelry.form4;
                                var row_title = config.row_title.biltmoreloanandjewelry.live.form4;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form4;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form4;

                                console.log("form4");
                                webforms_biltmoreloanandjewelry_f4.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form5":
                                var forms = config.forms.biltmoreloanandjewelry.form5;
                                var row_title = config.row_title.biltmoreloanandjewelry.live.form5;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form5;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form5;

                                console.log("form5");
                                webforms_biltmoreloanandjewelry_f5.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form6":
                                var forms = config.forms.biltmoreloanandjewelry.form6;
                                var row_title = config.row_title.biltmoreloanandjewelry.live.form6;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form6;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form6;

                                console.log("form6");
                                webforms_biltmoreloanandjewelry_f6.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "buckeyederm":
                var site_buckeyederm = req.body.site_buckeyederm;
                var sheetId = config.sheetId.buckeyederm;
                var ranges = config.ranges.buckeyederm;
                var range_recipient = config.range_recipient.buckeyederm;
                var range_thankyou_page = config.range_thankyou_page.buckeyederm;

                console.log("Site: " + site_buckeyederm);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.buckeyederm.dev;
                        var wp_creds_username = config.wp_creds.buckeyederm.username;
                        var wp_creds_password = config.wp_creds.buckeyederm.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.buckeyederm.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_buckeyederm) {
                            case "form1":
                                var forms = config.forms.buckeyederm.form1;
                                var row_title = config.row_title.buckeyederm.dev.form1;
                                var webforms = config.webforms.buckeyederm.dev.form1;
                                var contact_form_name = config.contact_form_name.buckeyederm.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.buckeyederm.form1;

                                console.log("form1");
                                webforms_buckeyederm_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.buckeyederm.live;
                        var wp_creds_username = config.wp_creds.buckeyederm.username;
                        var wp_creds_password = config.wp_creds.buckeyederm.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.buckeyederm.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_buckeyederm) {
                            case "form1":
                                var forms = config.forms.buckeyederm.form1;
                                var row_title = config.row_title.buckeyederm.live.form1;
                                var webforms = config.webforms.buckeyederm.live.form1;
                                var contact_form_name = config.contact_form_name.buckeyederm.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.buckeyederm.form1;

                                console.log("form1");
                                webforms_buckeyederm_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "canyonfallshairextensioncompany":
                var site_canyonfallshairextensioncompany = req.body.site_canyonfallshairextensioncompany;
                var sheetId = config.sheetId.canyonfallshairextensioncompany;
                var ranges = config.ranges.canyonfallshairextensioncompany;
                var range_recipient = config.range_recipient.canyonfallshairextensioncompany;
                var range_thankyou_page = config.range_thankyou_page.canyonfallshairextensioncompany;

                console.log("Site: " + site_canyonfallshairextensioncompany);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.canyonfallshairextensioncompany.dev;
                        var wp_creds_username = config.wp_creds.canyonfallshairextensioncompany.username;
                        var wp_creds_password = config.wp_creds.canyonfallshairextensioncompany.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.canyonfallshairextensioncompany.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_canyonfallshairextensioncompany) {
                            case "form1":
                                var forms = config.forms.canyonfallshairextensioncompany.form1;
                                var row_title = config.row_title.canyonfallshairextensioncompany.dev.form1;
                                var webforms = config.webforms.canyonfallshairextensioncompany.dev.form1;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form1;

                                console.log("form1");
                                webforms_canyonfallshairextensioncompany_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.canyonfallshairextensioncompany.form2;
                                var row_title = config.row_title.canyonfallshairextensioncompany.dev.form2;
                                var webforms = config.webforms.canyonfallshairextensioncompany.dev.form2;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form2;

                                console.log("form2");
                                webforms_canyonfallshairextensioncompany_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.canyonfallshairextensioncompany.live;
                        var wp_creds_username = config.wp_creds.canyonfallshairextensioncompany.username;
                        var wp_creds_password = config.wp_creds.canyonfallshairextensioncompany.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.canyonfallshairextensioncompany.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_canyonfallshairextensioncompany) {
                            case "form1":
                                var forms = config.forms.canyonfallshairextensioncompany.form1;
                                var row_title = config.row_title.canyonfallshairextensioncompany.live.form1;
                                var webforms = config.webforms.canyonfallshairextensioncompany.live.form1;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form1;

                                console.log("form1");
                                webforms_canyonfallshairextensioncompany_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.canyonfallshairextensioncompany.form2;
                                var row_title = config.row_title.canyonfallshairextensioncompany.live.form2;
                                var webforms = config.webforms.canyonfallshairextensioncompany.live.form2;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form2;

                                console.log("form2");
                                webforms_canyonfallshairextensioncompany_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "crexendo":
                var site_crexendo = req.body.site_crexendo;
                var sheetId = config.sheetId.crexendo;
                var ranges = config.ranges.crexendo;
                var range_recipient = config.range_recipient.crexendo;
                var range_thankyou_page = config.range_thankyou_page.crexendo;

                console.log("Site: " + site_crexendo);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.crexendo.dev;
                        var wp_creds_username = config.wp_creds.crexendo.username;
                        var wp_creds_password = config.wp_creds.crexendo.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.crexendo.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_crexendo) {
                            case "form1":
                                var forms = config.forms.crexendo.form1;
                                var row_title = config.row_title.crexendo.dev.form1;
                                var webforms = config.webforms.crexendo.dev.form1;
                                var contact_form_name = config.contact_form_name.crexendo.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form1;

                                console.log("form1");
                                webforms_crexendo_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.crexendo.form2;
                                var row_title = config.row_title.crexendo.dev.form2;
                                var webforms = config.webforms.crexendo.dev.form2;
                                var contact_form_name = config.contact_form_name.crexendo.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form2;

                                console.log("form2");
                                webforms_crexendo_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
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
                    //             webforms_canyonfallshairextensioncompany_f1.index(domain, username, password, email);
                    //             break;
                    //         case "form2":
                    //             console.log("form2");
                    //             webforms_canyonfallshairextensioncompany_f2.index(domain, username, password, email);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "ewingconstruction":
                var site_ewingconstruction = req.body.site_ewingconstruction;
                var sheetId = config.sheetId.ewingconstruction;
                var ranges = config.ranges.ewingconstruction;
                var range_recipient = config.range_recipient.ewingconstruction;
                var range_thankyou_page = config.range_thankyou_page.ewingconstruction;

                console.log("Site: " + site_ewingconstruction);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.ewingconstruction.dev;
                        var wp_creds_username = config.wp_creds.ewingconstruction.username;
                        var wp_creds_password = config.wp_creds.ewingconstruction.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.ewingconstruction.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_ewingconstruction) {
                            case "form1":
                                var forms = config.forms.ewingconstruction.form1;
                                var row_title = config.row_title.ewingconstruction.dev.form1;
                                var webforms = config.webforms.ewingconstruction.dev.form1;
                                var contact_form_name = config.contact_form_name.ewingconstruction.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.ewingconstruction.form1;

                                console.log("form1");
                                webforms_ewingconstruction_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
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
                    //             webforms_canyonfallshairextensioncompany_f1.index(domain, username, password, email);
                    //             break;
                    //         case "form2":
                    //             console.log("form2");
                    //             webforms_canyonfallshairextensioncompany_f2.index(domain, username, password, email);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "indinspect":
                var site_indinspect = req.body.site_indinspect;
                var sheetId = config.sheetId.indinspect;
                var ranges = config.ranges.indinspect;
                var range_recipient = config.range_recipient.indinspect;
                var range_thankyou_page = config.range_thankyou_page.indinspect;

                console.log("Site: " + site_indinspect);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.indinspect.dev;
                        var wp_creds_username = config.wp_creds.indinspect.username;
                        var wp_creds_password = config.wp_creds.indinspect.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.indinspect.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_indinspect) {
                            case "form1":
                                var forms = config.forms.indinspect.form1;
                                var row_title = config.row_title.indinspect.dev.form1;
                                var webforms = config.webforms.indinspect.dev.form1;
                                var contact_form_name = config.contact_form_name.indinspect.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form1;

                                console.log("form1");
                                webforms_indinspect_f1.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            case "form2":
                                var forms = config.forms.indinspect.form2;
                                var row_title = config.row_title.indinspect.dev.form2;
                                var webforms = config.webforms.indinspect.dev.form2;
                                var contact_form_name = config.contact_form_name.indinspect.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form2;

                                console.log("form2");
                                webforms_indinspect_f2.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.indinspect.live;
                        var wp_creds_username = config.wp_creds.indinspect.username;
                        var wp_creds_password = config.wp_creds.indinspect.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.indinspect.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_indinspect) {
                            case "form1":
                                var forms = config.forms.indinspect.form1;
                                var row_title = config.row_title.indinspect.live.form1;
                                var webforms = config.webforms.indinspect.live.form1;
                                var contact_form_name = config.contact_form_name.indinspect.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form1;

                                console.log("form1");
                                webforms_indinspect_f1.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "judefrancesjewelry":
                var site_judefrancesjewelry = req.body.site_judefrancesjewelry;
                var sheetId = config.sheetId.judefrancesjewelry;
                var ranges = config.ranges.judefrancesjewelry;
                var range_recipient = config.range_recipient.judefrancesjewelry;
                var range_thankyou_page = config.range_thankyou_page.judefrancesjewelry;

                console.log("Site: " + site_judefrancesjewelry);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.judefrancesjewelry.dev;
                        var wp_creds_username = config.wp_creds.judefrancesjewelry.username;
                        var wp_creds_password = config.wp_creds.judefrancesjewelry.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.judefrancesjewelry.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_judefrancesjewelry) {
                            case "form1":
                                var forms = config.forms.judefrancesjewelry.form1;
                                var row_title = config.row_title.judefrancesjewelry.dev.form1;
                                var webforms = config.webforms.judefrancesjewelry.dev.form1;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form1;

                                console.log("form1");
                                webforms_judefrancesjewelry_f1.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            case "form2":
                                var row_title = config.row_title.judefrancesjewelry.dev.form2;
                                var webforms = config.webforms.judefrancesjewelry.dev.form2;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form2;

                                console.log("form2");
                                webforms_judefrancesjewelry_f2.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            case "form3":
                                var row_title = config.row_title.judefrancesjewelry.dev.form3;
                                var webforms = config.webforms.judefrancesjewelry.dev.form3;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form3;

                                console.log("form3");
                                webforms_judefrancesjewelry_f3.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            case "form4":
                                var row_title = config.row_title.judefrancesjewelry.dev.form4;
                                var webforms = config.webforms.judefrancesjewelry.dev.form4;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form4;

                                console.log("form4");
                                webforms_judefrancesjewelry_f4.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            case "form5":
                                var row_title = config.row_title.judefrancesjewelry.dev.form5;
                                var webforms = config.webforms.judefrancesjewelry.dev.form5;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form5;

                                console.log("form5");
                                webforms_judefrancesjewelry_f5.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            case "form6":
                                var row_title = config.row_title.judefrancesjewelry.dev.form6;
                                var webforms = config.webforms.judefrancesjewelry.dev.form6;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form6;

                                console.log("form6");
                                webforms_judefrancesjewelry_f6.index(domain, checkbox, username, password, email, timestamp);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = "https://www.indinspect.com/";
                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_indinspect) {
                    //         case "form1":
                    //             console.log("form1");
                    //             webforms_indinspect_f1.index(domain, checkbox, username, password, email, timestamp);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "kyrenefamilydentistry":
                var site_kyrenefamilydentistry = req.body.site_kyrenefamilydentistry;
                var sheetId = config.sheetId.kyrenefamilydentistry;
                var ranges = config.ranges.kyrenefamilydentistry;
                var range_recipient = config.range_recipient.kyrenefamilydentistry;
                var range_thankyou_page = config.range_thankyou_page.kyrenefamilydentistry;
                
                console.log("Site: " + site_kyrenefamilydentistry);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.kyrenefamilydentistry.dev;
                        var wp_creds_username = config.wp_creds.kyrenefamilydentistry.username;
                        var wp_creds_password = config.wp_creds.kyrenefamilydentistry.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.kyrenefamilydentistry.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_kyrenefamilydentistry) {
                            case "form1":
                                var forms = config.forms.kyrenefamilydentistry.form1;
                                var row_title = config.row_title.kyrenefamilydentistry.dev.form1;
                                var webforms = config.webforms.kyrenefamilydentistry.dev.form1;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form1;

                                console.log("form1");
                                webforms_kyrenefamilydentistry_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.kyrenefamilydentistry.form2;
                                var row_title = config.row_title.kyrenefamilydentistry.dev.form2;
                                var webforms = config.webforms.kyrenefamilydentistry.dev.form2;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form2;

                                console.log("form2");
                                webforms_kyrenefamilydentistry_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.kyrenefamilydentistry.live;
                        var wp_creds_username = config.wp_creds.kyrenefamilydentistry.username;
                        var wp_creds_password = config.wp_creds.kyrenefamilydentistry.password;
                        var launch = config.launch.live;
                        var wp_menu_name = config.wp_menu_name.kyrenefamilydentistry.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_kyrenefamilydentistry) {
                            case "form1":
                                var forms = config.forms.kyrenefamilydentistry.form1;
                                var row_title = config.row_title.kyrenefamilydentistry.live.form1;
                                var webforms = config.webforms.kyrenefamilydentistry.live.form1;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form1;

                                console.log("form1");
                                webforms_kyrenefamilydentistry_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.kyrenefamilydentistry.form2;
                                var row_title = config.row_title.kyrenefamilydentistry.live.form2;
                                var webforms = config.webforms.kyrenefamilydentistry.live.form2;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form2;

                                console.log("form2");
                                webforms_kyrenefamilydentistry_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "optimizex":
                var site_optimizex = req.body.site_optimizex;
                var sheetId = config.sheetId.optimizex;
                var ranges = config.ranges.optimizex;
                var range_recipient = config.range_recipient.optimizex;
                var range_thankyou_page = config.range_thankyou_page.optimizex;

                console.log("Site: " + site_optimizex);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.optimizex.dev;
                        var wp_creds_username = config.wp_creds.optimizex.username;
                        var wp_creds_password = config.wp_creds.optimizex.password;
                        var launch = config.launch.dev;
                        var wp_menu_name = config.wp_menu_name.optimizex.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_optimizex) {
                            case "form1":
                                var forms = config.forms.optimizex.form1;
                                var row_title = config.row_title.optimizex.dev.form1;
                                var webforms = config.webforms.optimizex.dev.form1;
                                var contact_form_name = config.contact_form_name.optimizex.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form1;

                                console.log("form1");
                                webforms_optimizex_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.optimizex.form2;
                                var row_title = config.row_title.optimizex.dev.form2;
                                var webforms = config.webforms.optimizex.dev.form2;
                                var contact_form_name = config.contact_form_name.optimizex.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form2;

                                console.log("form2");
                                webforms_optimizex_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.optimizex.form3;
                                var row_title = config.row_title.optimizex.dev.form3;
                                var webforms = config.webforms.optimizex.dev.form3;
                                var contact_form_name = config.contact_form_name.optimizex.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form3;

                                console.log("form3");
                                webforms_optimizex_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = "https://www.kyrenefamilydentistry.com/";
                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_kyrenefamilydentistry) {
                    //         case "form1":
                    //             console.log("form1");
                    //             webforms_kyrenefamilydentistry_live_f1.index(domain, checkbox, username, password, email, timestamp);
                    //             break;
                    //         case "form2":
                    //             console.log("form2");
                    //             webforms_kyrenefamilydentistry_live_f2.index(domain, checkbox, username, password, email, timestamp);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
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
                        responsiveness_desktop1.windows11(url, email, password, timestamp);
                        break;
                    case "version2":
                        responsiveness_desktop2.windows8(url, email, password, timestamp);
                        break;
                    case "version3":
                        responsiveness_desktop3.windows7(url, email, password, timestamp);
                        break;
                    case "version4":
                        responsiveness_desktop4.macos_sierra(url, email, password, timestamp);
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
                        responsiveness_mobile1.samsung_galaxy_m30s(url, email, password, timestamp);
                        break;
                    case "version2":
                        responsiveness_mobile2.google_pixel_5(url, email, password, timestamp);
                        break;
                    case "version3":
                        responsiveness_mobile3.oneplus_9(url, email, password, timestamp);
                        break;
                    case "version4":
                        responsiveness_mobile4.xiaomi_mi_11(url, email, password, timestamp);
                        break;
                    case "version5":
                        responsiveness_mobile5.realme_5(url, email, password, timestamp);
                        break;
                    case "version6":
                        responsiveness_mobile6.huawei_p30_pro(url, email, password, timestamp);
                        break;
                    case "version7":
                        responsiveness_mobile7.sony_xperia_xz2(url, email, password, timestamp);
                        break;
                    case "version8":
                        responsiveness_mobile8.moto_g6(url, email, password, timestamp);
                        break;
                    case "version9":
                        responsiveness_mobile9.lg_g6(url, email, password, timestamp);
                        break;
                    case "version10":
                        responsiveness_mobile10.iphone_13_pro_max(url, email, password, timestamp);
                        break;
                    case "version11":
                        responsiveness_mobile11.iphone_13_pro(url, email, password, timestamp);
                        break;
                    case "version12":
                        responsiveness_mobile12.iphone_13(url, email, password, timestamp);
                        break;
                    case "version13":
                        responsiveness_mobile13.iphone_12_pro_max(url, email, password, timestamp);
                        break;
                    case "version14":
                        responsiveness_mobile14.iphone_11_pro_max(url, email, password, timestamp);
                        break;
                    case "version15":
                        responsiveness_mobile15.iphone_x(url, email, password, timestamp);
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
                        responsiveness_tablet1.ipad_air_4th_gen(url, email, password, timestamp);
                        break;
                    case "version2":
                        responsiveness_tablet2.galaxy_tab_s7_plus(url, email, password, timestamp);
                        break;
                    case "version3":
                        responsiveness_tablet3.galaxy_tab_s6(url, email, password, timestamp);
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


