import { M4ApiNodejs } from "@franjmr/m4-node-api";

async function example(){
    const server = "http://arya.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";

    const m4apinode = await M4ApiNodejs(server,user,pass);
    
    await m4apinode.logonPromise();
    await m4apinode.loadMetadataPromise(['PLCO_LOAD_ALL_PERSONAL_INFO']);
    await m4apinode.logoutPromise();
    console.log("All done")
}

example();