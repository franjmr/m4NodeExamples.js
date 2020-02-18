import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";
import { M4LogonResult } from "@franjmr/m4-node-api/dist/m4Interfaces/M4LogonResult";
import { M4Request } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Request";
import { M4Object } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Object";
import { M4Node } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Node";

describe("Add parent record without load suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    let m4LogonResult : M4LogonResult;
    let m4ObjectDeltas: M4Object;
    let m4nodeDeltasRequest: M4Node;

    beforeAll(async ()=>{
        m4ApiNodejs = await M4ApiNodejs("http://arya.meta4.com:5020","ORLI_GLO","123");
        m4LogonResult = await m4ApiNodejs.logonPromise();
        m4ObjectDeltas = await m4ApiNodejs.createM4ObjectAsync("M4QA_JSAPI_DELTAS2");
        const m4nodeDeltas = m4ObjectDeltas.getNode("M4QA_JSAPI_DELTAS2_P");
        m4nodeDeltas.addRecord();
        m4nodeDeltas.setValue("PK", 654546879);
        m4nodeDeltas.setValue("FIELD_STRING", "Cadena");
        m4nodeDeltas.setValue("FIELD_NUMBER", 8);
        m4nodeDeltas.setValue("FIELD_DATE", new Date("2013-10-20 0:00:00"));
    });

    afterAll(async() => {
        if(m4LogonResult.getToken()){
            await m4ApiNodejs.logoutPromise();
        }
    })

    it("should syncronize in server", async () => {
        const m4RequestDeltas = await m4ApiNodejs.executeM4ObjectMethodPromise(m4ObjectDeltas,"M4QA_JSAPI_DELTAS2_P","SYNCHRONIZE", []);
        m4nodeDeltasRequest = m4RequestDeltas.getObject().getNode("M4QA_JSAPI_DELTAS2_P");
        expect(m4nodeDeltasRequest).toBeTruthy();
    });

    it("should count one node record", async () => {
        expect(m4nodeDeltasRequest.count()).toEqual(1);
    });

    it("should load fields value without call node move to position", async () => {
        expect(m4nodeDeltasRequest.getValue("PK")).toEqual(654546879);
        expect(m4nodeDeltasRequest.getValue("FIELD_STRING")).toEqual("Cadena");
        expect(m4nodeDeltasRequest.getValue("FIELD_NUMBER")).toEqual(8);
        expect(m4nodeDeltasRequest.getValue("FIELD_DATE")).toEqual(new Date("2013-10-20 0:00:00"));
    });

});