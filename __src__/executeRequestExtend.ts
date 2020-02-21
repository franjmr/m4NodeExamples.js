import { M4ApiNodejs } from "@automation/m4nodejs";

async function example(){
    const server = "http://arya.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";

    const m4apinode = await M4ApiNodejs(server,user,pass);

    const logonToken = await m4apinode.logon();

    console.log("Logon token is "+logonToken.getToken());
        
    const request = await m4apinode.executeMethodExtend("PLCO_LOAD_ALL_PERSONAL_INFO", "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
    const objRequest = request.getObject();
    if( objRequest ){
        const nodeRequest = objRequest.getNode("PLCO_PERSONAL_EMPLOYEE_INFORMT");
        console.log("Request executed success! Records loaded: " + nodeRequest.count());
        console.log("Request Code Error " +request.getErrorCode());
    }

    await m4apinode.logout();
    console.log("All done")
}

example();