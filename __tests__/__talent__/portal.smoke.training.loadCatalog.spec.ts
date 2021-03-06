import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import { M4Object } from "@automation/m4nodejs/dist/m4Interfaces/M4Object";
import { M4Request } from "@automation/m4nodejs/dist/m4Interfaces/M4Request";

describe("Talent - Training Load Catalog Smoke suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    let m4ObjectTraCatalog: M4Object;

    beforeAll(async ()=>{
        const server = "http://drogo.meta4.com:9020";
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