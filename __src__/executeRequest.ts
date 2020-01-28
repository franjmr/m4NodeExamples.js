import { M4ApiNodejs } from "@franjmr/m4-node-api";

async function example(){
    const server = "http://franciscocaw10.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";

    const m4apinode = await M4ApiNodejs(server,user,pass);

    await m4apinode.logonPromise();

    await m4apinode.loadMetadataPromise(['PLCO_LOAD_ALL_PERSONAL_INFO']);
    
    const request = await m4apinode.executeMethodPromise("PLCO_LOAD_ALL_PERSONAL_INFO", "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
    const objRequest = request.getObject();
    if( objRequest ){
        const nodeRequest = objRequest.getNode("PLCO_PERSONAL_EMPLOYEE_INFORMT");
        console.log("Request executed success! Records loaded: " + nodeRequest.count());
    }

    await m4apinode.logoutPromise();
    console.log("All done")
}

example();