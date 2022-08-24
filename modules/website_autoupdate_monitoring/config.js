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
    ["https://www.azdoordoctor.com", config_server.wp_creds.azdoordoctor.username, config_server.wp_creds.azdoordoctor.password],
    ["https://www.buckeyelot.com", "pvadmin", "kP2HZYs!HWywFW@ZgPeI7vhw"],
    ["https://www.dentistryatthebiltmore.com", config_server.wp_creds.dentistryatthebiltmore.username, config_server.wp_creds.dentistryatthebiltmore.password],
    ["https://www.fccongoaz.com", "pvadmin", "fIB{D27)5}sv"],
    ["https://www.freddabranyon.com", config_server.wp_creds.freddabranyon.username, config_server.wp_creds.freddabranyon.password],
    ["https://www.gebionline.com", "pvadmin", "lx&zdQ%%T@4bpk4tgf&DPDBJ"],
    ["https://www.genovation.com", "pvadmin", "f1Ojvx&fJV(aC!hXOvLUXI3i"],
    ["https://www.gentryrealestategroup.com", "pvadmin", "K%LeQ$^xbiNP*DOVZxej#hOW"],
    ["https://www.inspired-engagement.com", "pvadmin", "Jvr2fcF(f8Hzg@*NEr6$djVS"],
    ["https://www.inspirednetworks.com", "rdonnelly", "8b0SxvtYjl(7z9pD6yHgc!*Y"],
    ["https://www.johnsoninjurylaw.com", "johngregadmin", "M2^NNycoR&7dmcdadek)o3TQ"],
    ["https://www.keenindependent.com", "pvadmin", "qn%kShjd$mLxZJQpiO7CWVSS"],
    ["https://www.mhsjackrabbitsfoundation.com", "pvadmin", "&RguT&P^vurj@Jl3Rn@VuszM"],
    ["https://www.myseoagency.com", "pvadmin", "v6ahbRXTHf87nbmM2)464zxt"],
    ["https://www.ngaaz.org", "pvadmin", "iP2rKyIGJAq2FEAse%7X*x(N"],
    ["https://www.ocmedspa.com", "pvadmin", "lIe&eLZeO&r389UMvUbJL7F$"],
    ["https://www.onlinebrandreputation.com", "pvadmin", "Q)Q9Fvzj3N$EvTp3cBEWk$Xv"],
    ["https://www.optimizex.com", config_server.wp_creds.optimizex.username, config_server.wp_creds.optimizex.password],
    // ["https://www.search.optimizex.com", "pvadmin", "F6Eth%A@)Srqn^V7SM!QdoQO"],
    ["https://www.orionisg.com", "pvadmin", "5i3JHI#c9aVcIjwyWBAz7CRI"],
    ["https://www.oxlocalsearch.com", "pvadmin", "bn@**R*DCbL2ldQS!#P(YPEZ"],
    ["https://www.pmrtimeshares.com", "pvadmin", "NMoiE$!uoOMwiE1vxxd05tH*"],
    ["https://www.solidproducts.com", "pvadmin", "2SicPMYNY6^IWaeZ2ezo@Czi"],
    ["https://www.suncliffsedona.com", "pvadmin", "1YdGjQHCcHPJ4w81MeSd!Q(u"],
    ["https://www.thesolutionsforum.net", "pvadmin", "p@iWoX3pvx0r2"],
    ["https://www.jmrestoration.com", "pvadmin", "GUqW!R@XNUj2!s2m#nULQXM5"],
    ["https://www.valuesquest.com", "pvadmin", "Js*h6qXd(t)krrAECi0T5jbV"],
    ["https://www.elevatebytempusjets.com", "pvadmin", "iEqu11MUn@BCh3gg!nB*LcPg"],
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
    ["https://www.amblaw.com", "pvadmin", "MV*y792!N$Uw8y38Y18UT(fO"],
    ["https://www.amissionofmercy.org", "pvadmin", "fFcflnUTHV4g@u6^KZ$3Xd5g"],
    ["https://www.biltmoreloanandjewelry.com", config_server.wp_creds.biltmoreloanandjewelry.username, config_server.wp_creds.biltmoreloanandjewelry.password],
    ["https://www.crexendo.com", config_server.wp_creds.crexendo.username, config_server.wp_creds.crexendo.password],
    ["https://www.everythingjustrocks.com", "pvadmin", "Skkj@MI&xkEbA4Fov84eYKot"],
    ["https://www.natina.com", config_server.wp_creds.natina.username, config_server.wp_creds.natina.password],
    ["https://www.frlawgroup.com", config_server.wp_creds.frlawgroup.username, config_server.wp_creds.frlawgroup.password],
    ["https://www.indinspect.com", config_server.wp_creds.indinspect.username, config_server.wp_creds.indinspect.password],
    ["https://www.kyrenefamilydentistry.com", config_server.wp_creds.kyrenefamilydentistry.username, config_server.wp_creds.kyrenefamilydentistry.password],
    ["https://www.newhopemedicalcenter.com", config_server.wp_creds.newhopemedicalcenter.username, config_server.wp_creds.newhopemedicalcenter.password],
    ["https://www.opakapakagrillandbar.com", "pvadmin", "$V(NGs990jNbZaoN^rAE5yMT"],
    ["https://www.sellusyourcaraz.com", config_server.wp_creds.sellusyourcaraz.username, config_server.wp_creds.sellusyourcaraz.password],
    ["https://www.southwestdirectmortgage.com", "pvadmin", 'f"1$HoI;pz*~?Ta'],
    ["https://dyslexiaproject.org", "support@primeview.com", ")G(dlWP6Cgc^I@ev"],
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
    // ["https://www.staffportal.optimizex.com", "pvadmin", "qJ7Xo$LFMFPng@2GXTgdcBns"],
    ["https://www.gatorskin.us", config_server.wp_creds.gatorskin.username, config_server.wp_creds.gatorskin.password],
    ["https://www.thehairextensioncompany.com", config_server.wp_creds.canyonfallshairextensioncompany.username, config_server.wp_creds.canyonfallshairextensioncompany.password],
    ["https://www.culpepper-associates.com", config_server.wp_creds.culpepper.username, config_server.wp_creds.culpepper.password],
    ["https://www.phoenixritecare.org", config_server.wp_creds.phoenixritecare.username, config_server.wp_creds.phoenixritecare.password],
    ["https://www.bbllessons.com", "pvadmin", "pv3p@w0r$dtyo"],
    ["https://www.thesolutionsforum.com", config_server.wp_creds.solutionsforum.username, config_server.wp_creds.solutionsforum.password],
    ["https://www.primeleisures.com", "pvadmin", "mK4:rQ5{dI6?zO8?"],
    ["https://www.businesstrendstoday.com", "pvadmin", "|fWs[qDSGrO6"],
    // ["https://www.cmafed.com", "pvadmin", "6DYb#k3?D!Tk"],
    ["https://www.mcbuildingmaintenance.com", config_server.wp_creds.mcbuildingmaintenance.username, config_server.wp_creds.mcbuildingmaintenance.password]
]



// let credentials = [
//     ["https://www.keenindependent.com", "pvadmin", "qn%kShjd$mLxZJQpiO7CWVSS"],
//     ["https://www.amblaw.com", "pvadmin", "MV*y792!N$Uw8y38Y18UT(fO"],
//     ["https://www.trezpro.com", "vivoclaro", "!vivoClaro3214122!"],
//     ["https://www.jelleyvision.com", "pvadmin", "[zJdPOoINX[8"],
//     ["https://www.virtualassistantsoutsourcing.com", config_server.wp_creds.virtualassistantsoutsourcing.username, config_server.wp_creds.virtualassistantsoutsourcing.password],
// ]



module.exports = {
    auth,
    spreadsheetId,
    credentials
};

