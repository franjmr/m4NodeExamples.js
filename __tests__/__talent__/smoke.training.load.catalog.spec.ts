import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";
import { M4Object } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Object";
import { M4Request } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Request";

describe("Training Load Catalog Smoke suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    let m4ObjectTraCatalog: M4Object;

    beforeAll(async ()=>{
        const server = "http://neferiow10.meta4.com";
        const user = "USUTRANING_MAN_ESP";
        const pass = "RUN";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        await m4ApiNodejs.logon();
        m4ObjectTraCatalog = await m4ApiNodejs.createM4Object("PMCO_MANAGE_TRAINING_CATALOG");
    });

    afterAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logout();
        }
    });

    it("should return error code 0 given empty args", async (done) => {
        m4ApiNodejs.executeM4ObjectMethod(m4ObjectTraCatalog,"PLCO_MANAGE_TRAINING_CATALOG","PLCO_MAIN_PROCESS_MSS", []).then((m4Request : M4Request) =>{
            expect(m4Request.getErrorCode()).toEqual(0);
            done();
        }).catch( (error: TypeError )=>{
            done.fail("Error executing method: "+error.message);
        });
    });
});