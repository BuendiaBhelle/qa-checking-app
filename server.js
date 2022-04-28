require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('file-system');
const logger = require("./middleware/logger.js");
const sheet = require('./middleware/gsheet.js');
const config = require("./config");
const express = require('express');
app.use(express.static(__dirname + '/public'));
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
const webforms_freddabranyon_f1 = require("./modules/webforms/contactform7/forms/freddabranyon/form1/index");
const webforms_frlawgroup_f1 = require("./modules/webforms/contactform7/forms/frlawgroup/form1/index");
const webforms_frlawgroup_f2 = require("./modules/webforms/contactform7/forms/frlawgroup/form2/index");
const webforms_frlawgroup_f3 = require("./modules/webforms/contactform7/forms/frlawgroup/form3/index");
const webforms_indinspect_f1 = require("./modules/webforms/contactform7/forms/indinspect/form1/index");
const webforms_indinspect_f2 = require("./modules/webforms/contactform7/forms/indinspect/form2/index");
const webforms_judefrancesjewelry_f1 = require("./modules/webforms/gravityform/forms/judefrancesjewelry/form1/index");
const webforms_judefrancesjewelry_f2 = require("./modules/webforms/gravityform/forms/judefrancesjewelry/form2/index");
const webforms_judefrancesjewelry_f3 = require("./modules/webforms/gravityform/forms/judefrancesjewelry/form3/index");
const webforms_judefrancesjewelry_f4 = require("./modules/webforms/gravityform/forms/judefrancesjewelry/form4/index");
const webforms_judefrancesjewelry_f5 = require("./modules/webforms/gravityform/forms/judefrancesjewelry/form5/index");
const webforms_judefrancesjewelry_f6 = require("./modules/webforms/gravityform/forms/judefrancesjewelry/form6/index");
const webforms_kyrenefamilydentistry_f1 = require("./modules/webforms/contactform7/forms/kyrenefamilydentistry/form1/index");
const webforms_kyrenefamilydentistry_f2 = require("./modules/webforms/contactform7/forms/kyrenefamilydentistry/form2/index");
const webforms_lignans_f1 = require("./modules/webforms/contactform7/forms/lignans/form1/index")
const webforms_natina_f1 = require("./modules/webforms/contactform7/forms/natina/form1/index");
const webforms_newhopemedicalcenter_f1 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form1/index");
const webforms_newhopemedicalcenter_f2 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form2/index");
const webforms_newhopemedicalcenter_f3 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form3/index");
const webforms_newhopemedicalcenter_f4 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form4/index");
const webforms_newhopemedicalcenter_f5 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form5/index");
const webforms_newhopemedicalcenter_f6 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form6/index");
const webforms_newhopemedicalcenter_f7 = require("./modules/webforms/gravityform/forms/newhopemedicalcenter/form7/index");
const webforms_optimizex_f1 = require("./modules/webforms/contactform7/forms/optimizex/form1/index");
const webforms_optimizex_f2 = require("./modules/webforms/contactform7/forms/optimizex/form2/index");
const webforms_optimizex_f3 = require("./modules/webforms/contactform7/forms/optimizex/form3/index");
const webforms_phoenixritecare_f1 = require("./modules/webforms/contactform7/forms/phoenixritecare/form1/index");
const webforms_phoenixritecare_f2 = require("./modules/webforms/contactform7/forms/phoenixritecare/form2/index");
const webforms_phoenixritecare_f3 = require("./modules/webforms/contactform7/forms/phoenixritecare/form3/index");
const webforms_phoenixritecare_f4 = require("./modules/webforms/contactform7/forms/phoenixritecare/form4/index");
const webforms_phoenixritecare_f5 = require("./modules/webforms/contactform7/forms/phoenixritecare/form5/index");
const webforms_phoenixritecare_f6 = require("./modules/webforms/contactform7/forms/phoenixritecare/form6/index");
const webforms_phoenixritecare_f7 = require("./modules/webforms/contactform7/forms/phoenixritecare/form7/index");
const webforms_phoenixritecare_f8 = require("./modules/webforms/contactform7/forms/phoenixritecare/form8/index");
const webforms_phoenixritecare_f9 = require("./modules/webforms/contactform7/forms/phoenixritecare/form9/index");
const webforms_primemedicalpain_f1 = require("./modules/webforms/contactform7/forms/primemedicalpain/form1/index");
const webforms_primemedicalpain_f2 = require("./modules/webforms/contactform7/forms/primemedicalpain/form2/index");
const webforms_primeview_f1 = require("./modules/webforms/contactform7/forms/primeview/form1/index");
const webforms_primeview_f2 = require("./modules/webforms/contactform7/forms/primeview/form2/index");
const webforms_primeview_f3 = require("./modules/webforms/contactform7/forms/primeview/form3/index");
const webforms_primeview_f4 = require("./modules/webforms/contactform7/forms/primeview/form4/index");
const webforms_primeview_f5 = require("./modules/webforms/contactform7/forms/primeview/form5/index");
const webforms_primeview_f6 = require("./modules/webforms/contactform7/forms/primeview/form6/index");
const webforms_primeview_f7 = require("./modules/webforms/contactform7/forms/primeview/form7/index");
const webforms_randosouthwest_f1 = require("./modules/webforms/contactform7/forms/randosouthwest/form1/index");
const webforms_sellusyourcaraz_f1 = require("./modules/webforms/contactform7/forms/sellusyourcaraz/form1/index");
const webforms_sellusyourcaraz_f2 = require("./modules/webforms/contactform7/forms/sellusyourcaraz/form2/index");
const webforms_sellusyourcaraz_f3 = require("./modules/webforms/contactform7/forms/sellusyourcaraz/form3/index");
const webforms_sunrisejewelryusa_f1 = require("./modules/webforms/contactform7/forms/sunrisejewelryusa/form1/index");
const webforms_versatile_f1 = require("./modules/webforms/contactform7/forms/versatile/form1/index");
const webforms_versatile_f2 = require("./modules/webforms/contactform7/forms/versatile/form2/index");
const webforms_versatile_f3 = require("./modules/webforms/contactform7/forms/versatile/form3/index");
const webforms_versatile_f4 = require("./modules/webforms/contactform7/forms/versatile/form4/index");
const webforms_solutionsforum_f1 = require("./modules/webforms/contactform7/forms/solutionsforum/form1/index");

