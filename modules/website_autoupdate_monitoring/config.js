const {google} = require("googleapis");
const config_webforms = require("../webforms/config");
const config_server = require("../../config");


const auth = config_webforms.auth;
const spreadsheetId = "1j8xVmSmWSD90vNcGA_kU9H7kaJxq5crpDNUVaAkELsY";

let credentials = [
    ["https://www.randosouthwest.com", config_server.wp_creds.randosouthwest.username, config_server.wp_creds.randosouthwest.password],
    ["https://www.accidentchiropracticaz.com", config_server.wp_creds.accidentchiropracticaz.username, config_server.wp_creds.accidentchiropracticaz.password],
    ["https://www.aerotecinternational.com", "pvadmin", "aK^iiLyljF4%18vTg9xDYEvi"],
    ["https://www.alliancedermatology.com", "pvadmin", "ExvkE3I7$olXiHhAuDt6RJld"],
    ["https://www.buckeyelot.com", "pvadmin", "kP2HZYs!HWywFW@ZgPeI7vhw"],
    ["https://www.dentistryatthebiltmore.com", config_server.wp_creds.dentistryatthebiltmore.username, config_server.wp_creds.dentistryatthebiltmore.password],
    ["https://www.fccongoaz.com", "pvadmin", "fIB{D27)5}sv"],
    ["https://www.freddabranyon.com", config_server.wp_creds.freddabranyon.username, config_server.wp_creds.freddabranyon.password],
    ["https://www.gebionline.com", "pvadmin", "lx&zdQ%%T@4bpk4tgf&DPDBJ"],
    ["https://www.genovation.com", "PrimeViewAdmin", "yC6sI5wA3fN8mX3i"],
    ["https://gentryrealestategroup.com", "pvadmin", "K%LeQ$^xbiNP*DOVZxej#hOW"],
    ["https://www.inspired-engagement.com", "pvadmin", "Jvr2fcF(f8Hzg@*NEr6$djVS"],
    ["https://www.inspirednetworks.com", "pvadmin", "lN2xJ9hS5mA2pF1u"],
    ["https://www.johnsoninjurylaw.com", "johngregadmin", "M2^NNycoR&7dmcdadek)o3TQ"],
    ["https://keenindependent.com", "pvadmin", "qn%kShjd$mLxZJQpiO7CWVSS"],
    ["https://www.mhsjackrabbitsfoundation.com", "pvadmin", "&RguT&P^vurj@Jl3Rn@VuszM"],
    ["https://www.myseoagency.com", "pvadmin", "v6ahbRXTHf87nbmM2)464zxt"],
    ["https://www.ngaaz.org", "pvadmin", "iP2rKyIGJAq2FEAse%7X*x(N"],
    ["https://www.ocmedspa.com", "pvadmin", "lIe&eLZeO&r389UMvUbJL7F$"],
    ["https://www.onlinebrandreputation.com", "pvadmin", "Q)Q9Fvzj3N$EvTp3cBEWk$Xv"],
    ["https://www.optimizex.com", config_server.wp_creds.optimizex.username, config_server.wp_creds.optimizex.password],
    ["https://search.optimizex.com", "pvadmin", "F6Eth%A@)Srqn^V7SM!QdoQO"],
    ["https://www.orionisg.com", "pvadmin", "5i3JHI#c9aVcIjwyWBAz7CRI"],
    ["https://www.oxlocalsearch.com", "pvadmin", "bn@**R*DCbL2ldQS!#P(YPEZ"],
    ["https://www.pmrtimeshares.com", "pvadmin", "NMoiE$!uoOMwiE1vxxd05tH*"],
    ["https://www.suncliffsedona.com", "pvadmin", "1YdGjQHCcHPJ4w81MeSd!Q(u"],
    ["https://www.thesolutionsforum.net", "pvadmin", "p@iWoX3pvx0r2"],
    ["https://www.jmrestoration.com", "pvadmin", "GUqW!R@XNUj2!s2m#nULQXM5"],
    ["https://www.valuesquest.com", "pvadmin", "Js*h6qXd(t)krrAECi0T5jbV"],
    ["https://www.paysondermatology.com", config_server.wp_creds.paysondermatology.username, config_server.wp_creds.paysondermatology.password],
    ["https://www.teamleadership.org", "pvadmin", "2yob9g2J5Y3^8e4Af#b56p@5"],
    ["https://www.kyotoscottsdale.com", "pvadmin", "MHWzM!JlkCTmtVmHMuCY(lHk"],
    ["https://www.americanwestpallets.com", "pvadmin", "7*xo67gdN0sYqNKJs)6AaOEB"],
    ["https://www.coachingliteracy.com", "pvadmin", "dzf19x(8cIGpLCuzs9ffe5V5"],
    ["https://www.drmandiconway.com", "pvadmin", "N*zeX3ye27T@IUZVw*c7!96T"],
    ["https://www.hospiceofyuma.com", "pvadmin", "NzORBXnz6!zqzG*tcDuTecPy"],
    ["https://www.drgholampeyman.com", "pvadmin", "^GXaoAwIAdZ20HjE$tCovvtF"],
    ["https://www.pressuresystemsinc.com", "pvadmin", "XkWb@#BuZJfcDTsqp3MDlp4h"],
    ["https://www.risingsunmartialartsaz.com", config_server.wp_creds.risingsunmartialartsaz.username, config_server.wp_creds.risingsunmartialartsaz.password],
    ["https://www.primeview.com", config_server.wp_creds.primeview.username, config_server.wp_creds.primeview.password],
    ["https://www.americanleatherusa.com", config_server.wp_creds.americanleatherusa.username, config_server.wp_creds.americanleatherusa.password],
    ["https://www.sunrisejewelryusa.com",  config_server.wp_creds.sunrisejewelryusa.username, config_server.wp_creds.sunrisejewelryusa.password],
    ["https://www.andresperezjurado.com", config_server.wp_creds.andresperezjurado.username, config_server.wp_creds.andresperezjurado.password],
    ["https://www.jewelryoutletinc.com", config_server.wp_creds.jewelryoutletinc.username, config_server.wp_creds.jewelryoutletinc.password],
    ["https://www.advancedimagemedspa.com", config_server.wp_creds.advancedimagemedspa.username, config_server.wp_creds.advancedimagemedspa.password],
    ["https://www.arizonaretinalspecialists.com", "pvadmin", "#tyG0P3zd(I%pl@sXNin%3(R"],
    ["https://amblaw.com", "pvadmin", "cXID^LR&KtydwZ58T2)MxA&$"],
    ["https://www.amissionofmercy.org", "pvadmin", "fFcflnUTHV4g@u6^KZ$3Xd5g"],
    ["https://www.biltmoreloanandjewelry.com", "pvadmin", '^WMWpmY%3#bL09$Fd)g)g*WQ'],
    ["https://www.everythingjustrocks.com", "pvadmin", "bW#Cnv0CjQsrPjC%$oS@&)nM"],
    ["https://www.natina.com", config_server.wp_creds.natina.username, config_server.wp_creds.natina.password],
    ["https://www.frlawgroup.com", config_server.wp_creds.frlawgroup.username, config_server.wp_creds.frlawgroup.password],
    ["https://www.indinspect.com", config_server.wp_creds.indinspect.username, config_server.wp_creds.indinspect.password],
    ["https://www.kyrenefamilydentistry.com", config_server.wp_creds.kyrenefamilydentistry.username, config_server.wp_creds.kyrenefamilydentistry.password],
    ["https://www.newhopemedicalcenter.com", config_server.wp_creds.newhopemedicalcenter.username, config_server.wp_creds.newhopemedicalcenter.password],
    ["https://www.opakapakagrillandbar.com", "pvadmin", "$V(NGs990jNbZaoN^rAE5yMT"],
    ["https://www.signsofthetimesaz.com", "pvadmin", "AFMC(/cH5NKH"],
    ["https://www.southwestdirectmortgage.com", "pvadmin", 'xD3tC5jM0fS8hG9b'],
    ["https://www.turbineaero.com", "pvadmin", "cuxu0L!K9&biLI9leDeGFP9z"],
    ["https://www.torontostravel.com", "magico", "pzBG1*$e$liNT3rG7wp&UX&K"],
    ["https://www.westechrecyclers.com", "pvadmin", "hOq485dHKLUUs1$gap6qu$iI"],
    ["https://www.collisioncenternorthscottsdale.com", config_server.wp_creds.collisioncenternorthscottsdale.username, config_server.wp_creds.collisioncenternorthscottsdale.password],
    ["https://www.trezpro.com", "vivoclaro", "!vivoClaro3214122!"],
    ["https://www.ucookhawaii.com", "pvadmin", "0!kr4XAwPuqZc2&tR6)Va0&s"],
    ["https://www.primemedicalpain.com", config_server.wp_creds.primemedicalpain.username, config_server.wp_creds.primemedicalpain.password],
    ["https://www.judefrances.com", config_server.wp_creds.judefrancesjewelry.username, config_server.wp_creds.judefrancesjewelry.password],
    ["https://www.aerialengagement.com", config_server.wp_creds.aerialengagement.username, config_server.wp_creds.aerialengagement.password],
    ["https://www.ewingconstruction.com", config_server.wp_creds.ewingconstruction.username, config_server.wp_creds.ewingconstruction.password],
    ["https://www.buckeyederm.com", config_server.wp_creds.buckeyederm.username, config_server.wp_creds.buckeyederm.password],
    ["https://www.jelleyvision.com", "pvadmin", "[zJdPOoINX[8"],
    ["https://www.virtualassistantsoutsourcing.com", config_server.wp_creds.virtualassistantsoutsourcing.username, config_server.wp_creds.virtualassistantsoutsourcing.password],
    ["https://staffportal.optimizex.com", "pvadmin", "qJ7Xo$LFMFPng@2GXTgdcBns"],
    ["https://www.gatorskin.us", config_server.wp_creds.gatorskin.username, config_server.wp_creds.gatorskin.password],
    ["https://www.thehairextensioncompany.com", config_server.wp_creds.canyonfallshairextensioncompany.username, config_server.wp_creds.canyonfallshairextensioncompany.password],
    ["https://www.culpepper-associates.com", config_server.wp_creds.culpepper.username, config_server.wp_creds.culpepper.password],
    ["https://www.phoenixritecare.org", config_server.wp_creds.phoenixritecare.username, config_server.wp_creds.phoenixritecare.password],
    ["https://www.bbllessons.com", "pvadmin", "pv3p@w0r$dtyo"],
    ["https://www.thesolutionsforum.com", config_server.wp_creds.solutionsforum.username, config_server.wp_creds.solutionsforum.password],
    ["https://www.primeleisures.com", "pvadmin", "mK4:rQ5{dI6?zO8?"],
    ["https://www.businesstrendstoday.com", "pvadmin", "|fWs[qDSGrO6"],
    ["https://www.mcbuildingmaintenance.com", config_server.wp_creds.mcbuildingmaintenance.username, config_server.wp_creds.mcbuildingmaintenance.password],
    ["https://www.sunpressurewash.com", "pvadmin", "dZ*8AKwqRk1"],
    ["https://www.airgain.com", "pvadmin", "rl5V@8MeJq@U"],
    ["https://www.jechvac.com", "pvadmin", "{E>e|9wS|6sf"],
    ["https://www.maintenancebest.com", "pvadmin", "7(%QF2GGHQ_r"],
    ["https://www.goimpacttechnology.com", "pvadmin", "ZHput2^7%r>n"],
    ["https://www.hbmgov.com", "pvadmin", "uWX.>62hP7[d"],
    ["https://www.truckerpaths.com", "pvadmin", "3gOtl{2OaV9]"]

]



