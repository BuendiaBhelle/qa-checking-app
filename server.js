const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const checkout_sunrisejewelryusa_p1 = require("./modules/checkout/sunrisejewelryusa/product1/index");
const checkout_sunrisejewelryusa_p2 = require("./modules/checkout/sunrisejewelryusa/product2/index");
const image_optimization = require("./modules/image_optimization/image_optimization");
const visibility = require("./modules/visibility/visibility");
const webforms_accidentchiropracticaz_f1 = require("./modules/webforms/accidentchiropracticaz/form1/index");
const webforms_accidentchiropracticaz_f2 = require("./modules/webforms/accidentchiropracticaz/form2/index");
const webforms_advancedimagemedspa_f1 = require("./modules/webforms/advancedimagemedspa/form1/index");
const webforms_advancedimagemedspa_f2 = require("./modules/webforms/advancedimagemedspa/form2/index");
const webforms_advancedimagemedspa_f3 = require("./modules/webforms/advancedimagemedspa/form3/index");
const webforms_aerialengagement_f1 = require("./modules/webforms/aerialengagement/form1/index");
const webforms_americanleatherusa_f1 = require("./modules/webforms/americanleatherusa/form1/index");
const webforms_andresperezjurado_f1 = require("./modules/webforms/andresperezjurado/form1/index");
const responsiveness = require("./modules/responsiveness/responsiveness");

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());

const success_msg = 'Success.<br><br><a href="http://localhost:3000/">Return home</a>';


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/post/checkout', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    const checkout = req.body.checkout;
    const product = req.body.product;
    console.log("email: " + email);
    console.log("checkout: " + checkout);
    console.log("product: " + product);

    console.log("username_server: " + username);
    console.log("password_server: " + password);
    try {
        switch (checkout) {
            case "sunrisejewelryusa":
                switch (product) {
                    case "product1":
                        console.log("checkout: " + checkout);
                        console.log("product1 selected.");
                        checkout_sunrisejewelryusa_p1.index(username, password, email);
                        break;
                    case "product2":
                        console.log("checkout: " + checkout);
                        console.log("product2 selected.");
                        checkout_sunrisejewelryusa_p2.index(username, password, email);
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
    var url = req.body.url;
    console.log("URL: " + url);
    try {
        image_optimization.imageOptimization(url);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});

app.post('/post/visibility', function(req, res) {
    const site_name = req.body.site_name;
    console.log("Site Name: " + site_name);
    try {
        visibility.chrome(site_name);
        visibility.firefox(site_name);
        visibility.edge(site_name);
    } catch (error) {
        console.log(error);
    }
    res.send(success_msg);
});


app.post('/post/webforms', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var site = req.body.site;
    var checkbox = req.body.checkbox;
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
                                webforms_accidentchiropracticaz_f1.index(domain, checkbox, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_accidentchiropracticaz_f2.index(domain, checkbox, username, password, email);
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
                                webforms_accidentchiropracticaz_f1.index(domain, checkbox, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_accidentchiropracticaz_f2.index(domain, checkbox, username, password, email);
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
                                webforms_advancedimagemedspa_f1.index(domain, checkbox, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_advancedimagemedspa_f2.index(domain, checkbox, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_advancedimagemedspa_f3.index(domain, checkbox, username, password, email);
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
                                webforms_advancedimagemedspa_f1.index(domain, checkbox, username, password, email);
                                break;
                            case "form2":
                                console.log("form2");
                                webforms_advancedimagemedspa_f2.index(domain, checkbox, username, password, email);
                                break;
                            case "form3":
                                console.log("form3");
                                webforms_advancedimagemedspa_f3.index(domain, checkbox, username, password, email);
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
                                webforms_aerialengagement_f1.index(domain, checkbox, username, password, email);
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
                                webforms_aerialengagement_f1.index(domain, checkbox, username, password, email);
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
                                webforms_americanleatherusa_f1.index(domain, checkbox, username, password, email)
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
                                webforms_americanleatherusa_f1.index(domain, checkbox, username, password, email);
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
                                webforms_andresperezjurado_f1.index(domain, checkbox, username, password, email);
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
                                // webforms_andresperezjurado.site5_form1(domain, checkbox, username, password, email);
                                webforms_andresperezjurado_f1.index(domain, checkbox, username, password, email);
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
                        responsiveness.desktop1(url, email, password);
                        break;
                    case "version2":
                        responsiveness.desktop2(url, email, password);
                        break;
                    case "version3":
                        responsiveness.desktop3(url, email, password);
                        break;
                    case "version4":
                        responsiveness.desktop4(url, email, password);
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
                        responsiveness.android1(url, email, password);
                        break;
                    case "version2":
                        responsiveness.android2(url, email, password);
                        break;
                    case "version3":
                        responsiveness.android3(url, email, password);
                        break;
                    case "version4":
                        responsiveness.android4(url, email, password);
                        break;
                    case "version5":
                        responsiveness.android5(url, email, password);
                        break;
                    case "version6":
                        responsiveness.android6(url, email, password);
                        break;
                    case "version7":
                        responsiveness.android7(url, email, password);
                        break;
                    case "version8":
                        responsiveness.android8(url, email, password);
                        break;
                    case "version9":
                        responsiveness.android9(url, email, password);
                        break;
                    case "version10":
                        responsiveness.ios1(url, email, password);
                        break;
                    case "version11":
                        responsiveness.ios2(url, email, password);
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
                        responsiveness.tablet1(url, email, password);
                        break;
                    case "version2":
                        responsiveness.tablet2(url, email, password);
                        break;
                    case "version3":
                        responsiveness.tablet3(url, email, password);
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


