import { M4ApiNodejs } from "@franjmr/m4-node-api";

async function example(){
    const server = "http://franciscocaw10.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";
    const m4apinode = await M4ApiNodejs(server,user,pass);
    await m4apinode.logonPromise();
    await m4apinode.loadMetadataPromise(['PSCO_WDG_MY_TASKS']);
    const request = await m4apinode.executeMethodPromise("PSCO_WDG_MY_TASKS", "PSCO_WDG_MY_TASKS", "PLCO_LOAD", [null]);
    const objRequest = request.getObject();
    if( objRequest ){
        const nodeRequest = objRequest.getNode("PSCO_WDG_FUNC_PROCESSES");
        console.log("Method executed ok! Number of records is: " + nodeRequest.count());
    }
    await m4apinode.logoutPromise();
    console.log("All done")
}

example();