require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('file-system');
const logger = require("./middleware/logger.js");
const sheet = require('./middleware/gsheet.js');
const config = require("./config");
const config_checkout = require("../qa-checking-app/modules/checkout/config");

const express = require('express');
app.use(express.static(__dirname + '/public'));
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const checkout_americanleatherusa = require("./modules/checkout/americanleatherusa/index");
const checkout_sunrisejewelryusa = require("./modules/checkout/sunrisejewelryusa/index");

const image_optimization = require("./modules/image_optimization/image_optimization");
const visibility = require("./modules/visibility/visibility");
const webforms_accidentchiropracticaz_f1 = require("./modules/webforms/contactform7/forms/accidentchiropracticaz/form1/index");
const webforms_accidentchiropracticaz_f2 = require("./modules/webforms/contactform7/forms/accidentchiropracticaz/form2/index");
const webforms_advancedimagemedspa_f1 = require("./modules/webforms/contactform7/forms/advancedimagemedspa/form1/index");
const webforms_advancedimagemedspa_f2 = require("./modules/webforms/contactform7/forms/advancedimagemedspa/form2/index");
const webforms_advancedimagemedspa_f3 = require("./modules/webforms/contactform7/forms/advancedimagemedspa/form3/index");
const webforms_aerialengagement_f1 = require("./modules/webforms/contactform7/forms/aerialengagement/form1/index");
const webforms_aeroturbine_f1 = require("./modules/webforms/contactform7/forms/aeroturbine/form1/index");
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
const webforms_collisioncenternorthscottsdale_f1 = require("./modules/webforms/contactform7/forms/collisioncenternorthscottsdale/form1/index");
const webforms_collisioncenternorthscottsdale_f2 = require("./modules/webforms/contactform7/forms/collisioncenternorthscottsdale/form2/index");
const webforms_collisioncenternorthscottsdale_f3 = require("./modules/webforms/contactform7/forms/collisioncenternorthscottsdale/form3/index");
const webforms_collisioncenternorthscottsdale_f4 = require("./modules/webforms/contactform7/forms/collisioncenternorthscottsdale/form4/index");
const webforms_crexendo_f1 = require("./modules/webforms/contactform7/forms/crexendo/form1/index");
const webforms_crexendo_f2 = require("./modules/webforms/contactform7/forms/crexendo/form2/index");
const webforms_crexendo_f3 = require("./modules/webforms/contactform7/forms/crexendo/form3/index");
const webforms_crexendo_f4 = require("./modules/webforms/contactform7/forms/crexendo/form4/index");
const webforms_crexendo_f5 = require("./modules/webforms/contactform7/forms/crexendo/form5/index");
const webforms_culpepper_f1 = require("./modules/webforms/ninjaform/forms/culpepper/form1/index");

const webforms_dentistryatthebiltmore_f1 = require("./modules/webforms/contactform7/forms/dentistryatthebiltmore/form1/index");
const webforms_dentistryatthebiltmore_f2 = require("./modules/webforms/contactform7/forms/dentistryatthebiltmore/form2/index");
const webforms_dentistryatthebiltmore_f3 = require("./modules/webforms/contactform7/forms/dentistryatthebiltmore/form3/index");

const webforms_ewingconstruction_f1 = require("./modules/webforms/contactform7/forms/ewingconstruction/form1/index");
const webforms_freddabranyon_f1 = require("./modules/webforms/contactform7/forms/freddabranyon/form1/index");
const webforms_frlawgroup_f1 = require("./modules/webforms/contactform7/forms/frlawgroup/form1/index");
const webforms_frlawgroup_f2 = require("./modules/webforms/contactform7/forms/frlawgroup/form2/index");
const webforms_frlawgroup_f3 = require("./modules/webforms/contactform7/forms/frlawgroup/form3/index");
const webforms_gatorskin_f1 = require("./modules/webforms/contactform7/forms/gatorskin/form1/index");
const webforms_indinspect_f1 = require("./modules/webforms/gravityform/forms/indinspect/form1/index");
const webforms_indinspect_f2 = require("./modules/webforms/gravityform/forms/indinspect/form2/index");
const webforms_jewelryoutletinc_f1 = require("./modules/webforms/contactform7/forms/jewelryoutletinc/form1/index");
const webforms_jewelryoutletinc_f2 = require("./modules/webforms/contactform7/forms/jewelryoutletinc/form2/index");
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
const webforms_paysondermatology_f1 = require("./modules/webforms/contactform7/forms/paysondermatology/form1/index");
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
const webforms_renewscal_f1 = require("./modules/webforms/gravityform/forms/renewscal/form1/index");
const webforms_renewscal_f2 = require("./modules/webforms/gravityform/forms/renewscal/form2/index");
const webforms_risingsunmartialartsaz_f1 = require("./modules/webforms/contactform7/forms/risingsunmartialartsaz/form1/index");
const webforms_sellusyourcaraz_f1 = require("./modules/webforms/contactform7/forms/sellusyourcaraz/form1/index");
const webforms_sellusyourcaraz_f2 = require("./modules/webforms/contactform7/forms/sellusyourcaraz/form2/index");
const webforms_sellusyourcaraz_f3 = require("./modules/webforms/contactform7/forms/sellusyourcaraz/form3/index");
const webforms_sunrisejewelryusa_f1 = require("./modules/webforms/contactform7/forms/sunrisejewelryusa/form1/index");
const webforms_versatile_f1 = require("./modules/webforms/contactform7/forms/versatile/form1/index");
const webforms_versatile_f2 = require("./modules/webforms/contactform7/forms/versatile/form2/index");
const webforms_versatile_f3 = require("./modules/webforms/contactform7/forms/versatile/form3/index");
const webforms_versatile_f4 = require("./modules/webforms/contactform7/forms/versatile/form4/index");
const webforms_virtualassistantsoutsourcing_f1 = require("./modules/webforms/contactform7/forms/virtualassistantsoutsourcing/form1/index");
const webforms_solutionsforum_f1 = require("./modules/webforms/contactform7/forms/solutionsforum/form1/index");
const newsletter = require("./modules/newsletter/newsletter");
const nitropack = require("./modules/nitropack/index");
const nitropack_reports = require("./modules/nitropack/nitropack");
const wpm = require("./modules/wpm/index");
const wpm_reports = require("./modules/wpm/wpm");
const responsiveness_desktop_lambdatest = require("./modules/responsiveness/desktop/desktop");
const responsiveness_desktop_manual = require("./modules/responsiveness/desktop/manual");
const responsiveness_mobile = require("./modules/responsiveness/mobile/mobile");
const responsiveness_tablet = require("./modules/responsiveness/tablet/tablet");
const { log } = require('console');
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
const success_msg_marketing = 'Success.<br><br><a href="http://localhost:3000/posts">Return home</a>';

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