let frontend_sites = [
    "https://www.randosouthwest.com",
    "https://www.accidentchiropracticaz.com",
    "https://www.aerotecinternational.com",
    "https://www.alliancedermatology.com",
    "https://www.buckeyelot.com",
    "https://pondsafeproducts.com/",
    "https://www.dentistryatthebiltmore.com",
    "https://www.fccongoaz.com",
    "https://www.freddabranyon.com",
    "https://www.gebionline.com",
    "https://www.genovation.com",
    "https://gentryrealestategroup.com",
    "https://www.inspired-engagement.com",
    "https://www.inspirednetworks.com",
    "https://www.johnsoninjurylaw.com",
    "https://www.keenindependent.com",
    "https://www.mhsjackrabbitsfoundation.com",
    "https://www.myseoagency.com",
    "https://www.caldwellcountybbq.com",
    "https://www.ngaaz.org",
    "https://www.ocmedspa.com",
    "https://www.onlinebrandreputation.com",
    "https://www.optimizex.com",
    "https://search.optimizex.com",
    "https://www.orionisg.com",
    "https://www.oxlocalsearch.com",
    "https://www.pmrtimeshares.com",
    "https://www.suncliffsedona.com",
    "https://www.thesolutionsforum.net",
    "https://www.jmrestoration.com",
    "https://www.valuesquest.com",
    "https://www.elevatebytempusjets.com",
    "https://www.paysondermatology.com",
    "https://www.teamleadership.org",
    "https://www.kyotoscottsdale.com",
    "https://www.americanwestpallets.com",
    "https://www.coachingliteracy.com",
    "https://www.drmandiconway.com",
    "https://www.hospiceofyuma.com",
    "https://www.drgholampeyman.com",
    "https://www.pressuresystemsinc.com",
    "https://www.risingsunmartialartsaz.com",
    "https://www.primeview.com",
    "https://www.americanleatherusa.com",
    "https://www.sunrisejewelryusa.com",
    "https://www.andresperezjurado.com",
    "https://www.jewelryoutletinc.com",
    "https://www.advancedimagemedspa.com",
    "https://www.arizonaretinalspecialists.com",
    "https://www.amblaw.com",
    "https://www.amissionofmercy.org",
    "https://www.biltmoreloanandjewelry.com",
    "https://www.everythingjustrocks.com",
    "https://www.natina.com",
    "https://www.frlawgroup.com",
    "https://www.goldsteindiamonds.com",
    "https://www.indinspect.com",
    "https://www.kyrenefamilydentistry.com",
    "https://www.newhopemedicalcenter.com",
    "https://www.opakapakagrillandbar.com",
    "https://www.signsofthetimesaz.com",
    "https://www.southwestdirectmortgage.com",
    "https://www.theasoe.com",
    "https://www.turbineaero.com",
    "https://www.torontostravel.com",
    "https://www.westechrecyclers.com",
    "https://www.collisioncenternorthscottsdale.com",
    "https://www.trezpro.com",
    "https://www.ucookhawaii.com",
    "https://www.primemedicalpain.com",
    "https://www.judefrances.com",
    "https://www.aerialengagement.com",
    "https://www.ewingconstruction.com",
    "https://www.buckeyederm.com",
    "https://www.jelleyvision.com",
    "https://www.sistemmacpap.com",
    "https://www.virtualassistantsoutsourcing.com",
    // "https://www.summernightsyacht.com/corporateecard.com/index.html",
    // "https://www.summernightsyacht.com",
    "https://www.getyorkhvac.com",
    "https://www.sistemma.com",
    "https://staffportal.optimizex.com",
    "https://www.hgcontrollers.com",
    "https://www.gatorskin.us",
    "https://www.thehairextensioncompany.com",
    "https://www.getyorkhvacfl.com",
    "https://www.mycontainernow.com",
    "https://www.culpepper-associates.com",
    "https://www.phoenixritecare.org",
    "https://www.bbllessons.com",
    "https://www.thesolutionsforum.com",
    "https://www.primeleisures.com",
    "https://www.businesstrendstoday.com",
    "https://www.honphoto.com",
    "https://www.ourskincares.shop",
    "https://www.mcbuildingmaintenance.com",
    "https://www.phoenixcampus.com",
    "https://www.sunpressurewash.com",
    "https://www.airgain.com",
    "https://www.jechvac.com",
    "https://www.maintenancebest.com"
]



module.exports = {
    auth,
    spreadsheetId,
    credentials,
    frontend_sites
};
