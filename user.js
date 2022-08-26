import { userId } from "./server";


var user_logged_in = 
function() {
    var user = {
        // user: "mbuendia@optimizex.com",
        user: userId
    };
    return user;
}