app.get('/posts', function(req, res){
    session=req.session;

    var userId = session.userid;
    
    if(userId){
        logger.errorLog();
        res.sendFile(__dirname + '/index_marketing.html');
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
    const usernameData_devs = config.usernameData_devs;
    const usernameData_marketing = config.usernameData_marketing;

    session=req.session;
    session.userid=req.body.username;
    console.log(req.session)
    module.exports.userId = session.userid;
    
    try {
        logger.errorLog();
        if ((usernameData_devs) && (usernameData_devs.includes(username))) {
            console.log("user is allowed.");
            if (await bcrypt.compare(passwordData, hashedPassword)) {
                res.redirect("/post");
                logger.logger.log({ level: 'info', message: 'login success.', tester: this.userId });
                console.log("login success.");
                let value = [ "", "", "info", "login success.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                res.send('Login failed.');
                logger.logger.log({ level: 'error', message: 'login failed.', tester: this.userId });
                console.log("login failed.");
                let value = [ "", "", "error", "login failed.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } 
        else if ((usernameData_marketing) && (usernameData_marketing.includes(username))) {
            console.log("user is allowed.");
            if (await bcrypt.compare(passwordData, hashedPassword)) {
                res.redirect("/posts");
                logger.logger.log({ level: 'info', message: 'login success.', tester: this.userId });
                console.log("login success.");
                let value = [ "", "", "info", "login success.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                res.send('Login failed.');
                logger.logger.log({ level: 'error', message: 'login failed.', tester: this.userId });
                console.log("login failed.");
                let value = [ "", "", "error", "login failed.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } 
        else {
            res.send('User is not allowed.');
            logger.logger.log({ level: 'error', message: 'user is not allowed.', tester: this.userId });
            console.log("user is not allowed.");
            let value = [ "", "", "error", "user is not allowed.", this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        res.status(500).send();
        logger.logger.log({ level: 'error', message: error, tester: this.userId });
        console.log(error);
        let value = [ "", "", "error", JSON.stringify(error), this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
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
        let value = [ "", "", "logout failed.", JSON.stringify(error), this.userId, timestamp, "", "", "", "", "", "", "", "", "", "" ];
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
    var module_name = config_checkout.module_name;
    var co_site;

    console.log("email: " + email);
    console.log("checkout: " + checkout);

    console.log("username_server: " + username);
    console.log("password_server: " + password);
    try {
        switch (checkout) {
            case "sunrisejewelryusa":
                co_site = req.body.co_sunrisejewelryusa;
                var wp_creds_username = config_checkout.wp_creds.sunrisejewelryusa.username;
                var wp_creds_password = config_checkout.wp_creds.sunrisejewelryusa.password;
                var tax_page = config_checkout.tax_page;
                var payments_page = config_checkout.payments_page;
                var emails_page = config_checkout.emails_page;
                var pricesEnteredWithTax_script = config_checkout.pricesEnteredWithTax_script;
                var displayPricesInTheShop_script = config_checkout.displayPricesInTheShop_script;
                var displayPricesDuringCartAndCheckout_script = config_checkout.displayPricesDuringCartAndCheckout_script;
                var sheetId = config_checkout.sheetId.sunrisejewelryusa;
                var ranges = config_checkout.ranges.sunrisejewelryusa;
                var range_recipients_newOrder = config_checkout.range_recipients.sunrisejewelryusa.new_order;
                var range_recipients_cancelledOrder = config_checkout.range_recipients.sunrisejewelryusa.cancelled_order;
                var range_recipients_failedOrder = config_checkout.range_recipients.sunrisejewelryusa.failed_order;
                var emails_newOrder_page = config_checkout.emails_newOrder_page;
                var emails_cancelledOrder_page = config_checkout.emails_cancelledOrder_page;
                var emails_failedOrder_page = config_checkout.emails_failedOrder_page;
                var coupons_page = config_checkout.coupons_page;
                var range_coupons = config_checkout.range_coupons.sunrisejewelryusa;
                var range_product_name = config_checkout.range_product_name.sunrisejewelryusa;
                var range_thankyou_page = config_checkout.range_thankyou_page.sunrisejewelryusa;
                
                console.log("Site: " + co_site);
                switch (checkbox_checkout) {
                    case "dev":
                        var domain = config_checkout.domain.sunrisejewelryusa.dev;
                        var launch = config_checkout.launch.dev;
                        console.log(domain);
                        console.log("dev");
                        switch (co_site) {
                            case "product1":
                                var product_name = config_checkout.product.sunrisejewelryusa.product1;
                                var product_link = config_checkout.product_link.sunrisejewelryusa.product1;
                                await checkout_sunrisejewelryusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            case "product2":
                                var product_name = config_checkout.product.sunrisejewelryusa.product2;
                                var product_link = config_checkout.product_link.sunrisejewelryusa.product2;
                                await checkout_sunrisejewelryusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config_checkout.domain.sunrisejewelryusa.live;
                        var launch = config_checkout.launch.live;
                        console.log(domain);
                        console.log("live");
                        switch (co_site) {
                            case "product1":
                                var product_name = config_checkout.product.sunrisejewelryusa.product1;
                                var product_link = config_checkout.product_link.sunrisejewelryusa.product1;
                                await checkout_sunrisejewelryusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            case "product2":
                                var product_name = config_checkout.product.sunrisejewelryusa.product2;
                                var product_link = config_checkout.product_link.sunrisejewelryusa.product2;
                                await checkout_sunrisejewelryusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "americanleatherusa":
                co_site = req.body.co_americanleatherusa;
                var wp_creds_username = config_checkout.wp_creds.americanleatherusa.username;
                var wp_creds_password = config_checkout.wp_creds.americanleatherusa.password;
                var tax_page = config_checkout.tax_page;
                var payments_page = config_checkout.payments_page;
                var emails_page = config_checkout.emails_page;
                var pricesEnteredWithTax_script = config_checkout.pricesEnteredWithTax_script;
                var displayPricesInTheShop_script = config_checkout.displayPricesInTheShop_script;
                var displayPricesDuringCartAndCheckout_script = config_checkout.displayPricesDuringCartAndCheckout_script;
                var sheetId = config_checkout.sheetId.americanleatherusa;
                var ranges = config_checkout.ranges.americanleatherusa;
                var range_recipients_newOrder = config_checkout.range_recipients.americanleatherusa.new_order;
                var range_recipients_cancelledOrder = config_checkout.range_recipients.americanleatherusa.cancelled_order;
                var range_recipients_failedOrder = config_checkout.range_recipients.americanleatherusa.failed_order;
                var emails_newOrder_page = config_checkout.emails_newOrder_page;
                var emails_cancelledOrder_page = config_checkout.emails_cancelledOrder_page;
                var emails_failedOrder_page = config_checkout.emails_failedOrder_page;
                var coupons_page = config_checkout.coupons_page;
                var range_coupons = config_checkout.range_coupons.americanleatherusa;
                var range_product_name = config_checkout.range_product_name.americanleatherusa;
                var range_thankyou_page = config_checkout.range_thankyou_page.americanleatherusa;
                
                console.log("Site: " + co_site);
                switch (checkbox_checkout) {
                    case "dev":
                        var domain = config_checkout.domain.americanleatherusa.dev;
                        var launch = config_checkout.launch.dev;
                        console.log(domain);
                        console.log("dev");
                        switch (co_site) {
                            case "product1":
                                var product_name = config_checkout.product.americanleatherusa.product1;
                                var product_link = config_checkout.product_link.americanleatherusa.product1;
                                await checkout_americanleatherusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            case "product2":
                                var product_name = config_checkout.product.americanleatherusa.product2;
                                var product_link = config_checkout.product_link.americanleatherusa.product2;
                                await checkout_americanleatherusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config_checkout.domain.americanleatherusa.live;
                        var launch = config_checkout.launch.live;
                        console.log(domain);
                        console.log("live");
                        switch (co_site) {
                            case "product1":
                                var product_name = config_checkout.product.americanleatherusa.product1;
                                var product_link = config_checkout.product_link.americanleatherusa.product1;
                                await checkout_americanleatherusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            case "product2":
                                var product_name = config_checkout.product.americanleatherusa.product2;
                                var product_link = config_checkout.product_link.americanleatherusa.product2;
                                await checkout_americanleatherusa.index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site);
                                break;
                            default:
                                break;
                        }
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
    
    for (let index = 0; index < config.usernameData_devs.length; index++) {
        if (this.userId === config.usernameData_devs[index]) {
            res.send(success_msg);
        }    
    }

    for (let index = 0; index < config.usernameData_marketing.length; index++) {
        if (this.userId === config.usernameData_marketing[index]) {
            res.send(success_msg_marketing);
        }    
    }
    
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
                                var webforms = config.webforms.accidentchiropracticaz.dev.form1;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form1;
                                var form_page = config.form_page.accidentchiropracticaz.dev.form1;

                                console.log("form1");
                                await webforms_accidentchiropracticaz_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.accidentchiropracticaz.form2;
                                var webforms = config.webforms.accidentchiropracticaz.dev.form2;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form2;
                                var form_page = config.form_page.accidentchiropracticaz.dev.form2;

                                console.log("form2");
                                await webforms_accidentchiropracticaz_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.accidentchiropracticaz.live.form1;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form1;
                                var form_page = config.form_page.accidentchiropracticaz.live.form1;

                                console.log("form1");
                                await webforms_accidentchiropracticaz_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.accidentchiropracticaz.form2;
                                var webforms = config.webforms.accidentchiropracticaz.live.form2;
                                var contact_form_name = config.contact_form_name.accidentchiropracticaz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.accidentchiropracticaz.form2;
                                var form_page = config.form_page.accidentchiropracticaz.live.form2;

                                console.log("form2");
                                await webforms_accidentchiropracticaz_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_advancedimagemedspa) {
                            case "form1":
                                var forms = config.forms.advancedimagemedspa.form1;
                                var webforms = config.webforms.advancedimagemedspa.dev.form1;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form1;
                                var form_page = config.form_page.advancedimagemedspa.dev.form1;

                                console.log("form1");
                                await webforms_advancedimagemedspa_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.advancedimagemedspa.form2;
                                var webforms = config.webforms.advancedimagemedspa.dev.form2;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form2;
                                var form_page = config.form_page.advancedimagemedspa.dev.form2;

                                console.log("form2");
                                await webforms_advancedimagemedspa_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.advancedimagemedspa.form3;
                                var webforms = config.webforms.advancedimagemedspa.dev.form3;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form3;
                                var form_page = config.form_page.advancedimagemedspa.dev.form3;

                                console.log("form3");
                                await webforms_advancedimagemedspa_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
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
                                var webforms = config.webforms.advancedimagemedspa.live.form1;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form1;
                                var form_page = config.form_page.advancedimagemedspa.live.form1;

                                console.log("form1");
                                await webforms_advancedimagemedspa_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.advancedimagemedspa.form2;
                                var webforms = config.webforms.advancedimagemedspa.live.form2;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form2;
                                var form_page = config.form_page.advancedimagemedspa.live.form2;

                                console.log("form2");
                                await webforms_advancedimagemedspa_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.advancedimagemedspa.form3;
                                var webforms = config.webforms.advancedimagemedspa.live.form3;
                                var contact_form_name = config.contact_form_name.advancedimagemedspa.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.advancedimagemedspa.form3;
                                var form_page = config.form_page.advancedimagemedspa.live.form3;

                                console.log("form3");
                                await webforms_advancedimagemedspa_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_aerialengagement) {
                            case "form1":
                                var forms = config.forms.aerialengagement.form1;
                                var webforms = config.webforms.aerialengagement.dev.form1;
                                var contact_form_name = config.contact_form_name.aerialengagement.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.aerialengagement.form1;
                                var form_page = config.form_page.aerialengagement.dev.form1;
                                
                                console.log("form1");
                                await webforms_aerialengagement_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.aerialengagement.live;
                        var wp_creds_username = config.wp_creds.aerialengagement.username;
                        var wp_creds_password = config.wp_creds.aerialengagement.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_aerialengagement) {
                            case "form1":
                                var forms = config.forms.aerialengagement.form1;
                                var webforms = config.webforms.aerialengagement.live.form1;
                                var contact_form_name = config.contact_form_name.aerialengagement.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.aerialengagement.form1;
                                var form_page = config.form_page.aerialengagement.live.form1;
                                
                                console.log("form1");
                                await webforms_aerialengagement_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "aeroturbine":
                var site_aeroturbine = req.body.site_aeroturbine;
                var sheetId = config.sheetId.aeroturbine;
                var ranges = config.ranges.aeroturbine;
                var range_recipient = config.range_recipient.aeroturbine;
                var range_thankyou_page = config.range_thankyou_page.aeroturbine;

                console.log("Site: " + site_aeroturbine);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.aeroturbine.dev;
                        var wp_creds_username = config.wp_creds.aeroturbine.username;
                        var wp_creds_password = config.wp_creds.aeroturbine.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_aeroturbine) {
                            case "form1":
                                var forms = config.forms.aeroturbine.form1;
                                var webforms = config.webforms.aeroturbine.dev.form1;
                                var contact_form_name = config.contact_form_name.aeroturbine.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.aeroturbine.form1;
                                var form_page = config.form_page.aeroturbine.dev.form1;
                                
                                console.log("form1");
                                await webforms_aeroturbine_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    // case "live":
                    //     var domain = config.domain.aeroturbine.live;
                    //     var wp_creds_username = config.wp_creds.aeroturbine.username;
                    //     var wp_creds_password = config.wp_creds.aeroturbine.password;
                    //     var launch = config.launch.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_aeroturbine) {
                    //         case "form1":
                    //             var forms = config.forms.aeroturbine.form1;
                    //             var webforms = config.webforms.aeroturbine.live.form1;
                    //             var contact_form_name = config.contact_form_name.aeroturbine.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.aeroturbine.form1;

                    //             console.log("form1");
                    //             await webforms_aeroturbine_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_americanleatherusa) {
                            case "form1":
                                var forms = config.forms.americanleatherusa.form1;
                                var webforms = config.webforms.americanleatherusa.dev.form1;
                                var contact_form_name = config.contact_form_name.americanleatherusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.americanleatherusa.form1;
                                var form_page = config.form_page.americanleatherusa.dev.form1;

                                console.log("form1");
                                await webforms_americanleatherusa_f1.index(domain, username, password, email, timestamp)
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
                                var webforms = config.webforms.americanleatherusa.live.form1;
                                var contact_form_name = config.contact_form_name.americanleatherusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.americanleatherusa.form1;
                                var form_page = config.form_page.americanleatherusa.live.form1;

                                console.log("form1");
                                await webforms_americanleatherusa_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_andresperezjurado) {
                            case "form1":
                                var forms = config.forms.andresperezjurado.form1;
                                var webforms = config.webforms.andresperezjurado.dev.form1;
                                var contact_form_name = config.contact_form_name.andresperezjurado.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.andresperezjurado.form1;
                                var form_page = config.form_page.andresperezjurado.dev.form1;

                                console.log("form1");
                                await webforms_andresperezjurado_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.andresperezjurado.live.form1;
                                var contact_form_name = config.contact_form_name.andresperezjurado.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.andresperezjurado.form1;
                                var form_page = config.form_page.andresperezjurado.live.form1;

                                console.log("form1");
                                await webforms_andresperezjurado_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_azdoordoctor) {
                            case "form1":
                                var forms = config.forms.azdoordoctor.form1;
                                var webforms = config.webforms.azdoordoctor.dev.form1;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form1;
                                var form_page = config.form_page.azdoordoctor.dev.form1;

                                console.log("form1");
                                await webforms_azdoordoctor_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.azdoordoctor.form2;
                                var webforms = config.webforms.azdoordoctor.dev.form2;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form2;
                                var form_page = config.form_page.azdoordoctor.dev.form2;

                                console.log("form2");
                                await webforms_azdoordoctor_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.azdoordoctor.form3;
                                var webforms = config.webforms.azdoordoctor.dev.form3;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form3;
                                var form_page = config.form_page.azdoordoctor.dev.form3;

                                console.log("form3");
                                await webforms_azdoordoctor_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.azdoordoctor.live.form1;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form1;
                                var form_page = config.form_page.azdoordoctor.live.form1;

                                console.log("form1");
                                await webforms_azdoordoctor_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.azdoordoctor.form2;
                                var webforms = config.webforms.azdoordoctor.live.form2;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form2;
                                var form_page = config.form_page.azdoordoctor.live.form2;

                                console.log("form2");
                                await webforms_azdoordoctor_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.azdoordoctor.form3;
                                var webforms = config.webforms.azdoordoctor.live.form3;
                                var contact_form_name = config.contact_form_name.azdoordoctor.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.azdoordoctor.form3;
                                var form_page = config.form_page.azdoordoctor.live.form3;

                                console.log("form3");
                                await webforms_azdoordoctor_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_biltmoreloanandjewelry) {
                            case "form1":
                                var forms = config.forms.biltmoreloanandjewelry.form1;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form1;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form1;
                                var form_page = config.form_page.biltmoreloanandjewelry.dev.form1;

                                console.log("form1");
                                await webforms_biltmoreloanandjewelry_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.biltmoreloanandjewelry.form2;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form2;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form2;
                                var form_page = config.form_page.biltmoreloanandjewelry.dev.form2;

                                console.log("form2");
                                await webforms_biltmoreloanandjewelry_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.biltmoreloanandjewelry.form3;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form3;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form3;
                                var form_page = config.form_page.biltmoreloanandjewelry.dev.form3;

                                console.log("form3");
                                await webforms_biltmoreloanandjewelry_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.biltmoreloanandjewelry.form4;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form4;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form4;
                                var form_page = config.form_page.biltmoreloanandjewelry.dev.form4;

                                console.log("form4");
                                await webforms_biltmoreloanandjewelry_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form5":
                                var forms = config.forms.biltmoreloanandjewelry.form5;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form5;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form5;
                                var form_page = config.form_page.biltmoreloanandjewelry.dev.form5;

                                console.log("form5");
                                await webforms_biltmoreloanandjewelry_f5.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form6":
                                var forms = config.forms.biltmoreloanandjewelry.form6;
                                var webforms = config.webforms.biltmoreloanandjewelry.dev.form6;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form6;
                                var form_page = config.form_page.biltmoreloanandjewelry.dev.form6;

                                console.log("form6");
                                await webforms_biltmoreloanandjewelry_f6.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form1;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form1;
                                var form_page = config.form_page.biltmoreloanandjewelry.live.form1;

                                console.log("form1");
                                await webforms_biltmoreloanandjewelry_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.biltmoreloanandjewelry.form2;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form2;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form2;
                                var form_page = config.form_page.biltmoreloanandjewelry.live.form2;

                                console.log("form2");
                                await webforms_biltmoreloanandjewelry_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.biltmoreloanandjewelry.form3;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form3;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form3;
                                var form_page = config.form_page.biltmoreloanandjewelry.live.form3;

                                console.log("form3");
                                await webforms_biltmoreloanandjewelry_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.biltmoreloanandjewelry.form4;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form4;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form4;
                                var form_page = config.form_page.biltmoreloanandjewelry.live.form4;

                                console.log("form4");
                                await webforms_biltmoreloanandjewelry_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form5":
                                var forms = config.forms.biltmoreloanandjewelry.form5;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form5;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form5;
                                var form_page = config.form_page.biltmoreloanandjewelry.live.form5;

                                console.log("form5");
                                await webforms_biltmoreloanandjewelry_f5.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form6":
                                var forms = config.forms.biltmoreloanandjewelry.form6;
                                var webforms = config.webforms.biltmoreloanandjewelry.live.form6;
                                var contact_form_name = config.contact_form_name.biltmoreloanandjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.biltmoreloanandjewelry.form6;
                                var form_page = config.form_page.biltmoreloanandjewelry.live.form6;

                                console.log("form6");
                                await webforms_biltmoreloanandjewelry_f6.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_buckeyederm) {
                            case "form1":
                                var forms = config.forms.buckeyederm.form1;
                                var webforms = config.webforms.buckeyederm.dev.form1;
                                var contact_form_name = config.contact_form_name.buckeyederm.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.buckeyederm.form1;
                                var form_page = config.form_page.buckeyederm.dev.form1;

                                console.log("form1");
                                await webforms_buckeyederm_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.buckeyederm.live.form1;
                                var contact_form_name = config.contact_form_name.buckeyederm.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.buckeyederm.form1;
                                var form_page = config.form_page.buckeyederm.live.form1;

                                console.log("form1");
                                await webforms_buckeyederm_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_canyonfallshairextensioncompany) {
                            case "form1":
                                var forms = config.forms.canyonfallshairextensioncompany.form1;
                                var webforms = config.webforms.canyonfallshairextensioncompany.dev.form1;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form1;
                                var form_page = config.form_page.canyonfallshairextensioncompany.dev.form1;

                                console.log("form1");
                                await webforms_canyonfallshairextensioncompany_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.canyonfallshairextensioncompany.form2;
                                var webforms = config.webforms.canyonfallshairextensioncompany.dev.form2;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form2;
                                var form_page = config.form_page.canyonfallshairextensioncompany.dev.form2;

                                console.log("form2");
                                await webforms_canyonfallshairextensioncompany_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.canyonfallshairextensioncompany.live.form1;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form1;
                                var form_page = config.form_page.canyonfallshairextensioncompany.live.form1;

                                console.log("form1");
                                await webforms_canyonfallshairextensioncompany_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.canyonfallshairextensioncompany.form2;
                                var webforms = config.webforms.canyonfallshairextensioncompany.live.form2;
                                var contact_form_name = config.contact_form_name.canyonfallshairextensioncompany.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.canyonfallshairextensioncompany.form2;
                                var form_page = config.form_page.canyonfallshairextensioncompany.live.form2;

                                console.log("form2");
                                await webforms_canyonfallshairextensioncompany_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "collisioncenternorthscottsdale":
                var site_collisioncenternorthscottsdale = req.body.site_collisioncenternorthscottsdale;
                var sheetId = config.sheetId.collisioncenternorthscottsdale;
                var ranges = config.ranges.collisioncenternorthscottsdale;
                var range_recipient = config.range_recipient.collisioncenternorthscottsdale;
                var range_thankyou_page = config.range_thankyou_page.collisioncenternorthscottsdale;

                console.log("Site: " + site_collisioncenternorthscottsdale);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.collisioncenternorthscottsdale.dev;
                        var wp_creds_username = config.wp_creds.collisioncenternorthscottsdale.username;
                        var wp_creds_password = config.wp_creds.collisioncenternorthscottsdale.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_collisioncenternorthscottsdale) {
                            case "form1":
                                var forms = config.forms.collisioncenternorthscottsdale.form1;
                                var webforms = config.webforms.collisioncenternorthscottsdale.dev.form1;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form1;
                                var form_page = config.form_page.collisioncenternorthscottsdale.dev.form1;

                                console.log("form1");
                                await webforms_collisioncenternorthscottsdale_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.collisioncenternorthscottsdale.form2;
                                var webforms = config.webforms.collisioncenternorthscottsdale.dev.form2;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form2;
                                var form_page = config.form_page.collisioncenternorthscottsdale.dev.form2;

                                console.log("form2");
                                await webforms_collisioncenternorthscottsdale_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.collisioncenternorthscottsdale.form3;
                                var webforms = config.webforms.collisioncenternorthscottsdale.dev.form3;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form3;
                                var form_page = config.form_page.collisioncenternorthscottsdale.dev.form3;

                                console.log("form3");
                                await webforms_collisioncenternorthscottsdale_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.collisioncenternorthscottsdale.form4;
                                var webforms = config.webforms.collisioncenternorthscottsdale.dev.form4;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form4;
                                var form_page = config.form_page.collisioncenternorthscottsdale.dev.form4;

                                console.log("form4");
                                await webforms_collisioncenternorthscottsdale_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.collisioncenternorthscottsdale.live;
                        var wp_creds_username = config.wp_creds.collisioncenternorthscottsdale.username;
                        var wp_creds_password = config.wp_creds.collisioncenternorthscottsdale.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_collisioncenternorthscottsdale) {
                            case "form1":
                                var forms = config.forms.collisioncenternorthscottsdale.form1;
                                var webforms = config.webforms.collisioncenternorthscottsdale.live.form1;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form1;
                                var form_page = config.form_page.collisioncenternorthscottsdale.live.form1;

                                console.log("form1");
                                await webforms_collisioncenternorthscottsdale_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.collisioncenternorthscottsdale.form2;
                                var webforms = config.webforms.collisioncenternorthscottsdale.live.form2;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form2;
                                var form_page = config.form_page.collisioncenternorthscottsdale.live.form2;

                                console.log("form2");
                                await webforms_collisioncenternorthscottsdale_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.collisioncenternorthscottsdale.form3;
                                var webforms = config.webforms.collisioncenternorthscottsdale.live.form3;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form3;
                                var form_page = config.form_page.collisioncenternorthscottsdale.live.form3;

                                console.log("form3");
                                await webforms_collisioncenternorthscottsdale_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.collisioncenternorthscottsdale.form4;
                                var webforms = config.webforms.collisioncenternorthscottsdale.live.form4;
                                var contact_form_name = config.contact_form_name.collisioncenternorthscottsdale.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.collisioncenternorthscottsdale.form4;
                                var form_page = config.form_page.collisioncenternorthscottsdale.live.form4;

                                console.log("form4");
                                await webforms_collisioncenternorthscottsdale_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_crexendo) {
                            case "form1":
                                var forms = config.forms.crexendo.form1;
                                var webforms = config.webforms.crexendo.dev.form1;
                                var contact_form_name = config.contact_form_name.crexendo.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form1;
                                var form_page = config.form_page.crexendo.dev.form1;

                                console.log("form1");
                                await webforms_crexendo_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.crexendo.form2;
                                var webforms = config.webforms.crexendo.dev.form2;
                                var contact_form_name = config.contact_form_name.crexendo.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form2;
                                var form_page = config.form_page.crexendo.dev.form2;

                                console.log("form2");
                                await webforms_crexendo_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.crexendo.form3;
                                var webforms = config.webforms.crexendo.dev.form3;
                                var contact_form_name = config.contact_form_name.crexendo.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form3;
                                var form_page = config.form_page.crexendo.dev.form3;

                                console.log("form3");
                                await webforms_crexendo_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.crexendo.form4;
                                var webforms = config.webforms.crexendo.dev.form4;
                                var contact_form_name = config.contact_form_name.crexendo.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form4;
                                var form_page = config.form_page.crexendo.dev.form4;

                                console.log("form4");
                                await webforms_crexendo_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form5":
                                var forms = config.forms.crexendo.form5;
                                var webforms = config.webforms.crexendo.dev.form5;
                                var contact_form_name = config.contact_form_name.crexendo.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form5;
                                var form_page = config.form_page.crexendo.dev.form5;

                                console.log("form5");
                                await webforms_crexendo_f5.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.crexendo.live;
                        var wp_creds_username = config.wp_creds.crexendo.username;
                        var wp_creds_password = config.wp_creds.crexendo.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_crexendo) {
                            case "form1":
                                var forms = config.forms.crexendo.form1;
                                var webforms = config.webforms.crexendo.live.form1;
                                var contact_form_name = config.contact_form_name.crexendo.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form1;
                                var form_page = config.form_page.crexendo.live.form1;

                                console.log("form1");
                                await webforms_crexendo_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.crexendo.form2;
                                var webforms = config.webforms.crexendo.live.form2;
                                var contact_form_name = config.contact_form_name.crexendo.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form2;
                                var form_page = config.form_page.crexendo.live.form2;

                                console.log("form2");
                                await webforms_crexendo_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.crexendo.form3;
                                var webforms = config.webforms.crexendo.live.form3;
                                var contact_form_name = config.contact_form_name.crexendo.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form3;
                                var form_page = config.form_page.crexendo.live.form3;

                                console.log("form3");
                                await webforms_crexendo_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.crexendo.form4;
                                var webforms = config.webforms.crexendo.live.form4;
                                var contact_form_name = config.contact_form_name.crexendo.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form4;
                                var form_page = config.form_page.crexendo.live.form4;

                                console.log("form4");
                                await webforms_crexendo_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form5":
                                var forms = config.forms.crexendo.form5;
                                var webforms = config.webforms.crexendo.live.form5;
                                var contact_form_name = config.contact_form_name.crexendo.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.crexendo.form5;
                                var form_page = config.form_page.crexendo.live.form5;

                                console.log("form5");
                                await webforms_crexendo_f5.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "culpepper":
                var site_culpepper = req.body.site_culpepper;
                var sheetId = config.sheetId.culpepper;
                var ranges = config.ranges.culpepper;
                var range_recipient = config.range_recipient.culpepper;
                var range_thankyou_page = config.range_thankyou_page.culpepper;

                console.log("Site: " + site_culpepper);
                switch (checkbox) {
                    // case "dev":
                    //     var domain = config.domain.culpepper.dev;
                    //     var wp_creds_username = config.wp_creds.culpepper.username;
                    //     var wp_creds_password = config.wp_creds.culpepper.password;
                    //     var launch = config.launch.dev;

                    //     console.log(domain);
                    //     console.log("dev");
                    //     switch (site_culpepper) {
                    //         case "form1":
                    //             var forms = config.forms.culpepper.form1;
                    //             var webforms = config.webforms.culpepper.dev.form1;
                    //             var contact_form_name = config.contact_form_name.culpepper.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.culpepper.form1;
                    //             var form_page = config.form_page.culpepper.dev.form1;

                    //             console.log("form1");
                    //             await webforms_culpepper_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                    case "live":
                        var domain = config.domain.culpepper.live;
                        var wp_creds_username = config.wp_creds.culpepper.username;
                        var wp_creds_password = config.wp_creds.culpepper.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_culpepper) {
                            case "form1":
                                var forms = config.forms.culpepper.form1;
                                var webforms = config.webforms.culpepper.live.form1;
                                var contact_form_name = config.contact_form_name.culpepper.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.culpepper.form1;
                                var form_page = config.form_page.culpepper.live.form1;

                                console.log("form1");
                                await webforms_culpepper_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, sheetId, 
                                    ranges, 
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
            case "dentistryatthebiltmore":
                var site_dentistryatthebiltmore = req.body.site_dentistryatthebiltmore;
                var sheetId = config.sheetId.dentistryatthebiltmore;
                var ranges = config.ranges.dentistryatthebiltmore;
                var range_recipient = config.range_recipient.dentistryatthebiltmore;
                var range_thankyou_page = config.range_thankyou_page.dentistryatthebiltmore;

                console.log("Site: " + site_dentistryatthebiltmore);
                switch (checkbox) {
                    // case "dev":
                    //     var domain = config.domain.dentistryatthebiltmore.dev;
                    //     var wp_creds_username = config.wp_creds.dentistryatthebiltmore.username;
                    //     var wp_creds_password = config.wp_creds.dentistryatthebiltmore.password;
                    //     var launch = config.launch.dev;

                    //     console.log(domain);
                    //     console.log("dev");
                    //     switch (site_dentistryatthebiltmore) {
                    //         case "form1":
                    //             var forms = config.forms.dentistryatthebiltmore.form1;
                    //             var webforms = config.webforms.dentistryatthebiltmore.dev.form1;
                    //             var contact_form_name = config.contact_form_name.dentistryatthebiltmore.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.dentistryatthebiltmore.form1;
                    //             var form_page = config.form_page.dentistryatthebiltmore.dev.form1;

                    //             console.log("form1");
                    //             await webforms_dentistryatthebiltmore_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         case "form2":
                    //             var forms = config.forms.dentistryatthebiltmore.form2;
                    //             var webforms = config.webforms.dentistryatthebiltmore.dev.form2;
                    //             var contact_form_name = config.contact_form_name.dentistryatthebiltmore.form2;
                    //             var contact_form_shortcode = config.contact_form_shortcode.dentistryatthebiltmore.form2;
                    //             var form_page = config.form_page.dentistryatthebiltmore.dev.form2;

                    //             console.log("form2");
                    //             await webforms_dentistryatthebiltmore_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         case "form3":
                    //             var forms = config.forms.dentistryatthebiltmore.form3;
                    //             var webforms = config.webforms.dentistryatthebiltmore.dev.form3;
                    //             var contact_form_name = config.contact_form_name.dentistryatthebiltmore.form3;
                    //             var contact_form_shortcode = config.contact_form_shortcode.dentistryatthebiltmore.form3;
                    //             var form_page = config.form_page.dentistryatthebiltmore.dev.form3;

                    //             console.log("form3");
                    //             await webforms_dentistryatthebiltmore_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                    case "live":
                        var domain = config.domain.dentistryatthebiltmore.live;
                        var wp_creds_username = config.wp_creds.dentistryatthebiltmore.username;
                        var wp_creds_password = config.wp_creds.dentistryatthebiltmore.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_dentistryatthebiltmore) {
                            case "form1":
                                var forms = config.forms.dentistryatthebiltmore.form1;
                                var webforms = config.webforms.dentistryatthebiltmore.live.form1;
                                var contact_form_name = config.contact_form_name.dentistryatthebiltmore.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.dentistryatthebiltmore.form1;
                                var form_page = config.form_page.dentistryatthebiltmore.live.form1;

                                console.log("form1");
                                await webforms_dentistryatthebiltmore_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.dentistryatthebiltmore.form2;
                                var webforms = config.webforms.dentistryatthebiltmore.live.form2;
                                var contact_form_name = config.contact_form_name.dentistryatthebiltmore.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.dentistryatthebiltmore.form2;
                                var form_page = config.form_page.dentistryatthebiltmore.live.form2;

                                console.log("form2");
                                await webforms_dentistryatthebiltmore_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.dentistryatthebiltmore.form3;
                                var webforms = config.webforms.dentistryatthebiltmore.live.form3;
                                var contact_form_name = config.contact_form_name.dentistryatthebiltmore.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.dentistryatthebiltmore.form3;
                                var form_page = config.form_page.dentistryatthebiltmore.live.form3;

                                console.log("form3");
                                await webforms_dentistryatthebiltmore_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_ewingconstruction) {
                            case "form1":
                                var forms = config.forms.ewingconstruction.form1;
                                var webforms = config.webforms.ewingconstruction.dev.form1;
                                var contact_form_name = config.contact_form_name.ewingconstruction.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.ewingconstruction.form1;
                                var form_page = config.form_page.ewingconstruction.dev.form1;

                                console.log("form1");
                                await webforms_ewingconstruction_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.ewingconstruction.live.form1;
                                var contact_form_name = config.contact_form_name.ewingconstruction.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.ewingconstruction.form1;
                                var form_page = config.form_page.ewingconstruction.live.form1;

                                console.log("form1");
                                await webforms_ewingconstruction_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.freddabranyon.dev.form1;
                                var contact_form_name = config.contact_form_name.freddabranyon.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.freddabranyon.form1;
                                var form_page = config.form_page.freddabranyon.dev.form1;

                                console.log("form1");
                                await webforms_freddabranyon_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.freddabranyon.live.form1;
                                var contact_form_name = config.contact_form_name.freddabranyon.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.freddabranyon.form1;
                                var form_page = config.form_page.freddabranyon.live.form1;

                                console.log("form1");
                                await webforms_freddabranyon_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "gatorskin":
                var site_gatorskin = req.body.site_gatorskin;
                var sheetId = config.sheetId.gatorskin;
                var ranges = config.ranges.gatorskin;
                var range_recipient = config.range_recipient.gatorskin;
                var range_thankyou_page = config.range_thankyou_page.gatorskin;

                console.log("Site: " + site_gatorskin);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.gatorskin.dev;
                        var wp_creds_username = config.wp_creds.gatorskin.username;
                        var wp_creds_password = config.wp_creds.gatorskin.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_gatorskin) {
                            case "form1":
                                var forms = config.forms.gatorskin.form1;
                                var webforms = config.webforms.gatorskin.dev.form1;
                                var contact_form_name = config.contact_form_name.gatorskin.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.gatorskin.form1;
                                var form_page = config.form_page.gatorskin.dev.form1;

                                console.log("form1");
                                await webforms_gatorskin_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.gatorskin.live;
                        var wp_creds_username = config.wp_creds.gatorskin.username;
                        var wp_creds_password = config.wp_creds.gatorskin.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_gatorskin) {
                            case "form1":
                                var forms = config.forms.gatorskin.form1;
                                var webforms = config.webforms.gatorskin.live.form1;
                                var contact_form_name = config.contact_form_name.gatorskin.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.gatorskin.form1;
                                var form_page = config.form_page.gatorskin.live.form1;

                                console.log("form1");
                                await webforms_gatorskin_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.frlawgroup.dev.form1;
                                var contact_form_name = config.contact_form_name.frlawgroup.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form1;
                                var form_page = config.form_page.frlawgroup.dev.form1;

                                console.log("form1");
                                await webforms_frlawgroup_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.frlawgroup.form2;
                                var webforms = config.webforms.frlawgroup.dev.form2;
                                var contact_form_name = config.contact_form_name.frlawgroup.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form2;
                                var form_page = config.form_page.frlawgroup.dev.form2;

                                console.log("form2");
                                await webforms_frlawgroup_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.frlawgroup.form3;
                                var webforms = config.webforms.frlawgroup.dev.form3;
                                var contact_form_name = config.contact_form_name.frlawgroup.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form3;
                                var form_page = config.form_page.frlawgroup.dev.form3;

                                console.log("form3");
                                await webforms_frlawgroup_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.frlawgroup.live.form1;
                                var contact_form_name = config.contact_form_name.frlawgroup.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form1;
                                var form_page = config.form_page.frlawgroup.live.form1;

                                console.log("form1");
                                await webforms_frlawgroup_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.frlawgroup.form2;
                                var webforms = config.webforms.frlawgroup.live.form2;
                                var contact_form_name = config.contact_form_name.frlawgroup.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form2;
                                var form_page = config.form_page.frlawgroup.live.form2;

                                console.log("form2");
                                await webforms_frlawgroup_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.frlawgroup.form3;
                                var webforms = config.webforms.frlawgroup.live.form3;
                                var contact_form_name = config.contact_form_name.frlawgroup.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.frlawgroup.form3;
                                var form_page = config.form_page.frlawgroup.live.form3;

                                console.log("form3");
                                await webforms_frlawgroup_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.primemedicalpain.dev.form1;
                    //             var contact_form_name = config.contact_form_name.primemedicalpain.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form1;

                    //             console.log("form1");
                    //             await webforms_primemedicalpain_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         case "form2":
                    //             var forms = config.forms.primemedicalpain.form2;
                    //             var webforms = config.webforms.primemedicalpain.dev.form2;
                    //             var contact_form_name = config.contact_form_name.primemedicalpain.form2;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form2;

                    //             console.log("form2");
                    //             await webforms_primemedicalpain_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.primemedicalpain.live.form1;
                                var contact_form_name = config.contact_form_name.primemedicalpain.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form1;
                                var form_page = config.form_page.primemedicalpain.live.form1;

                                console.log("form1");
                                await webforms_primemedicalpain_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.primemedicalpain.form2;
                                var webforms = config.webforms.primemedicalpain.live.form2;
                                var contact_form_name = config.contact_form_name.primemedicalpain.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.primemedicalpain.form2;
                                var form_page = config.form_page.primemedicalpain.live.form2;

                                console.log("form2");
                                await webforms_primemedicalpain_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.primeview.dev.form1;
                    //             var contact_form_name = config.contact_form_name.primeview.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primeview.form1;

                    //             console.log("form1");
                    //             await webforms_primeview_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         case "form2":
                    //             var forms = config.forms.primeview.form2;
                    //             var webforms = config.webforms.primeview.dev.form2;
                    //             var contact_form_name = config.contact_form_name.primeview.form2;
                    //             var contact_form_shortcode = config.contact_form_shortcode.primeview.form2;

                    //             console.log("form2");
                    //             await webforms_primeview_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.primeview.live.form1;
                                var contact_form_name = config.contact_form_name.primeview.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form1;
                                var form_page = config.form_page.primeview.live.form1;

                                console.log("form1");
                                await webforms_primeview_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.primeview.form2;
                                var webforms = config.webforms.primeview.live.form2;
                                var contact_form_name = config.contact_form_name.primeview.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form2;
                                var form_page = config.form_page.primeview.live.form2;

                                console.log("form2");
                                await webforms_primeview_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.primeview.form3;
                                var webforms = config.webforms.primeview.live.form3;
                                var contact_form_name = config.contact_form_name.primeview.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form3;
                                var form_page = config.form_page.primeview.live.form3;

                                console.log("form3");
                                await webforms_primeview_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.primeview.form4;
                                var webforms = config.webforms.primeview.live.form4;
                                var contact_form_name = config.contact_form_name.primeview.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form4;
                                var form_page = config.form_page.primeview.live.form4;

                                console.log("form4");
                                await webforms_primeview_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form5":
                                var forms = config.forms.primeview.form5;
                                var webforms = config.webforms.primeview.live.form5;
                                var contact_form_name = config.contact_form_name.primeview.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form5;
                                var form_page = config.form_page.primeview.live.form5;

                                console.log("form5");
                                await webforms_primeview_f5.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form6":
                                var forms = config.forms.primeview.form6;
                                var webforms = config.webforms.primeview.live.form6;
                                var contact_form_name = config.contact_form_name.primeview.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form6;
                                var form_page = config.form_page.primeview.live.form6;

                                console.log("form6");
                                await webforms_primeview_f6.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form7":
                                var forms = config.forms.primeview.form7;
                                var webforms = config.webforms.primeview.live.form7;
                                var contact_form_name = config.contact_form_name.primeview.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.primeview.form7;
                                var form_page = config.form_page.primeview.live.form7;

                                console.log("form7");
                                await webforms_primeview_f7.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.randosouthwest.dev.form1;
                                var contact_form_name = config.contact_form_name.randosouthwest.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.randosouthwest.form1;
                                var form_page = config.form_page.randosouthwest.dev.form1;

                                console.log("form1");
                                await webforms_randosouthwest_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.randosouthwest.live.form1;
                                var contact_form_name = config.contact_form_name.randosouthwest.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.randosouthwest.form1;
                                var form_page = config.form_page.randosouthwest.live.form1;

                                console.log("form1");
                                await webforms_randosouthwest_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "renewscal":
                var site_renewscal = req.body.site_renewscal;
                var sheetId = config.sheetId.renewscal;
                var ranges = config.ranges.renewscal;
                var range_recipient = config.range_recipient.renewscal;
                var range_thankyou_page = config.range_thankyou_page.renewscal;
                
                console.log("Site: " + site_renewscal);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.renewscal.dev;
                        var wp_creds_username = config.wp_creds.renewscal.username;
                        var wp_creds_password = config.wp_creds.renewscal.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_renewscal) {
                            case "form1":
                                var forms = config.forms.renewscal.form1;
                                var webforms = config.webforms.renewscal.dev.form1;
                                var contact_form_name = config.contact_form_name.renewscal.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.renewscal.form1;
                                var form_page = config.form_page.renewscal.dev.form1;

                                console.log("form1");
                                await webforms_renewscal_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var forms = config.forms.renewscal.form2;
                                var webforms = config.webforms.renewscal.dev.form2;
                                var contact_form_name = config.contact_form_name.renewscal.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.renewscal.form2;
                                var form_page = config.form_page.renewscal.dev.form2;

                                console.log("form2");
                                await webforms_renewscal_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                        var domain = config.domain.renewscal.live;
                        var wp_creds_username = config.wp_creds.renewscal.username;
                        var wp_creds_password = config.wp_creds.renewscal.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_renewscal) {
                            case "form1":
                                var forms = config.forms.renewscal.form1;
                                var webforms = config.webforms.renewscal.live.form1;
                                var contact_form_name = config.contact_form_name.renewscal.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.renewscal.form1;
                                var form_page = config.form_page.renewscal.live.form1;

                                console.log("form1");
                                await webforms_renewscal_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var forms = config.forms.renewscal.form2;
                                var webforms = config.webforms.renewscal.live.form2;
                                var contact_form_name = config.contact_form_name.renewscal.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.renewscal.form2;
                                var form_page = config.form_page.renewscal.live.form2;

                                console.log("form2");
                                await webforms_renewscal_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
            case "risingsunmartialartsaz":
                var site_risingsunmartialartsaz = req.body.site_risingsunmartialartsaz;
                var sheetId = config.sheetId.risingsunmartialartsaz;
                var ranges = config.ranges.risingsunmartialartsaz;
                var range_recipient = config.range_recipient.risingsunmartialartsaz;
                var range_thankyou_page = config.range_thankyou_page.risingsunmartialartsaz;

                console.log("Site: " + site_risingsunmartialartsaz);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.risingsunmartialartsaz.dev;
                        var wp_creds_username = config.wp_creds.risingsunmartialartsaz.username;
                        var wp_creds_password = config.wp_creds.risingsunmartialartsaz.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_risingsunmartialartsaz) {
                            case "form1":
                                var forms = config.forms.risingsunmartialartsaz.form1;
                                var webforms = config.webforms.risingsunmartialartsaz.dev.form1;
                                var contact_form_name = config.contact_form_name.risingsunmartialartsaz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.risingsunmartialartsaz.form1;
                                var form_page = config.form_page.risingsunmartialartsaz.dev.form1;

                                console.log("form1");
                                await webforms_risingsunmartialartsaz_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.risingsunmartialartsaz.live;
                        var wp_creds_username = config.wp_creds.risingsunmartialartsaz.username;
                        var wp_creds_password = config.wp_creds.risingsunmartialartsaz.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_risingsunmartialartsaz) {
                            case "form1":
                                var forms = config.forms.risingsunmartialartsaz.form1;
                                var webforms = config.webforms.risingsunmartialartsaz.live.form1;
                                var contact_form_name = config.contact_form_name.risingsunmartialartsaz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.risingsunmartialartsaz.form1;
                                var form_page = config.form_page.risingsunmartialartsaz.live.form1;

                                console.log("form1");
                                await webforms_risingsunmartialartsaz_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.indinspect.dev.form1;
                                var contact_form_name = config.contact_form_name.indinspect.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form1;
                                var form_page = config.form_page.indinspect.dev.form1;

                                console.log("form1");
                                await webforms_indinspect_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var forms = config.forms.indinspect.form2;
                                var webforms = config.webforms.indinspect.dev.form2;
                                var contact_form_name = config.contact_form_name.indinspect.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form2;
                                var form_page = config.form_page.indinspect.dev.form2;

                                console.log("form2");
                                await webforms_indinspect_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                        var domain = config.domain.indinspect.live;
                        var wp_creds_username = config.wp_creds.indinspect.username;
                        var wp_creds_password = config.wp_creds.indinspect.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_indinspect) {
                            case "form1":
                                var forms = config.forms.indinspect.form1;
                                var webforms = config.webforms.indinspect.live.form1;
                                var contact_form_name = config.contact_form_name.indinspect.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form1;
                                var form_page = config.form_page.indinspect.live.form1;

                                console.log("form1");
                                await webforms_indinspect_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var forms = config.forms.indinspect.form2;
                                var webforms = config.webforms.indinspect.live.form2;
                                var contact_form_name = config.contact_form_name.indinspect.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.indinspect.form2;
                                var form_page = config.form_page.indinspect.live.form2;

                                console.log("form2");
                                await webforms_indinspect_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
            case "jewelryoutletinc":
                var site_jewelryoutletinc = req.body.site_jewelryoutletinc;
                var sheetId = config.sheetId.jewelryoutletinc;
                var ranges = config.ranges.jewelryoutletinc;
                var range_recipient = config.range_recipient.jewelryoutletinc;
                var range_thankyou_page = config.range_thankyou_page.jewelryoutletinc;

                console.log("Site: " + site_jewelryoutletinc);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.jewelryoutletinc.dev;
                        var wp_creds_username = config.wp_creds.jewelryoutletinc.username;
                        var wp_creds_password = config.wp_creds.jewelryoutletinc.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_jewelryoutletinc) {
                            case "form1":
                                var forms = config.forms.jewelryoutletinc.form1;
                                var webforms = config.webforms.jewelryoutletinc.dev.form1;
                                var contact_form_name = config.contact_form_name.jewelryoutletinc.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.jewelryoutletinc.form1;
                                var form_page = config.form_page.jewelryoutletinc.dev.form1;

                                console.log("form1");
                                await webforms_jewelryoutletinc_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.jewelryoutletinc.form2;
                                var webforms = config.webforms.jewelryoutletinc.dev.form2;
                                var contact_form_name = config.contact_form_name.jewelryoutletinc.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.jewelryoutletinc.form2;
                                var form_page = config.form_page.jewelryoutletinc.dev.form2;

                                console.log("form2");
                                await webforms_jewelryoutletinc_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.jewelryoutletinc.live;
                        var wp_creds_username = config.wp_creds.jewelryoutletinc.username;
                        var wp_creds_password = config.wp_creds.jewelryoutletinc.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_jewelryoutletinc) {
                            case "form1":
                                var forms = config.forms.jewelryoutletinc.form1;
                                var webforms = config.webforms.jewelryoutletinc.live.form1;
                                var contact_form_name = config.contact_form_name.jewelryoutletinc.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.jewelryoutletinc.form1;
                                var form_page = config.form_page.jewelryoutletinc.live.form1;

                                console.log("form1");
                                await webforms_jewelryoutletinc_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.jewelryoutletinc.form2;
                                var webforms = config.webforms.jewelryoutletinc.live.form2;
                                var contact_form_name = config.contact_form_name.jewelryoutletinc.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.jewelryoutletinc.form2;
                                var form_page = config.form_page.jewelryoutletinc.live.form2;

                                console.log("form2");
                                await webforms_jewelryoutletinc_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_judefrancesjewelry) {
                            case "form1":
                                var forms = config.forms.judefrancesjewelry.form1;
                                var webforms = config.webforms.judefrancesjewelry.dev.form1;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form1;
                                var form_page = config.form_page.judefrancesjewelry.dev.form1;

                                console.log("form1");
                                await webforms_judefrancesjewelry_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.judefrancesjewelry.dev.form2;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form2;
                                var form_page = config.form_page.judefrancesjewelry.dev.form2;

                                console.log("form2");
                                await webforms_judefrancesjewelry_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.judefrancesjewelry.dev.form3;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form3;
                                var form_page = config.form_page.judefrancesjewelry.dev.form3;

                                console.log("form3");
                                await webforms_judefrancesjewelry_f3.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.judefrancesjewelry.dev.form4;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form4;
                                var form_page = config.form_page.judefrancesjewelry.dev.form4;

                                console.log("form4");
                                await webforms_judefrancesjewelry_f4.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.judefrancesjewelry.dev.form5;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form5;
                                var form_page = config.form_page.judefrancesjewelry.dev.form5;

                                console.log("form5");
                                await webforms_judefrancesjewelry_f5.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.judefrancesjewelry.dev.form6;
                                var contact_form_name = config.contact_form_name.judefrancesjewelry.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form6;
                                var form_page = config.form_page.judefrancesjewelry.dev.form6;

                                console.log("form6");
                                await webforms_judefrancesjewelry_f6.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                    //     var domain = config.domain.judefrancesjewelry.live;
                    //     var wp_creds_username = config.wp_creds.judefrancesjewelry.username;
                    //     var wp_creds_password = config.wp_creds.judefrancesjewelry.password;
                    //     var launch = config.launch.live;

                    //     console.log(domain);
                    //     console.log("live");
                    //     switch (site_judefrancesjewelry) {
                    //         case "form1":
                    //             var forms = config.forms.judefrancesjewelry.form1;
                    //             var webforms = config.webforms.judefrancesjewelry.live.form1;
                    //             var contact_form_name = config.contact_form_name.judefrancesjewelry.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form1;
                    //             var form_page = config.form_page.judefrancesjewelry.live.form1;

                    //             console.log("form1");
                    //             await webforms_judefrancesjewelry_f1.index(
                    //                 date, 
                    //                 domain, 
                    //                 username, 
                    //                 password, 
                    //                 email, 
                    //                 timestamp, 
                    //                 wp_creds_username, 
                    //                 wp_creds_password, 
                    //                 forms, 
                    //                 sheetId, 
                    //                 ranges, 
                    //                 range_recipient, 
                    //                 range_thankyou_page, 
                    //                 qa_email, 
                    //                 module_name, 
                    //                 launch, 
                    //                 contact_form_name, 
                    //                 contact_form_shortcode, 
                    //                 webforms, 
                    //                 form_page
                    //             );
                    //             break;
                    //         case "form2":
                    //             var forms = config.forms.judefrancesjewelry.form2;
                    //             var webforms = config.webforms.judefrancesjewelry.live.form2;
                    //             var contact_form_name = config.contact_form_name.judefrancesjewelry.form2;
                    //             var contact_form_shortcode = config.contact_form_shortcode.judefrancesjewelry.form2;
                    //             var form_page = config.form_page.judefrancesjewelry.live.form2;

                    //             console.log("form2");
                    //             await webforms_judefrancesjewelry_f2.index(
                    //                 date, 
                    //                 domain, 
                    //                 username, 
                    //                 password, 
                    //                 email, 
                    //                 timestamp, 
                    //                 wp_creds_username, 
                    //                 wp_creds_password, 
                    //                 forms, 
                    //                 sheetId, 
                    //                 ranges, 
                    //                 range_recipient, 
                    //                 range_thankyou_page, 
                    //                 qa_email, 
                    //                 module_name, 
                    //                 launch, 
                    //                 contact_form_name, 
                    //                 contact_form_shortcode, 
                    //                 webforms, 
                    //                 form_page
                    //             );
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

                        console.log(domain);
                        console.log("dev");
                        switch (site_kyrenefamilydentistry) {
                            case "form1":
                                var forms = config.forms.kyrenefamilydentistry.form1;
                                var webforms = config.webforms.kyrenefamilydentistry.dev.form1;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form1;
                                var form_page = config.form_page.kyrenefamilydentistry.dev.form1;

                                console.log("form1");
                                await webforms_kyrenefamilydentistry_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.kyrenefamilydentistry.form2;
                                var webforms = config.webforms.kyrenefamilydentistry.dev.form2;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form2;
                                var form_page = config.form_page.kyrenefamilydentistry.dev.form2;

                                console.log("form2");
                                await webforms_kyrenefamilydentistry_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.kyrenefamilydentistry.live.form1;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form1;
                                var form_page = config.form_page.kyrenefamilydentistry.live.form1;

                                console.log("form1");
                                await webforms_kyrenefamilydentistry_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.kyrenefamilydentistry.form2;
                                var webforms = config.webforms.kyrenefamilydentistry.live.form2;
                                var contact_form_name = config.contact_form_name.kyrenefamilydentistry.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.kyrenefamilydentistry.form2;
                                var form_page = config.form_page.kyrenefamilydentistry.live.form2;

                                console.log("form2");
                                await webforms_kyrenefamilydentistry_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.lignans.dev.form1;
                                var contact_form_name = config.contact_form_name.lignans.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.lignans.form1;
                                var form_page = config.form_page.lignans.dev.form1;

                                console.log("form1");
                                await webforms_lignans_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.lignans.live.form1;
                    //             var contact_form_name = config.contact_form_name.lignans.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.lignans.form1;

                    //             console.log("form1");
                    //             await webforms_lignans_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.natina.dev.form1;
                                var contact_form_name = config.contact_form_name.natina.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.natina.form1;
                                var form_page = config.form_page.natina.dev.form1;

                                console.log("form1");
                                await webforms_natina_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.natina.live.form1;
                    //             var contact_form_name = config.contact_form_name.natina.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.natina.form1;

                    //             console.log("form1");
                    //             await webforms_natina_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form1;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form1;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form1;

                                console.log("form1");
                                await webforms_newhopemedicalcenter_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form2;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form2;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form2;

                                console.log("form2");
                                await webforms_newhopemedicalcenter_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form3;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form3;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form3;

                                console.log("form3");
                                await webforms_newhopemedicalcenter_f3.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form4;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form4;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form4;

                                console.log("form4");
                                await webforms_newhopemedicalcenter_f4.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form5;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form5;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form5;

                                console.log("form5");
                                await webforms_newhopemedicalcenter_f5.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form6;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form6;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form6;

                                console.log("form6");
                                await webforms_newhopemedicalcenter_f6.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.dev.form7;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form7;
                                var form_page = config.form_page.newhopemedicalcenter.dev.form7;

                                console.log("form7");
                                await webforms_newhopemedicalcenter_f7.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form1;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form1;
                                var form_page = config.form_page.newhopemedicalcenter.live.form1;

                                console.log("form1");
                                await webforms_newhopemedicalcenter_f1.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form2;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form2;
                                var form_page = config.form_page.newhopemedicalcenter.live.form2;

                                console.log("form2");
                                await webforms_newhopemedicalcenter_f2.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form3;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form3;
                                var form_page = config.form_page.newhopemedicalcenter.live.form3;

                                console.log("form3");
                                await webforms_newhopemedicalcenter_f3.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form4;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form4;
                                var form_page = config.form_page.newhopemedicalcenter.live.form4;

                                console.log("form4");
                                await webforms_newhopemedicalcenter_f4.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form5;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form5;
                                var form_page = config.form_page.newhopemedicalcenter.live.form5;

                                console.log("form5");
                                await webforms_newhopemedicalcenter_f5.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form6;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form6;
                                var form_page = config.form_page.newhopemedicalcenter.live.form6;

                                console.log("form6");
                                await webforms_newhopemedicalcenter_f6.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.newhopemedicalcenter.live.form7;
                                var contact_form_name = config.contact_form_name.newhopemedicalcenter.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.newhopemedicalcenter.form7;
                                var form_page = config.form_page.newhopemedicalcenter.live.form7;

                                console.log("form7");
                                await webforms_newhopemedicalcenter_f7.index(
                                    date, 
                                    domain, 
                                    username, 
                                    password, 
                                    email, 
                                    timestamp, 
                                    wp_creds_username, 
                                    wp_creds_password, 
                                    forms, 
                                    sheetId, 
                                    ranges, 
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
                                var webforms = config.webforms.optimizex.dev.form1;
                                var contact_form_name = config.contact_form_name.optimizex.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form1;
                                var form_page = config.form_page.optimizex.dev.form1;

                                console.log("form1");
                                await webforms_optimizex_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.optimizex.form2;
                                var webforms = config.webforms.optimizex.dev.form2;
                                var contact_form_name = config.contact_form_name.optimizex.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form2;
                                var form_page = config.form_page.optimizex.dev.form2;

                                console.log("form2");
                                await webforms_optimizex_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.optimizex.form3;
                                var webforms = config.webforms.optimizex.dev.form3;
                                var contact_form_name = config.contact_form_name.optimizex.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form3;
                                var form_page = config.form_page.optimizex.dev.form3;

                                console.log("form3");
                                await webforms_optimizex_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.optimizex.live.form1;
                                var contact_form_name = config.contact_form_name.optimizex.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form1;
                                var form_page = config.form_page.optimizex.live.form1;

                                console.log("form1");
                                await webforms_optimizex_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.optimizex.form2;
                                var webforms = config.webforms.optimizex.live.form2;
                                var contact_form_name = config.contact_form_name.optimizex.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form2;
                                var form_page = config.form_page.optimizex.live.form2;

                                console.log("form2");
                                await webforms_optimizex_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.optimizex.form3;
                                var webforms = config.webforms.optimizex.live.form3;
                                var contact_form_name = config.contact_form_name.optimizex.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.optimizex.form3;
                                var form_page = config.form_page.optimizex.live.form3;

                                console.log("form3");
                                await webforms_optimizex_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "paysondermatology":
                var site_paysondermatology = req.body.site_paysondermatology;
                var sheetId = config.sheetId.paysondermatology;
                var ranges = config.ranges.paysondermatology;
                var range_recipient = config.range_recipient.paysondermatology;
                var range_thankyou_page = config.range_thankyou_page.paysondermatology;

                console.log("Site: " + site_paysondermatology);
                switch (checkbox) {
                    case "dev":
                        var domain = config.domain.paysondermatology.dev;
                        var wp_creds_username = config.wp_creds.paysondermatology.username;
                        var wp_creds_password = config.wp_creds.paysondermatology.password;
                        var launch = config.launch.dev;

                        console.log(domain);
                        console.log("dev");
                        switch (site_paysondermatology) {
                            case "form1":
                                var forms = config.forms.paysondermatology.form1;
                                var webforms = config.webforms.paysondermatology.dev.form1;
                                var contact_form_name = config.contact_form_name.paysondermatology.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.paysondermatology.form1;
                                var form_page = config.form_page.paysondermatology.dev.form1;

                                console.log("form1");
                                await webforms_paysondermatology_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                    case "live":
                        var domain = config.domain.paysondermatology.live;
                        var wp_creds_username = config.wp_creds.paysondermatology.username;
                        var wp_creds_password = config.wp_creds.paysondermatology.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_paysondermatology) {
                            case "form1":
                                var forms = config.forms.paysondermatology.form1;
                                var webforms = config.webforms.paysondermatology.live.form1;
                                var contact_form_name = config.contact_form_name.paysondermatology.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.paysondermatology.form1;
                                var form_page = config.form_page.paysondermatology.live.form1;

                                console.log("form1");
                                await webforms_paysondermatology_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.phoenixritecare.dev.form1;
                    //             var contact_form_name = config.contact_form_name.phoenixritecare.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form1;

                    //             console.log("form1");
                    //             await webforms_phoenixritecare_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.phoenixritecare.live.form1;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form1;
                                var form_page = config.form_page.phoenixritecare.live.form1;

                                console.log("form1");
                                await webforms_phoenixritecare_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.phoenixritecare.form2;
                                var webforms = config.webforms.phoenixritecare.live.form2;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form2;
                                var form_page = config.form_page.phoenixritecare.live.form2;

                                console.log("form2");
                                await webforms_phoenixritecare_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.phoenixritecare.form3;
                                var webforms = config.webforms.phoenixritecare.live.form3;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form3;
                                var form_page = config.form_page.phoenixritecare.live.form3;

                                console.log("form3");
                                await webforms_phoenixritecare_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.phoenixritecare.form4;
                                var webforms = config.webforms.phoenixritecare.live.form4;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form4;
                                var form_page = config.form_page.phoenixritecare.live.form4;

                                console.log("form4");
                                await webforms_phoenixritecare_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form5":
                                var forms = config.forms.phoenixritecare.form5;
                                var webforms = config.webforms.phoenixritecare.live.form5;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form5;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form5;
                                var form_page = config.form_page.phoenixritecare.live.form5;

                                console.log("form5");
                                await webforms_phoenixritecare_f5.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form6":
                                var forms = config.forms.phoenixritecare.form6;
                                var webforms = config.webforms.phoenixritecare.live.form6;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form6;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form6;
                                var form_page = config.form_page.phoenixritecare.live.form6;

                                console.log("form6");
                                await webforms_phoenixritecare_f6.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form7":
                                var forms = config.forms.phoenixritecare.form7;
                                var webforms = config.webforms.phoenixritecare.live.form7;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form7;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form7;
                                var form_page = config.form_page.phoenixritecare.live.form7;

                                console.log("form7");
                                await webforms_phoenixritecare_f7.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form8":
                                var forms = config.forms.phoenixritecare.form8;
                                var webforms = config.webforms.phoenixritecare.live.form8;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form8;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form8;
                                var form_page = config.form_page.phoenixritecare.live.form8;

                                console.log("form8");
                                await webforms_phoenixritecare_f8.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form9":
                                var forms = config.forms.phoenixritecare.form9;
                                var webforms = config.webforms.phoenixritecare.live.form9;
                                var contact_form_name = config.contact_form_name.phoenixritecare.form9;
                                var contact_form_shortcode = config.contact_form_shortcode.phoenixritecare.form9;
                                var form_page = config.form_page.phoenixritecare.live.form9;

                                console.log("form9");
                                await webforms_phoenixritecare_f9.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.sellusyourcaraz.dev.form1;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form1;
                                var form_page = config.form_page.sellusyourcaraz.dev.form1;

                                console.log("form1");
                                await webforms_sellusyourcaraz_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.sellusyourcaraz.form2;
                                var webforms = config.webforms.sellusyourcaraz.dev.form2;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form2;
                                var form_page = config.form_page.sellusyourcaraz.dev.form2;

                                console.log("form2");
                                await webforms_sellusyourcaraz_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.sellusyourcaraz.form3;
                                var webforms = config.webforms.sellusyourcaraz.dev.form3;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form3;
                                var form_page = config.form_page.sellusyourcaraz.dev.form3;

                                console.log("form3");
                                await webforms_sellusyourcaraz_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.sellusyourcaraz.live.form1;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form1;
                                var form_page = config.form_page.sellusyourcaraz.live.form1;

                                console.log("form1");
                                await webforms_sellusyourcaraz_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.sellusyourcaraz.form2;
                                var webforms = config.webforms.sellusyourcaraz.live.form2;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form2;
                                var form_page = config.form_page.sellusyourcaraz.live.form2;

                                console.log("form2");
                                await webforms_sellusyourcaraz_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.sellusyourcaraz.form3;
                                var webforms = config.webforms.sellusyourcaraz.live.form3;
                                var contact_form_name = config.contact_form_name.sellusyourcaraz.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.sellusyourcaraz.form3;
                                var form_page = config.form_page.sellusyourcaraz.live.form3;

                                console.log("form3");
                                await webforms_sellusyourcaraz_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.sunrisejewelryusa.dev.form1;
                                var contact_form_name = config.contact_form_name.sunrisejewelryusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sunrisejewelryusa.form1;
                                var form_page = config.form_page.sunrisejewelryusa.dev.form1;

                                console.log("form1");
                                await webforms_sunrisejewelryusa_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.sunrisejewelryusa.live.form1;
                                var contact_form_name = config.contact_form_name.sunrisejewelryusa.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.sunrisejewelryusa.form1;
                                var form_page = config.form_page.sunrisejewelryusa.live.form1;

                                console.log("form1");
                                await webforms_sunrisejewelryusa_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                                var webforms = config.webforms.versatile.dev.form1;
                                var contact_form_name = config.contact_form_name.versatile.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form1;
                                var form_page = config.form_page.versatile.dev.form1;

                                console.log("form1");
                                await webforms_versatile_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form2":
                                var forms = config.forms.versatile.form2;
                                var webforms = config.webforms.versatile.dev.form2;
                                var contact_form_name = config.contact_form_name.versatile.form2;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form2;
                                var form_page = config.form_page.versatile.dev.form2;

                                console.log("form2");
                                await webforms_versatile_f2.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form3":
                                var forms = config.forms.versatile.form3;
                                var webforms = config.webforms.versatile.dev.form3;
                                var contact_form_name = config.contact_form_name.versatile.form3;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form3;
                                var form_page = config.form_page.versatile.dev.form3;

                                console.log("form3");
                                await webforms_versatile_f3.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            case "form4":
                                var forms = config.forms.versatile.form4;
                                var webforms = config.webforms.versatile.dev.form4;
                                var contact_form_name = config.contact_form_name.versatile.form4;
                                var contact_form_shortcode = config.contact_form_shortcode.versatile.form4;
                                var form_page = config.form_page.versatile.dev.form4;

                                console.log("form4");
                                await webforms_versatile_f4.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.versatile.live.form1;
                    //             var contact_form_name = config.contact_form_name.versatile.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.versatile.form1;

                    //             console.log("form1");
                    //             await webforms_versatile_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                }
                break;
            case "virtualassistantsoutsourcing":
                var site_virtualassistantsoutsourcing = req.body.site_virtualassistantsoutsourcing;
                var sheetId = config.sheetId.virtualassistantsoutsourcing;
                var ranges = config.ranges.virtualassistantsoutsourcing;
                var range_recipient = config.range_recipient.virtualassistantsoutsourcing;
                var range_thankyou_page = config.range_thankyou_page.virtualassistantsoutsourcing;

                console.log("Site: " + site_virtualassistantsoutsourcing);
                switch (checkbox) {
                    // case "dev":
                    //     var domain = config.domain.virtualassistantsoutsourcing.dev;
                    //     var wp_creds_username = config.wp_creds.virtualassistantsoutsourcing.username;
                    //     var wp_creds_password = config.wp_creds.virtualassistantsoutsourcing.password;
                    //     var launch = config.launch.dev;

                    //     console.log(domain);
                    //     console.log("dev");
                    //     switch (site_virtualassistantsoutsourcing) {
                    //         case "form1":
                    //             var forms = config.forms.virtualassistantsoutsourcing.form1;
                    //             var webforms = config.webforms.virtualassistantsoutsourcing.dev.form1;
                    //             var contact_form_name = config.contact_form_name.virtualassistantsoutsourcing.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.virtualassistantsoutsourcing.form1;
                    //             var form_page = config.form_page.virtualassistantsoutsourcing.dev.form1;

                    //             console.log("form1");
                    //             await webforms_virtualassistantsoutsourcing_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    //     break;
                    case "live":
                        var domain = config.domain.virtualassistantsoutsourcing.live;
                        var wp_creds_username = config.wp_creds.virtualassistantsoutsourcing.username;
                        var wp_creds_password = config.wp_creds.virtualassistantsoutsourcing.password;
                        var launch = config.launch.live;

                        console.log(domain);
                        console.log("live");
                        switch (site_virtualassistantsoutsourcing) {
                            case "form1":
                                var forms = config.forms.virtualassistantsoutsourcing.form1;
                                var webforms = config.webforms.virtualassistantsoutsourcing.live.form1;
                                var contact_form_name = config.contact_form_name.virtualassistantsoutsourcing.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.virtualassistantsoutsourcing.form1;
                                var form_page = config.form_page.virtualassistantsoutsourcing.live.form1;

                                console.log("form1");
                                await webforms_virtualassistantsoutsourcing_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
                                break;
                            default:
                                break;
                        }
                        break;
                }
                break;
            case "solutionsforum":
                var site_solutionsforum = req.body.site_solutionsforum;
                var sheetId = config.sheetId.solutionsforum;
                var ranges = config.ranges.solutionsforum;
                var range_recipient = config.range_recipient.solutionsforum;
                var range_thankyou_page = config.range_thankyou_page.solutionsforum;

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
                                var webforms = config.webforms.solutionsforum.dev.form1;
                                var contact_form_name = config.contact_form_name.solutionsforum.form1;
                                var contact_form_shortcode = config.contact_form_shortcode.solutionsforum.form1;
                                var form_page = config.form_page.solutionsforum.dev.form1;

                                console.log("form1");
                                await webforms_solutionsforum_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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
                    //             var webforms = config.webforms.solutionsforum.live.form1;
                    //             var contact_form_name = config.contact_form_name.solutionsforum.form1;
                    //             var contact_form_shortcode = config.contact_form_shortcode.solutionsforum.form1;

                    //             console.log("form1");
                    //             await webforms_solutionsforum_f1.index(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
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

    for (let index = 0; index < config.usernameData_devs.length; index++) {
        if (this.userId === config.usernameData_devs[index]) {
            res.send(success_msg);
        }    
    }

    for (let index = 0; index < config.usernameData_marketing.length; index++) {
        if (this.userId === config.usernameData_marketing[index]) {
            res.send(success_msg_marketing);
        }    
    }
});

app.post('/post/newsletter', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var checkbox = req.body.checkbox;

    try {
        switch (checkbox) {
            // case "dev":
            //     await newsletter.executeTest(timestamp, username, password);
            //     break;
            case "live":
                var domain = config.domain.freddabranyon.live;
                console.log(username);
                console.log(password);
                console.log(checkbox);
                console.log(domain);
                await newsletter.executeTest(timestamp, username, password, domain);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/nitropack', async (req, res) => {
    try {
        await nitropack.index(timestamp);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/nitropack/reports', async (req, res) => {
    try {
        await nitropack_reports.displayFails(timestamp);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/wpm', async (req, res) => {
    try {
        await wpm.index(timestamp);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/wpm/reports', async (req, res) => {
    try {
        await wpm_reports.displaySitesToBeReported(timestamp);
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
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.samsung;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.samsung_galaxy_m30s;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version2":
                        var versions = config.versions.mobile.version2;
                        var brand = config.brand.mobile.google;
                        var device_mobile = config.device_mobile.google_pixel_5_5g;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.google;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.google_pixel_5_5g;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version3":
                        var versions = config.versions.mobile.version3;
                        var brand = config.brand.mobile.one_plus;
                        var device_mobile = config.device_mobile.one_plus_9;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.oneplus;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.one_plus_9;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version4":
                        var versions = config.versions.mobile.version4;
                        var brand = config.brand.mobile.xiaomi;
                        var device_mobile = config.device_mobile.xiaomi_mi_11;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.xiaomi;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.xiaomi_mi_11;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version5":
                        var versions = config.versions.mobile.version5;
                        var brand = config.brand.mobile.real_me;
                        var device_mobile = config.device_mobile.real_me_5;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.realme;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.real_me_5;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version6":
                        var versions = config.versions.mobile.version6;
                        var brand = config.brand.mobile.huawei;
                        var device_mobile = config.device_mobile.huawei_p30_pro;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.huawei;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.huawei_p30_pro;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version7":
                        var versions = config.versions.mobile.version7;
                        var brand = config.brand.mobile.sony;
                        var device_mobile = config.device_mobile.sony_xperia_xz2;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.sony;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.sony_xperia_xz2;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version8":
                        var versions = config.versions.mobile.version8;
                        var brand = config.brand.mobile.motorola;
                        var device_mobile = config.device_mobile.moto_g6;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.motorola;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.moto_g6;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version9":
                        var versions = config.versions.mobile.version9;
                        var brand = config.brand.mobile.lg;
                        var device_mobile = config.device_mobile.lg_g6;
                        var os_mobile = config.os_mobile.android;
                        var brand_mobile = config.brand_mobile.lg;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.lg_g6;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version10":
                        var versions = config.versions.mobile.version10;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_13_pro_max;
                        var os_mobile = config.os_mobile.ios;
                        var brand_mobile = config.brand_mobile.iphone;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.iphone_13_pro_max;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version11":
                        var versions = config.versions.mobile.version11;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_13_pro;
                        var os_mobile = config.os_mobile.ios;
                        var brand_mobile = config.brand_mobile.iphone;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.iphone_13_pro;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version12":
                        var versions = config.versions.mobile.version12;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_13;
                        var os_mobile = config.os_mobile.ios;
                        var brand_mobile = config.brand_mobile.iphone;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.iphone_13;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version13":
                        var versions = config.versions.mobile.version13;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_12_pro_max;
                        var os_mobile = config.os_mobile.ios;
                        var brand_mobile = config.brand_mobile.iphone;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.iphone_12_pro_max;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version14":
                        var versions = config.versions.mobile.version14;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_11_pro_max;
                        var os_mobile = config.os_mobile.ios;
                        var brand_mobile = config.brand_mobile.iphone;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.iphone_11_pro_max;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
                        );
                        break;
                    case "version15":
                        var versions = config.versions.mobile.version15;
                        var brand = config.brand.mobile.iphone;
                        var device_mobile = config.device_mobile.iphone_x;
                        var os_mobile = config.os_mobile.ios;
                        var brand_mobile = config.brand_mobile.iphone;
                        var deviceOrOS_mobile = config.deviceOrOS_mobile.iphone_x;

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
                            device_mobile,
                            os_mobile,
                            brand_mobile,
                            deviceOrOS_mobile
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
                        var os_tablet = config.os_tablet.ios;
                        var brand_tablet = config.brand_tablet.ipad;
                        var deviceOrOS_tablet = config.deviceOrOS_tablet.ipad_air_4th_gen;

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
                            device_tablet,
                            os_tablet,
                            brand_tablet,
                            deviceOrOS_tablet
                        );
                        break;
                    case "version2":
                        var versions = config.versions.tablet.version2;
                        var brand = config.brand.mobile.samsung;
                        var device_tablet = config.device_tablet.galaxy_tab_s7_plus;
                        var os_tablet = config.os_tablet.android;
                        var brand_tablet = config.brand_tablet.samsung;
                        var deviceOrOS_tablet = config.deviceOrOS_tablet.galaxy_tab_s7_plus;

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
                            device_tablet,
                            os_tablet,
                            brand_tablet,
                            deviceOrOS_tablet
                        );
                        break;
                    case "version3":
                        var versions = config.versions.tablet.version3;
                        var brand = config.brand.mobile.samsung;
                        var device_tablet = config.device_tablet.galaxy_tab_s6;
                        var os_tablet = config.os_tablet.android;
                        var brand_tablet = config.brand_tablet.samsung;
                        var deviceOrOS_tablet = config.deviceOrOS_tablet.galaxy_tab_s6;

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
                            device_tablet,
                            os_tablet,
                            brand_tablet,
                            deviceOrOS_tablet
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