const responsiveness_desktop_lambdatest = require("./modules/responsiveness/desktop/desktop");
const responsiveness_desktop_manual = require("./modules/responsiveness/desktop/manual");
const responsiveness_mobile = require("./modules/responsiveness/mobile/mobile");
const responsiveness_tablet = require("./modules/responsiveness/tablet/tablet");
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
                                checkout_sunrisejewelryusa_dev_p1.index(domain, username, password, email, timestamp);
                                break;
                            case "product2":
                                console.log("checkout: " + checkout);
                                console.log("product2 selected.");
                                checkout_sunrisejewelryusa_dev_p2.index(domain, username, password, email, timestamp);
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
        // await visibility.edge(site_name, timestamp);
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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_accidentchiropracticaz);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.accidentchiropracticaz.dev;
                        var wp_creds_username = config.wp_creds.accidentchiropracticaz.username;
                        var wp_creds_password = config.wp_creds.accidentchiropracticaz.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_advancedimagemedspa);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.advancedimagemedspa.dev;
                        var wp_creds_username = config.wp_creds.advancedimagemedspa.username;
                        var wp_creds_password = config.wp_creds.advancedimagemedspa.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_aerialengagement);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.aerialengagement.dev;
                        var wp_creds_username = config.wp_creds.aerialengagement.username;
                        var wp_creds_password = config.wp_creds.aerialengagement.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_americanleatherusa);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.americanleatherusa.dev;
                        var wp_creds_username = config.wp_creds.americanleatherusa.username;
                        var wp_creds_password = config.wp_creds.americanleatherusa.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_andresperezjurado);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.andresperezjurado.dev;
                        var wp_creds_username = config.wp_creds.andresperezjurado.username;
                        var wp_creds_password = config.wp_creds.andresperezjurado.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_azdoordoctor);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.azdoordoctor.dev;
                        var wp_creds_username = config.wp_creds.azdoordoctor.username;
                        var wp_creds_password = config.wp_creds.azdoordoctor.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_biltmoreloanandjewelry);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.biltmoreloanandjewelry.dev;
                        var wp_creds_username = config.wp_creds.biltmoreloanandjewelry.username;
                        var wp_creds_password = config.wp_creds.biltmoreloanandjewelry.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_buckeyederm);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.buckeyederm.dev;
                        var wp_creds_username = config.wp_creds.buckeyederm.username;
                        var wp_creds_password = config.wp_creds.buckeyederm.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_canyonfallshairextensioncompany);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.canyonfallshairextensioncompany.dev;
                        var wp_creds_username = config.wp_creds.canyonfallshairextensioncompany.username;
                        var wp_creds_password = config.wp_creds.canyonfallshairextensioncompany.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_crexendo);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.crexendo.dev;
                        var wp_creds_username = config.wp_creds.crexendo.username;
                        var wp_creds_password = config.wp_creds.crexendo.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_ewingconstruction);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.ewingconstruction.dev;
                        var wp_creds_username = config.wp_creds.ewingconstruction.username;
                        var wp_creds_password = config.wp_creds.ewingconstruction.password;
                        var launch = config.launch.dev;

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
                    case "live":
                        var domain = config.domain.ewingconstruction.live;
                        var wp_creds_username = config.wp_creds.ewingconstruction.username;
                        var wp_creds_password = config.wp_creds.ewingconstruction.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_ewingconstruction) {
                            case "form1":
                                var forms = config.forms.ewingconstruction.form1;
                                var row_title = config.row_title.ewingconstruction.live.form1;
                                var webforms = config.webforms.ewingconstruction.live.form1;
                                var contact_form_name = config.contact_form_name.ewingconstruction.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.ewingconstruction.form1;

                                console.log("form1");
                                webforms_ewingconstruction_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "freddabranyon":
                var site_freddabranyon = req.body.site_freddabranyon;
                var sheetId = config.sheetId.freddabranyon;
                var ranges = config.ranges.freddabranyon;
                var range_recipient = config.range_recipient.freddabranyon;
                var range_thankyou_page = config.range_thankyou_page.freddabranyon;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_freddabranyon);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.freddabranyon.dev;
                        var wp_creds_username = config.wp_creds.freddabranyon.username;
                        var wp_creds_password = config.wp_creds.freddabranyon.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_freddabranyon) {
                            case "form1":
                                var forms = config.forms.freddabranyon.form1;
                                var row_title = config.row_title.freddabranyon.dev.form1;
                                var webforms = config.webforms.freddabranyon.dev.form1;
                                var contact_form_name = config.contact_form_name.freddabranyon.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.freddabranyon.form1;

                                console.log("form1");
                                webforms_freddabranyon_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.freddabranyon.live;
                        var wp_creds_username = config.wp_creds.freddabranyon.username;
                        var wp_creds_password = config.wp_creds.freddabranyon.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_freddabranyon) {
                            case "form1":
                                var forms = config.forms.freddabranyon.form1;
                                var row_title = config.row_title.freddabranyon.live.form1;
                                var webforms = config.webforms.freddabranyon.live.form1;
                                var contact_form_name = config.contact_form_name.freddabranyon.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.freddabranyon.form1;

                                console.log("form1");
                                webforms_freddabranyon_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "frlawgroup":
                var site_frlawgroup = req.body.site_frlawgroup;
                var sheetId = config.sheetId.frlawgroup;
                var ranges = config.ranges.frlawgroup;
                var range_recipient = config.range_recipient.frlawgroup;
                var range_thankyou_page = config.range_thankyou_page.frlawgroup;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_frlawgroup);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.frlawgroup.dev;
                        var wp_creds_username = config.wp_creds.frlawgroup.username;
                        var wp_creds_password = config.wp_creds.frlawgroup.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_frlawgroup) {
                            case "form1":
                                var forms = config.forms.frlawgroup.form1;
                                var row_title = config.row_title.frlawgroup.dev.form1;
                                var webforms = config.webforms.frlawgroup.dev.form1;
                                var contact_form_name = config.contact_form_name.frlawgroup.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form1;

                                console.log("form1");
                                webforms_frlawgroup_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.frlawgroup.form2;
                                var row_title = config.row_title.frlawgroup.dev.form2;
                                var webforms = config.webforms.frlawgroup.dev.form2;
                                var contact_form_name = config.contact_form_name.frlawgroup.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form2;

                                console.log("form2");
                                webforms_frlawgroup_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.frlawgroup.form3;
                                var row_title = config.row_title.frlawgroup.dev.form3;
                                var webforms = config.webforms.frlawgroup.dev.form3;
                                var contact_form_name = config.contact_form_name.frlawgroup.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form3;

                                console.log("form3");
                                webforms_frlawgroup_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.frlawgroup.live;
                        var wp_creds_username = config.wp_creds.frlawgroup.username;
                        var wp_creds_password = config.wp_creds.frlawgroup.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_frlawgroup) {
                            case "form1":
                                var forms = config.forms.frlawgroup.form1;
                                var row_title = config.row_title.frlawgroup.live.form1;
                                var webforms = config.webforms.frlawgroup.live.form1;
                                var contact_form_name = config.contact_form_name.frlawgroup.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form1;

                                console.log("form1");
                                webforms_frlawgroup_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.frlawgroup.form2;
                                var row_title = config.row_title.frlawgroup.live.form2;
                                var webforms = config.webforms.frlawgroup.live.form2;
                                var contact_form_name = config.contact_form_name.frlawgroup.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form2;

                                console.log("form2");
                                webforms_frlawgroup_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.frlawgroup.form3;
                                var row_title = config.row_title.frlawgroup.live.form3;
                                var webforms = config.webforms.frlawgroup.live.form3;
                                var contact_form_name = config.contact_form_name.frlawgroup.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form3;

                                console.log("form3");
                                webforms_frlawgroup_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "primemedicalpain":
                var site_primemedicalpain = req.body.site_primemedicalpain;
                var sheetId = config.sheetId.primemedicalpain;
                var ranges = config.ranges.primemedicalpain;
                var range_recipient = config.range_recipient.primemedicalpain;
                var range_thankyou_page = config.range_thankyou_page.primemedicalpain;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_primemedicalpain);
                switch (checkbox) {
                    // case "dev":
                    //     var domain = config.domain.primemedicalpain.dev;
                    //     var wp_creds_username = config.wp_creds.primemedicalpain.username;
                    //     var wp_creds_password = config.wp_creds.primemedicalpain.password;
                    //     var launch = config.launch.dev;

                    //     console.log(domain);
                    //     console.log("dev");
                    //     switch (site_primemedicalpain) {
                    //         case "form1":
                    //             var forms = config.forms.primemedicalpain.form1;
                    //             var row_title = config.row_title.primemedicalpain.dev.form1;
                    //             var webforms = config.webforms.primemedicalpain.dev.form1;
                    //             var contact_form_name = config.contact_form_name.primemedicalpain.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form1;

                    //             console.log("form1");
                    //             webforms_primemedicalpain_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         case "form2":
                    //             var forms = config.forms.primemedicalpain.form2;
                    //             var row_title = config.row_title.primemedicalpain.dev.form2;
                    //             var webforms = config.webforms.primemedicalpain.dev.form2;
                    //             var contact_form_name = config.contact_form_name.primemedicalpain.form2;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form2;

                    //             console.log("form2");
                    //             webforms_primemedicalpain_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                    case "live":
                        var domain = config.domain.primemedicalpain.live;
                        var wp_creds_username = config.wp_creds.primemedicalpain.username;
                        var wp_creds_password = config.wp_creds.primemedicalpain.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_primemedicalpain) {
                            case "form1":
                                var forms = config.forms.primemedicalpain.form1;
                                var row_title = config.row_title.primemedicalpain.live.form1;
                                var webforms = config.webforms.primemedicalpain.live.form1;
                                var contact_form_name = config.contact_form_name.primemedicalpain.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form1;

                                console.log("form1");
                                webforms_primemedicalpain_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.primemedicalpain.form2;
                                var row_title = config.row_title.primemedicalpain.live.form2;
                                var webforms = config.webforms.primemedicalpain.live.form2;
                                var contact_form_name = config.contact_form_name.primemedicalpain.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form2;

                                console.log("form2");
                                webforms_primemedicalpain_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "primeview":
                var site_primeview = req.body.site_primeview;
                var sheetId = config.sheetId.primeview;
                var ranges = config.ranges.primeview;
                var range_recipient = config.range_recipient.primeview;
                var range_thankyou_page = config.range_thankyou_page.primeview;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_primeview);
                switch (checkbox) {
                    // case "dev":
                    //     var domain = config.domain.primeview.dev;
                    //     var wp_creds_username = config.wp_creds.primeview.username;
                    //     var wp_creds_password = config.wp_creds.primeview.password;
                    //     var launch = config.launch.dev;

                    //     console.log(domain);
                    //     console.log("dev");
                    //     switch (site_primeview) {
                    //         case "form1":
                    //             var forms = config.forms.primeview.form1;
                    //             var row_title = config.row_title.primeview.dev.form1;
                    //             var webforms = config.webforms.primeview.dev.form1;
                    //             var contact_form_name = config.contact_form_name.primeview.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primeview.form1;

                    //             console.log("form1");
                    //             webforms_primeview_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         case "form2":
                    //             var forms = config.forms.primeview.form2;
                    //             var row_title = config.row_title.primeview.dev.form2;
                    //             var webforms = config.webforms.primeview.dev.form2;
                    //             var contact_form_name = config.contact_form_name.primeview.form2;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primeview.form2;

                    //             console.log("form2");
                    //             webforms_primeview_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                    case "live":
                        var domain = config.domain.primeview.live;
                        var wp_creds_username = config.wp_creds.primeview.username;
                        var wp_creds_password = config.wp_creds.primeview.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_primeview) {
                            case "form1":
                                var forms = config.forms.primeview.form1;
                                var row_title = config.row_title.primeview.live.form1;
                                var webforms = config.webforms.primeview.live.form1;
                                var contact_form_name = config.contact_form_name.primeview.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form1;

                                console.log("form1");
                                webforms_primeview_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.primeview.form2;
                                var row_title = config.row_title.primeview.live.form2;
                                var webforms = config.webforms.primeview.live.form2;
                                var contact_form_name = config.contact_form_name.primeview.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form2;

                                console.log("form2");
                                webforms_primeview_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.primeview.form3;
                                var row_title = config.row_title.primeview.live.form3;
                                var webforms = config.webforms.primeview.live.form3;
                                var contact_form_name = config.contact_form_name.primeview.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form3;

                                console.log("form3");
                                webforms_primeview_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form4":
                                var forms = config.forms.primeview.form4;
                                var row_title = config.row_title.primeview.live.form4;
                                var webforms = config.webforms.primeview.live.form4;
                                var contact_form_name = config.contact_form_name.primeview.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form4;

                                console.log("form4");
                                webforms_primeview_f4.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form5":
                                var forms = config.forms.primeview.form5;
                                var row_title = config.row_title.primeview.live.form5;
                                var webforms = config.webforms.primeview.live.form5;
                                var contact_form_name = config.contact_form_name.primeview.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form5;

                                console.log("form5");
                                webforms_primeview_f5.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form6":
                                var forms = config.forms.primeview.form6;
                                var row_title = config.row_title.primeview.live.form6;
                                var webforms = config.webforms.primeview.live.form6;
                                var contact_form_name = config.contact_form_name.primeview.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form6;

                                console.log("form6");
                                webforms_primeview_f6.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form7":
                                var forms = config.forms.primeview.form7;
                                var row_title = config.row_title.primeview.live.form7;
                                var webforms = config.webforms.primeview.live.form7;
                                var contact_form_name = config.contact_form_name.primeview.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form7;

                                console.log("form7");
                                webforms_primeview_f7.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                                default:
                        }
                        break;
                }
                break;
            case "randosouthwest":
                var site_randosouthwest = req.body.site_randosouthwest;
                var sheetId = config.sheetId.randosouthwest;
                var ranges = config.ranges.randosouthwest;
                var range_recipient = config.range_recipient.randosouthwest;
                var range_thankyou_page = config.range_thankyou_page.randosouthwest;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_randosouthwest);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.randosouthwest.dev;
                        var wp_creds_username = config.wp_creds.randosouthwest.username;
                        var wp_creds_password = config.wp_creds.randosouthwest.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_randosouthwest) {
                            case "form1":
                                var forms = config.forms.randosouthwest.form1;
                                var row_title = config.row_title.randosouthwest.dev.form1;
                                var webforms = config.webforms.randosouthwest.dev.form1;
                                var contact_form_name = config.contact_form_name.randosouthwest.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.randosouthwest.form1;

                                console.log("form1");
                                webforms_randosouthwest_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.randosouthwest.live;
                        var wp_creds_username = config.wp_creds.randosouthwest.username;
                        var wp_creds_password = config.wp_creds.randosouthwest.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_randosouthwest) {
                            case "form1":
                                var forms = config.forms.randosouthwest.form1;
                                var row_title = config.row_title.randosouthwest.live.form1;
                                var webforms = config.webforms.randosouthwest.live.form1;
                                var contact_form_name = config.contact_form_name.randosouthwest.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.randosouthwest.form1;

                                console.log("form1");
                                webforms_randosouthwest_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "indinspect":
                var site_indinspect = req.body.site_indinspect;
                var sheetId = config.sheetId.indinspect;
                var ranges = config.ranges.indinspect;
                var range_recipient = config.range_recipient.indinspect;
                var range_thankyou_page = config.range_thankyou_page.indinspect;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_indinspect);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.indinspect.dev;
                        var wp_creds_username = config.wp_creds.indinspect.username;
                        var wp_creds_password = config.wp_creds.indinspect.password;
                        var launch = config.launch.dev;

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
                var wp_menu_name = config.wp_menu_name.gravity_forms;

                console.log("Site: " + site_judefrancesjewelry);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.judefrancesjewelry.dev;
                        var wp_creds_username = config.wp_creds.judefrancesjewelry.username;
                        var wp_creds_password = config.wp_creds.judefrancesjewelry.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_judefrancesjewelry) {
                            case "form1":
                                var forms = config.forms.judefrancesjewelry.form1;
                                var row_title = config.row_title.judefrancesjewelry.dev.form1;
                                var settings_arr = config.settings_arr.judefrancesjewelry.dev.form1;
                                var admin_notif = config.admin_notif.judefrancesjewelry.dev.form1;
                                var qa_notif = config.qa_notif.judefrancesjewelry.dev.form1;
                                var webforms = config.webforms.judefrancesjewelry.dev.form1;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form1;
                                var form_page = config.form_page.judefrancesjewelry.dev.form1;

                                console.log("form1");
                                webforms_judefrancesjewelry_f1.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form2":
                                var forms = config.forms.judefrancesjewelry.form2;
                                var row_title = config.row_title.judefrancesjewelry.dev.form2;
                                var settings_arr = config.settings_arr.judefrancesjewelry.dev.form2;
                                var admin_notif = config.admin_notif.judefrancesjewelry.dev.form2;
                                var qa_notif = config.qa_notif.judefrancesjewelry.dev.form2;
                                var webforms = config.webforms.judefrancesjewelry.dev.form2;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form2;
                                var form_page = config.form_page.judefrancesjewelry.dev.form2;

                                console.log("form2");
                                webforms_judefrancesjewelry_f2.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form3":
                                var forms = config.forms.judefrancesjewelry.form3;
                                var row_title = config.row_title.judefrancesjewelry.dev.form3;
                                var settings_arr = config.settings_arr.judefrancesjewelry.dev.form3;
                                var admin_notif = config.admin_notif.judefrancesjewelry.dev.form3;
                                var qa_notif = config.qa_notif.judefrancesjewelry.dev.form3;
                                var webforms = config.webforms.judefrancesjewelry.dev.form3;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form3;
                                var form_page = config.form_page.judefrancesjewelry.dev.form3;

                                console.log("form3");
                                webforms_judefrancesjewelry_f3.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form4":
                                var forms = config.forms.judefrancesjewelry.form4;
                                var row_title = config.row_title.judefrancesjewelry.dev.form4;
                                var settings_arr = config.settings_arr.judefrancesjewelry.dev.form4;
                                var admin_notif = config.admin_notif.judefrancesjewelry.dev.form4;
                                var qa_notif = config.qa_notif.judefrancesjewelry.dev.form4;
                                var webforms = config.webforms.judefrancesjewelry.dev.form4;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form4;
                                var form_page = config.form_page.judefrancesjewelry.dev.form4;

                                console.log("form4");
                                webforms_judefrancesjewelry_f4.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form5":
                                var forms = config.forms.judefrancesjewelry.form5;
                                var row_title = config.row_title.judefrancesjewelry.dev.form5;
                                var settings_arr = config.settings_arr.judefrancesjewelry.dev.form5;
                                var admin_notif = config.admin_notif.judefrancesjewelry.dev.form5;
                                var qa_notif = config.qa_notif.judefrancesjewelry.dev.form5;
                                var webforms = config.webforms.judefrancesjewelry.dev.form5;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form5;
                                var form_page = config.form_page.judefrancesjewelry.dev.form5;

                                console.log("form5");
                                webforms_judefrancesjewelry_f5.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form6":
                                var forms = config.forms.judefrancesjewelry.form6;
                                var row_title = config.row_title.judefrancesjewelry.dev.form6;
                                var settings_arr = config.settings_arr.judefrancesjewelry.dev.form6;
                                var admin_notif = config.admin_notif.judefrancesjewelry.dev.form6;
                                var qa_notif = config.qa_notif.judefrancesjewelry.dev.form6;
                                var webforms = config.webforms.judefrancesjewelry.dev.form6;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form6;
                                var form_page = config.form_page.judefrancesjewelry.dev.form6;

                                console.log("form6");
                                webforms_judefrancesjewelry_f6.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
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
                var wp_menu_name = config.wp_menu_name.contact_form_7;
                
                console.log("Site: " + site_kyrenefamilydentistry);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.kyrenefamilydentistry.dev;
                        var wp_creds_username = config.wp_creds.kyrenefamilydentistry.username;
                        var wp_creds_password = config.wp_creds.kyrenefamilydentistry.password;
                        var launch = config.launch.dev;

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
            case "lignans":
                var site_lignans = req.body.site_lignans;
                var sheetId = config.sheetId.lignans;
                var ranges = config.ranges.lignans;
                var range_recipient = config.range_recipient.lignans;
                var range_thankyou_page = config.range_thankyou_page.lignans;
                var wp_menu_name = config.wp_menu_name.contact_form_7;
                
                console.log("Site: " + site_lignans);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.lignans.dev;
                        var wp_creds_username = config.wp_creds.lignans.username;
                        var wp_creds_password = config.wp_creds.lignans.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_lignans) {
                            case "form1":
                                var forms = config.forms.lignans.form1;
                                var row_title = config.row_title.lignans.dev.form1;
                                var webforms = config.webforms.lignans.dev.form1;
                                var contact_form_name = config.contact_form_name.lignans.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.lignans.form1;

                                console.log("form1");
                                webforms_lignans_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = config.domain.lignans.live;
                    //     var wp_creds_username = config.wp_creds.lignans.username;
                    //     var wp_creds_password = config.wp_creds.lignans.password;
                    //     var launch = config.launch.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_lignans) {
                    //         case "form1":
                    //             var forms = config.forms.lignans.form1;
                    //             var row_title = config.row_title.lignans.live.form1;
                    //             var webforms = config.webforms.lignans.live.form1;
                    //             var contact_form_name = config.contact_form_name.lignans.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.lignans.form1;

                    //             console.log("form1");
                    //             webforms_lignans_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "natina":
                var site_natina = req.body.site_natina;
                var sheetId = config.sheetId.natina;
                var ranges = config.ranges.natina;
                var range_recipient = config.range_recipient.natina;
                var range_thankyou_page = config.range_thankyou_page.natina;
                var wp_menu_name = config.wp_menu_name.contact_form_7;
                
                console.log("Site: " + site_natina);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.natina.dev;
                        var wp_creds_username = config.wp_creds.natina.username;
                        var wp_creds_password = config.wp_creds.natina.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_natina) {
                            case "form1":
                                var forms = config.forms.natina.form1;
                                var row_title = config.row_title.natina.dev.form1;
                                var webforms = config.webforms.natina.dev.form1;
                                var contact_form_name = config.contact_form_name.natina.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.natina.form1;

                                console.log("form1");
                                webforms_natina_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = config.domain.natina.live;
                    //     var wp_creds_username = config.wp_creds.natina.username;
                    //     var wp_creds_password = config.wp_creds.natina.password;
                    //     var launch = config.launch.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_natina) {
                    //         case "form1":
                    //             var forms = config.forms.natina.form1;
                    //             var row_title = config.row_title.natina.live.form1;
                    //             var webforms = config.webforms.natina.live.form1;
                    //             var contact_form_name = config.contact_form_name.natina.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.natina.form1;

                    //             console.log("form1");
                    //             webforms_natina_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "newhopemedicalcenter":
                var site_newhopemedicalcenter = req.body.site_newhopemedicalcenter;
                var sheetId = config.sheetId.newhopemedicalcenter;
                var ranges = config.ranges.newhopemedicalcenter;
                var range_recipient = config.range_recipient.newhopemedicalcenter;
                var range_thankyou_page = config.range_thankyou_page.newhopemedicalcenter;
                var wp_menu_name = config.wp_menu_name.gravity_forms;
                
                console.log("Site: " + site_newhopemedicalcenter);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.newhopemedicalcenter.dev;
                        var wp_creds_username = config.wp_creds.newhopemedicalcenter.username;
                        var wp_creds_password = config.wp_creds.newhopemedicalcenter.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_newhopemedicalcenter) {
                            case "form1":
                                var forms = config.forms.newhopemedicalcenter.form1;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form1;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form1;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form1;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form1;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form1;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form1;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form1;

                                console.log("form1");
                                webforms_newhopemedicalcenter_f1.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form2":
                                var forms = config.forms.newhopemedicalcenter.form2;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form2;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form2;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form2;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form2;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form2;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form2;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form2;

                                console.log("form2");
                                webforms_newhopemedicalcenter_f2.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form3":
                                var forms = config.forms.newhopemedicalcenter.form3;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form3;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form3;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form3;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form3;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form3;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form3;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form3;

                                console.log("form3");
                                webforms_newhopemedicalcenter_f3.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form4":
                                var forms = config.forms.newhopemedicalcenter.form4;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form4;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form4;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form4;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form4;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form4;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form4;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form4;

                                console.log("form4");
                                webforms_newhopemedicalcenter_f4.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form5":
                                var forms = config.forms.newhopemedicalcenter.form5;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form5;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form5;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form5;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form5;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form5;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form5;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form5;

                                console.log("form5");
                                webforms_newhopemedicalcenter_f5.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form6":
                                var forms = config.forms.newhopemedicalcenter.form6;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form6;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form6;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form6;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form6;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form6;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form6;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form6;

                                console.log("form6");
                                webforms_newhopemedicalcenter_f6.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form7":
                                var forms = config.forms.newhopemedicalcenter.form7;
                                var row_title = config.row_title.newhopemedicalcenter.dev.form7;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.dev.form7;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.dev.form7;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.dev.form7;
                                var webforms = config.webforms.newhopemedicalcenter.dev.form7;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form7;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form7;

                                console.log("form7");
                                webforms_newhopemedicalcenter_f7.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.newhopemedicalcenter.live;
                        var wp_creds_username = config.wp_creds.newhopemedicalcenter.username;
                        var wp_creds_password = config.wp_creds.newhopemedicalcenter.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_newhopemedicalcenter) {
                            case "form1":
                                var forms = config.forms.newhopemedicalcenter.form1;
                                var row_title = config.row_title.newhopemedicalcenter.live.form1;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form1;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form1;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form1;
                                var webforms = config.webforms.newhopemedicalcenter.live.form1;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form1;
                                var form_page = config.form_page.newhopemedicalcenter.live.form1;

                                console.log("form1");
                                webforms_newhopemedicalcenter_f1.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form2":
                                var forms = config.forms.newhopemedicalcenter.form2;
                                var row_title = config.row_title.newhopemedicalcenter.live.form2;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form2;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form2;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form2;
                                var webforms = config.webforms.newhopemedicalcenter.live.form2;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form2;
                                var form_page = config.form_page.newhopemedicalcenter.live.form2;

                                console.log("form2");
                                webforms_newhopemedicalcenter_f2.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form3":
                                var forms = config.forms.newhopemedicalcenter.form3;
                                var row_title = config.row_title.newhopemedicalcenter.live.form3;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form3;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form3;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form3;
                                var webforms = config.webforms.newhopemedicalcenter.live.form3;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form3;
                                var form_page = config.form_page.newhopemedicalcenter.live.form3;

                                console.log("form3");
                                webforms_newhopemedicalcenter_f3.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form4":
                                var forms = config.forms.newhopemedicalcenter.form4;
                                var row_title = config.row_title.newhopemedicalcenter.live.form4;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form4;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form4;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form4;
                                var webforms = config.webforms.newhopemedicalcenter.live.form4;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form4;
                                var form_page = config.form_page.newhopemedicalcenter.live.form4;

                                console.log("form4");
                                webforms_newhopemedicalcenter_f4.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form5":
                                var forms = config.forms.newhopemedicalcenter.form5;
                                var row_title = config.row_title.newhopemedicalcenter.live.form5;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form5;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form5;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form5;
                                var webforms = config.webforms.newhopemedicalcenter.live.form5;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form5;
                                var form_page = config.form_page.newhopemedicalcenter.live.form5;

                                console.log("form5");
                                webforms_newhopemedicalcenter_f5.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form6":
                                var forms = config.forms.newhopemedicalcenter.form6;
                                var row_title = config.row_title.newhopemedicalcenter.live.form6;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form6;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form6;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form6;
                                var webforms = config.webforms.newhopemedicalcenter.live.form6;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form6;
                                var form_page = config.form_page.newhopemedicalcenter.live.form6;

                                console.log("form6");
                                webforms_newhopemedicalcenter_f6.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
                                break;
                            case "form7":
                                var forms = config.forms.newhopemedicalcenter.form7;
                                var row_title = config.row_title.newhopemedicalcenter.live.form7;
                                var settings_arr = config.settings_arr.newhopemedicalcenter.live.form7;
                                var admin_notif = config.admin_notif.newhopemedicalcenter.live.form7;
                                var qa_notif = config.qa_notif.newhopemedicalcenter.live.form7;
                                var webforms = config.webforms.newhopemedicalcenter.live.form7;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form7;
                                var form_page = config.form_page.newhopemedicalcenter.live.form7;

                                console.log("form7");
                                webforms_newhopemedicalcenter_f7.index(
                                    date, 
                                    domain, 
                                    checkbox, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
                                    wp_menu_name, 
                                    row_title, 
                                    settings_arr, 
                                    admin_notif,
                                    qa_notif,
                                    range_recipient, 
                                    range_thankyou_page, 
                                    qa_email, 
                                    module_name, 
                                    launch, 
                                    contact_form_name, 
                                    contact_form_shortcode, 
                                    webforms,
                                    form_page
                                );
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
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_optimizex);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.optimizex.dev;
                        var wp_creds_username = config.wp_creds.optimizex.username;
                        var wp_creds_password = config.wp_creds.optimizex.password;
                        var launch = config.launch.dev;

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
                    case "live":
                        var domain = config.domain.optimizex.live;
                        var wp_creds_username = config.wp_creds.optimizex.username;
                        var wp_creds_password = config.wp_creds.optimizex.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_optimizex) {
                            case "form1":
                                var forms = config.forms.optimizex.form1;
                                var row_title = config.row_title.optimizex.live.form1;
                                var webforms = config.webforms.optimizex.live.form1;
                                var contact_form_name = config.contact_form_name.optimizex.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form1;

                                console.log("form1");
                                webforms_optimizex_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.optimizex.form2;
                                var row_title = config.row_title.optimizex.live.form2;
                                var webforms = config.webforms.optimizex.live.form2;
                                var contact_form_name = config.contact_form_name.optimizex.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form2;

                                console.log("form2");
                                webforms_optimizex_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.optimizex.form3;
                                var row_title = config.row_title.optimizex.live.form3;
                                var webforms = config.webforms.optimizex.live.form3;
                                var contact_form_name = config.contact_form_name.optimizex.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form3;

                                console.log("form3");
                                webforms_optimizex_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "phoenixritecare":
                var site_phoenixritecare = req.body.site_phoenixritecare;
                var sheetId = config.sheetId.phoenixritecare;
                var ranges = config.ranges.phoenixritecare;
                var range_recipient = config.range_recipient.phoenixritecare;
                var range_thankyou_page = config.range_thankyou_page.phoenixritecare;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_phoenixritecare);
                switch (checkbox) {
                    // case "dev":
                    //     var domain = config.domain.phoenixritecare.dev;
                    //     var wp_creds_username = config.wp_creds.phoenixritecare.username;
                    //     var wp_creds_password = config.wp_creds.phoenixritecare.password;
                    //     var launch = config.launch.dev;

                    //     console.log(domain);
                    //     console.log("dev");
                    //     switch (site_phoenixritecare) {
                    //         case "form1":
                    //             var forms = config.forms.phoenixritecare.form1;
                    //             var row_title = config.row_title.phoenixritecare.dev.form1;
                    //             var webforms = config.webforms.phoenixritecare.dev.form1;
                    //             var contact_form_name = config.contact_form_name.phoenixritecare.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form1;

                    //             console.log("form1");
                    //             webforms_phoenixritecare_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                    case "live":
                        var domain = config.domain.phoenixritecare.live;
                        var wp_creds_username = config.wp_creds.phoenixritecare.username;
                        var wp_creds_password = config.wp_creds.phoenixritecare.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_phoenixritecare) {
                            case "form1":
                                var forms = config.forms.phoenixritecare.form1;
                                var row_title = config.row_title.phoenixritecare.live.form1;
                                var webforms = config.webforms.phoenixritecare.live.form1;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form1;

                                console.log("form1");
                                webforms_phoenixritecare_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.phoenixritecare.form2;
                                var row_title = config.row_title.phoenixritecare.live.form2;
                                var webforms = config.webforms.phoenixritecare.live.form2;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form2;

                                console.log("form2");
                                webforms_phoenixritecare_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.phoenixritecare.form3;
                                var row_title = config.row_title.phoenixritecare.live.form3;
                                var webforms = config.webforms.phoenixritecare.live.form3;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form3;

                                console.log("form3");
                                webforms_phoenixritecare_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form4":
                                var forms = config.forms.phoenixritecare.form4;
                                var row_title = config.row_title.phoenixritecare.live.form4;
                                var webforms = config.webforms.phoenixritecare.live.form4;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form4;

                                console.log("form4");
                                webforms_phoenixritecare_f4.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form5":
                                var forms = config.forms.phoenixritecare.form5;
                                var row_title = config.row_title.phoenixritecare.live.form5;
                                var webforms = config.webforms.phoenixritecare.live.form5;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form5;

                                console.log("form5");
                                webforms_phoenixritecare_f5.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form6":
                                var forms = config.forms.phoenixritecare.form6;
                                var row_title = config.row_title.phoenixritecare.live.form6;
                                var webforms = config.webforms.phoenixritecare.live.form6;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form6;

                                console.log("form6");
                                webforms_phoenixritecare_f6.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form7":
                                var forms = config.forms.phoenixritecare.form7;
                                var row_title = config.row_title.phoenixritecare.live.form7;
                                var webforms = config.webforms.phoenixritecare.live.form7;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form7;

                                console.log("form7");
                                webforms_phoenixritecare_f7.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form8":
                                var forms = config.forms.phoenixritecare.form8;
                                var row_title = config.row_title.phoenixritecare.live.form8;
                                var webforms = config.webforms.phoenixritecare.live.form8;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form8;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form8;

                                console.log("form8");
                                webforms_phoenixritecare_f8.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form9":
                                var forms = config.forms.phoenixritecare.form9;
                                var row_title = config.row_title.phoenixritecare.live.form9;
                                var webforms = config.webforms.phoenixritecare.live.form9;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form9;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form9;

                                console.log("form9");
                                webforms_phoenixritecare_f9.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "sellusyourcaraz":
                var site_sellusyourcaraz = req.body.site_sellusyourcaraz;
                var sheetId = config.sheetId.sellusyourcaraz;
                var ranges = config.ranges.sellusyourcaraz;
                var range_recipient = config.range_recipient.sellusyourcaraz;
                var range_thankyou_page = config.range_thankyou_page.sellusyourcaraz;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_sellusyourcaraz);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.sellusyourcaraz.dev;
                        var wp_creds_username = config.wp_creds.sellusyourcaraz.username;
                        var wp_creds_password = config.wp_creds.sellusyourcaraz.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_sellusyourcaraz) {
                            case "form1":
                                var forms = config.forms.sellusyourcaraz.form1;
                                var row_title = config.row_title.sellusyourcaraz.dev.form1;
                                var webforms = config.webforms.sellusyourcaraz.dev.form1;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form1;

                                console.log("form1");
                                webforms_sellusyourcaraz_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.sellusyourcaraz.form2;
                                var row_title = config.row_title.sellusyourcaraz.dev.form2;
                                var webforms = config.webforms.sellusyourcaraz.dev.form2;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form2;

                                console.log("form2");
                                webforms_sellusyourcaraz_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.sellusyourcaraz.form3;
                                var row_title = config.row_title.sellusyourcaraz.dev.form3;
                                var webforms = config.webforms.sellusyourcaraz.dev.form3;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form3;

                                console.log("form3");
                                webforms_sellusyourcaraz_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.sellusyourcaraz.live;
                        var wp_creds_username = config.wp_creds.sellusyourcaraz.username;
                        var wp_creds_password = config.wp_creds.sellusyourcaraz.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_sellusyourcaraz) {
                            case "form1":
                                var forms = config.forms.sellusyourcaraz.form1;
                                var row_title = config.row_title.sellusyourcaraz.live.form1;
                                var webforms = config.webforms.sellusyourcaraz.live.form1;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form1;

                                console.log("form1");
                                webforms_sellusyourcaraz_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.sellusyourcaraz.form2;
                                var row_title = config.row_title.sellusyourcaraz.live.form2;
                                var webforms = config.webforms.sellusyourcaraz.live.form2;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form2;

                                console.log("form2");
                                webforms_sellusyourcaraz_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.sellusyourcaraz.form3;
                                var row_title = config.row_title.sellusyourcaraz.live.form3;
                                var webforms = config.webforms.sellusyourcaraz.live.form3;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form3;

                                console.log("form3");
                                webforms_sellusyourcaraz_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "sunrisejewelryusa":
                var site_sunrisejewelryusa = req.body.site_sunrisejewelryusa;
                var sheetId = config.sheetId.sunrisejewelryusa;
                var ranges = config.ranges.sunrisejewelryusa;
                var range_recipient = config.range_recipient.sunrisejewelryusa;
                var range_thankyou_page = config.range_thankyou_page.sunrisejewelryusa;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_sunrisejewelryusa);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.sunrisejewelryusa.dev;
                        var wp_creds_username = config.wp_creds.sunrisejewelryusa.username;
                        var wp_creds_password = config.wp_creds.sunrisejewelryusa.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_sunrisejewelryusa) {
                            case "form1":
                                var forms = config.forms.sunrisejewelryusa.form1;
                                var row_title = config.row_title.sunrisejewelryusa.dev.form1;
                                var webforms = config.webforms.sunrisejewelryusa.dev.form1;
                                var contact_form_name = config.contact_form_name.sunrisejewelryusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sunrisejewelryusa.form1;

                                console.log("form1");
                                webforms_sunrisejewelryusa_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.sunrisejewelryusa.live;
                        var wp_creds_username = config.wp_creds.sunrisejewelryusa.username;
                        var wp_creds_password = config.wp_creds.sunrisejewelryusa.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_sunrisejewelryusa) {
                            case "form1":
                                var forms = config.forms.sunrisejewelryusa.form1;
                                var row_title = config.row_title.sunrisejewelryusa.live.form1;
                                var webforms = config.webforms.sunrisejewelryusa.live.form1;
                                var contact_form_name = config.contact_form_name.sunrisejewelryusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sunrisejewelryusa.form1;

                                console.log("form1");
                                webforms_sunrisejewelryusa_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "versatile":
                var site_versatile = req.body.site_versatile;
                var sheetId = config.sheetId.versatile;
                var ranges = config.ranges.versatile;
                var range_recipient = config.range_recipient.versatile;
                var range_thankyou_page = config.range_thankyou_page.versatile;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_versatile);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.versatile.dev;
                        var wp_creds_username = config.wp_creds.versatile.username;
                        var wp_creds_password = config.wp_creds.versatile.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_versatile) {
                            case "form1":
                                var forms = config.forms.versatile.form1;
                                var row_title = config.row_title.versatile.dev.form1;
                                var webforms = config.webforms.versatile.dev.form1;
                                var contact_form_name = config.contact_form_name.versatile.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form1;

                                console.log("form1");
                                webforms_versatile_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form2":
                                var forms = config.forms.versatile.form2;
                                var row_title = config.row_title.versatile.dev.form2;
                                var webforms = config.webforms.versatile.dev.form2;
                                var contact_form_name = config.contact_form_name.versatile.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form2;

                                console.log("form2");
                                webforms_versatile_f2.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form3":
                                var forms = config.forms.versatile.form3;
                                var row_title = config.row_title.versatile.dev.form3;
                                var webforms = config.webforms.versatile.dev.form3;
                                var contact_form_name = config.contact_form_name.versatile.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form3;

                                console.log("form3");
                                webforms_versatile_f3.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            case "form4":
                                var forms = config.forms.versatile.form4;
                                var row_title = config.row_title.versatile.dev.form4;
                                var webforms = config.webforms.versatile.dev.form4;
                                var contact_form_name = config.contact_form_name.versatile.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form4;

                                console.log("form4");
                                webforms_versatile_f4.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = config.domain.versatile.live;
                    //     var wp_creds_username = config.wp_creds.versatile.username;
                    //     var wp_creds_password = config.wp_creds.versatile.password;
                    //     var launch = config.launch.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_versatile) {
                    //         case "form1":
                    //             var forms = config.forms.versatile.form1;
                    //             var row_title = config.row_title.versatile.live.form1;
                    //             var webforms = config.webforms.versatile.live.form1;
                    //             var contact_form_name = config.contact_form_name.versatile.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.versatile.form1;

                    //             console.log("form1");
                    //             webforms_versatile_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "solutionsforum":
                var site_solutionsforum = req.body.site_solutionsforum;
                var sheetId = config.sheetId.solutionsforum;
                var ranges = config.ranges.solutionsforum;
                var range_recipient = config.range_recipient.solutionsforum;
                var range_thankyou_page = config.range_thankyou_page.solutionsforum;
                var wp_menu_name = config.wp_menu_name.contact_form_7;

                console.log("Site: " + site_solutionsforum);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.solutionsforum.dev;
                        var wp_creds_username = config.wp_creds.solutionsforum.username;
                        var wp_creds_password = config.wp_creds.solutionsforum.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_solutionsforum) {
                            case "form1":
                                var forms = config.forms.solutionsforum.form1;
                                var row_title = config.row_title.solutionsforum.dev.form1;
                                var webforms = config.webforms.solutionsforum.dev.form1;
                                var contact_form_name = config.contact_form_name.solutionsforum.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.solutionsforum.form1;

                                console.log("form1");
                                webforms_solutionsforum_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = config.domain.solutionsforum.live;
                    //     var wp_creds_username = config.wp_creds.solutionsforum.username;
                    //     var wp_creds_password = config.wp_creds.solutionsforum.password;
                    //     var launch = config.launch.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_solutionsforum) {
                    //         case "form1":
                    //             var forms = config.forms.solutionsforum.form1;
                    //             var row_title = config.row_title.solutionsforum.live.form1;
                    //             var webforms = config.webforms.solutionsforum.live.form1;
                    //             var contact_form_name = config.contact_form_name.solutionsforum.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.solutionsforum.form1;

                    //             console.log("form1");
                    //             webforms_solutionsforum_f1.index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
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


app.post('/post/responsiveness_lambdatest', function(req, res) {
    logger.errorLog();
    var url = req.body.url;
    var device = req.body.device;
    var email = req.body.email;
    var password = req.body.password;

    var lambdatest_site = config.lambdatest_site;
    var lt_email = config.creds_lambdatest.email;
    var lt_password = config.creds_lambdatest.password;
    var module_name = config.module_name.responsiveness;

    console.log("URL: " + url);
    console.log("Device: " + device);
    console.log("email: " + email);
    console.log("password: " + password);
    try {
        switch (device) {
            case "desktop":
                var version_desktop = req.body.version_desktop;
                var devices = config.devices.desktop;

                console.log("Version: " + version_desktop);
                switch (version_desktop) {
                    case "version1":
                        var versions = config.versions.desktop.version1;
                        var device_desktop = config.device_desktop.windows_11;

                        responsiveness_desktop_lambdatest.desktop(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            device_desktop
                        );
                        break;
                    case "version2":
                        var versions = config.versions.desktop.version2;
                        var device_desktop = config.device_desktop.windows_8;

                        responsiveness_desktop_lambdatest.desktop(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            device_desktop
                        );
                        break;
                    case "version3":
                        var versions = config.versions.desktop.version3;
                        var device_desktop = config.device_desktop.windows_7;

                        responsiveness_desktop_lambdatest.desktop(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            device_desktop
                        );
                        break;
                    case "version4":
                        var versions = config.versions.desktop.version4;
                        var device_desktop = config.device_desktop.macos_sierra;

                        responsiveness_desktop_lambdatest.desktop(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            device_desktop
                        );
                        break;
                    default:
                        break;
                }
                break;
            case "mobile":
                var version_mobile = req.body.version_mobile;
                var devices = config.devices.mobile;

                console.log("Version: " + version_mobile);
                switch (version_mobile) {
                    case "version1":
                        var versions = config.versions.mobile.version1;
                        var brand = config.brand.mobile.samsung;
                        var device_mobile = config.device_mobile.samsung_galaxy_m30s;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version2":
                        var versions = config.versions.mobile.version2;
                        var brand = config.brand.mobile.google;
                        var device_mobile = config.device_mobile.google_pixel_5_5g;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version3":
                        var versions = config.versions.mobile.version3;
                        var brand = config.brand.mobile.one_plus;
                        var device_mobile = config.device_mobile.one_plus_9;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version4":
                        var versions = config.versions.mobile.version4;
                        var brand = config.brand.mobile.xiaomi;
                        var device_mobile = config.device_mobile.xiaomi_mi_11;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version5":
                        var versions = config.versions.mobile.version5;
                        var brand = config.brand.mobile.real_me;
                        var device_mobile = config.device_mobile.real_me_5;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version6":
                        var versions = config.versions.mobile.version6;
                        var brand = config.brand.mobile.huawei;
                        var device_mobile = config.device_mobile.huawei_p30_pro;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version7":
                        var versions = config.versions.mobile.version7;
                        var brand = config.brand.mobile.sony;
                        var device_mobile = config.device_mobile.sony_xperia_xz2;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version8":
                        var versions = config.versions.mobile.version8;
                        var brand = config.brand.mobile.motorola;
                        var device_mobile = config.device_mobile.moto_g6;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version9":
                        var versions = config.versions.mobile.version9;
                        var brand = config.brand.mobile.lg;
                        var device_mobile = config.device_mobile.lg_g6;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version10":
                        var versions = config.versions.mobile.version10;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_13_pro_max;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version11":
                        var versions = config.versions.mobile.version11;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_13_pro;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version12":
                        var versions = config.versions.mobile.version12;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_13;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version13":
                        var versions = config.versions.mobile.version13;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_12_pro_max;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version14":
                        var versions = config.versions.mobile.version14;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_11_pro_max;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    case "version15":
                        var versions = config.versions.mobile.version15;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_x;

                        responsiveness_mobile.mobile(
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_mobile
                        );
                        break;
                    default:
                        break;
                }
                break;
            case "tablet":
                var version_tablet = req.body.version_tablet;
                var devices = config.devices.tablet;

                console.log("Version: " + version_tablet);
                switch (version_tablet) {
                    case "version1":
                        var versions = config.versions.tablet.version1;
                        var brand = config.brand.tablet.ios;
                        var device_tablet = config.device_tablet.ipad_air_4th_gen;

                        responsiveness_tablet.tablet(
                            version_tablet,
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_tablet
                        );
                        break;
                    case "version2":
                        var versions = config.versions.tablet.version2;
                        var brand = config.brand.mobile.samsung;
                        var device_tablet = config.device_tablet.galaxy_tab_s7_plus;

                        responsiveness_tablet.tablet(
                            version_tablet,
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_tablet
                        );
                        break;
                    case "version3":
                        var versions = config.versions.tablet.version3;
                        var brand = config.brand.mobile.samsung;
                        var device_tablet = config.device_tablet.galaxy_tab_s6;

                        responsiveness_tablet.tablet(
                            version_tablet,
                            module_name,
                            url, 
                            email, 
                            password, 
                            timestamp, 
                            lt_email, 
                            lt_password,
                            lambdatest_site,
                            devices,
                            versions,
                            brand,
                            device_tablet
                        );
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


app.post('/post/responsiveness_manual', function(req, res) {
    logger.errorLog();
    var url = req.body.url;
    var resolution = req.body.resolution;
    var module_name = config.module_name.responsiveness;

    console.log("URL: " + url);
    console.log("Resolution: " + resolution);

    try {
        responsiveness_desktop_manual.manual(
            url,
            resolution,
            module_name,
            timestamp
        );
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});


http.listen(3000, function(){
  console.log('listening on port 3000');
});


