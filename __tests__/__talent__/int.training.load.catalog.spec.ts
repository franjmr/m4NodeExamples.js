import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";
import { M4Object } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Object";
import { M4Node } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Node";
import { M4Request } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Request";

describe("Training Load Catalog suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    let m4RequestTraLoadCatalog: M4Request;
    let m4ObjectTraCatalog: M4Object;
    let m4NodeTraCatalog: M4Node;

    beforeAll(async ()=>{
        const server = "http://neferiow10.meta4.com";
        const user = "USUTRANING_MAN_ESP";
        const pass = "RUN";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        await m4ApiNodejs.logonPromise();
        m4ObjectTraCatalog = await m4ApiNodejs.createM4ObjectAsync("PMCO_MANAGE_TRAINING_CATALOG");
    });

    afterAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logoutPromise();
        }
    });

    it("should execute manage training catalog", async () => {
        m4RequestTraLoadCatalog = await m4ApiNodejs.executeM4ObjectMethodPromise(m4ObjectTraCatalog,"PLCO_MANAGE_TRAINING_CATALOG","PLCO_MAIN_PROCESS_MSS", []);
        expect(m4RequestTraLoadCatalog).toBeTruthy();
    });
 
    it("should load courses catalog", async () => {
        m4NodeTraCatalog = m4RequestTraLoadCatalog.getObject().getNode("PLCO_CATALOG_COURSES_INFO");
        expect(m4NodeTraCatalog.count()).toEqual(8);
    });

    describe("Training Catalog Load Courses content suite", () => {
        it("should load C++ course content", async () => {
            m4NodeTraCatalog.moveTo(0);
            expect(m4NodeTraCatalog.getValue("SCO_NM_DEV_SUBPRODUCT")).toEqual("TRA_Desarrollo_C++");
            expect(m4NodeTraCatalog.getValue("PLCO_CATALOG_HOURS")).toEqual(10);
            expect(m4NodeTraCatalog.getValue("PLCO_CATALOG_HOURS_OTW")).toEqual(10);
            expect(m4NodeTraCatalog.getValue("SCO_NM_DEV_PRO_TYPE")).toEqual("In-Class");
        });

        it("should load Cobol course content", async () => {
            m4NodeTraCatalog.moveTo(1);
            expect(m4NodeTraCatalog.getValue("SCO_NM_DEV_SUBPRODUCT")).toEqual("TRA_Desarrollo_Cobol");
            expect(m4NodeTraCatalog.getValue("PLCO_CATALOG_HOURS")).toEqual(1);
            expect(m4NodeTraCatalog.getValue("PLCO_CATALOG_HOURS_OTW")).toEqual(2);
            expect(m4NodeTraCatalog.getValue("SCO_NM_DEV_PRO_TYPE")).toEqual("Mixed/Distance");
        });
    });
});