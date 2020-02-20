import { M4ApiNodejs } from "@franjmr/m4-node-api";

async function example(){
    const server = "http://arya.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";

    const m4apinode = await M4ApiNodejs(server,user,pass);

    const logonResult = await m4apinode.logon();
    const logonStatus = logonResult.getLogonStatus();
    const logonStatusString = logonResult.getLogonStatusAsString();
    const logonToken = logonResult.getToken();

    console.log("logonStatus: "+logonStatus);
    console.log("logonStatusString: "+logonStatusString);
    console.log("logonToken: "+logonToken);

    await m4apinode.logout();
    
    console.log("All done")
}

example();