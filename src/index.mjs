import locations from "../node_modules/mastercard-locations/index.js";//require('mastercard-locations');
export default {
    async fetch(request, env /*, ctx*/) {
        //Response class must be a promise
        try {
            if (request.method === "OPTIONS")
                return new Response(`preflight response for POST`, {
                    status: 200,
                    message: `preflight response for POST`,
                    headers: {
                        "Access-Control-Allow-Headers": [
                            //"Access-Control-Allow-Origin",
                            "Access-Control-Allow-Methods",
                            "Content-Type"
                            //"Origin",
                            //"X-Requested-With",
                            //"Accept"
                        ],
                        "Access-Control-Allow-Methods": ["POST", "OPTIONS"]
                    }
                });
            return await noException(request, env);
            // wrap the body of your callback in a try/catch block to ensure it cannot throw an exception.
            // is return, "the body?"
        } catch (e) {
            return new Response(e.message);
        }
    }
};
const noaccess = (origin) =>
    new Response(
        JSON.stringify(`{error:${"no access for this origin- " + origin}}`),
        {
            status: 400,
            message: "no access for this origin: " + origin
            //headers: { "Content-Type": "application/json" }
        }
    );
async function noException(req, env) {
    // key => Object ID; return new Response(JSON.stringify(backbank));
    // boot instance, if necessary //https://<worker-name>.<your-namespace>.workers.dev/
    //https://linc.sh/blog/durable-objects-in-production
    //const clientId = request.headers.get("cf-connecting-ip");
    var allowedOrigins = [
        "https://sausage.saltbank.org",
        "https://i7l8qe.csb.app",
        "https://vau.money",
        "https://jwi5k.csb.app",
        "https://mastercard-backbank.backbank.workers.dev"
    ];

    const urlObject = new URL(req.url); //.pathname;//path
    var origin = urlObject.origin; // request.headers.get("Origin");

    if (allowedOrigins.indexOf(origin) === -1) return noaccess(origin);
    const /*href = urlObject.searchParams.get("name"), */dataHead = {
        "Content-Type": "application/json"
    };

    return new Response(R, {
        status: 200,
        message: UseDependency(),
        headers: { ...dataHead }
    });
}

function UseDependency() {

    /**
 *
 * Script-Name: atm_locations
 */

    var MasterCardAPI = locations.MasterCardAPI;

    //var consumerKey = "your consumer key";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
    var keyStorePath = p12;//"path to your .p12 private key file"; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
    var keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
    var keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key

    // You only need to do initialize MasterCardAPI once
    //
    var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
    MasterCardAPI.init({
        sandbox: true,
        debug: true,
        authentication: authentication
    });


    var requestData = {
        "PageOffset": "0",
        "PageLength": "5",
        "PostalCode": "11101"
    };
    locations.ATMLocations.query(requestData
        , function (error, data) {
            if (error) {
                err("HttpStatus: " + error.getHttpStatus());
                err("Message: " + error.getMessage());
                err("ReasonCode: " + error.getReasonCode());
                err("Source: " + error.getSource());
                err(error);

            }
            else {
                out(data.Atms.PageOffset); //-->0
                out(data.Atms.TotalCount); //-->26
                out(data.Atms.Atm[0].Location.Name); //-->Sandbox ATM Location 1
                out(data.Atms.Atm[0].Location.Distance); //-->0.93
                out(data.Atms.Atm[0].Location.DistanceUnit); //-->MILE
                out(data.Atms.Atm[0].Location.Address.Line1); //-->4201 Leverton Cove Road
                out(data.Atms.Atm[0].Location.Address.Line2); //-->
                out(data.Atms.Atm[0].Location.Address.City); //-->SPRINGFIELD
                out(data.Atms.Atm[0].Location.Address.PostalCode); //-->11101
                out(data.Atms.Atm[0].Location.Address.CountrySubdivision.Name); //-->UYQQQQ
                out(data.Atms.Atm[0].Location.Address.CountrySubdivision.Code); //-->QQ
                out(data.Atms.Atm[0].Location.Address.Country.Name); //-->UYQQQRR
                out(data.Atms.Atm[0].Location.Address.Country.Code); //-->UYQ
                out(data.Atms.Atm[0].Location.Point.Latitude); //-->38.76006576913497
                out(data.Atms.Atm[0].Location.Point.Longitude); //-->-90.74615107952418
                out(data.Atms.Atm[0].Location.LocationType.Type); //-->OTHER
                out(data.Atms.Atm[0].HandicapAccessible); //-->NO
                out(data.Atms.Atm[0].Camera); //-->NO
                out(data.Atms.Atm[0].Availability); //-->UNKNOWN
                out(data.Atms.Atm[0].AccessFees); //-->UNKNOWN
                out(data.Atms.Atm[0].Owner); //-->Sandbox ATM 1
                out(data.Atms.Atm[0].SharedDeposit); //-->NO
                out(data.Atms.Atm[0].SurchargeFreeAlliance); //-->NO
                out(data.Atms.Atm[0].SurchargeFreeAllianceNetwork); //-->DOES_NOT_PARTICIPATE_IN_SFA
                out(data.Atms.Atm[0].Sponsor); //-->Sandbox
                out(data.Atms.Atm[0].SupportEMV); //-->1
                out(data.Atms.Atm[0].InternationalMaestroAccepted); //-->1
                //This sample shows looping through Atms.Atm
                console.log("This sample shows looping through Atms.Atm");
                data.Atms.Atm.forEach(function (item) {
                    outObj(item, "Location")
                    outObj(item, "HandicapAccessible")
                    outObj(item, "Camera")
                    outObj(item, "Availability")
                    outObj(item, "AccessFees")
                    outObj(item, "Owner")
                    outObj(item, "SharedDeposit")
                    outObj(item, "SurchargeFreeAlliance")
                    outObj(item, "SurchargeFreeAllianceNetwork")
                    outObj(item, "Sponsor")
                    outObj(item, "SupportEMV")
                    outObj(item, "InternationalMaestroAccepted")
                });
            }
        });

    var output = []
    function out(value) {
        output.push(value);
    }

    function outObj(item, key) {
        output.push(item[key]);
    }

    function err(value) {
        output.push(value);
    }
    return out(output);

}