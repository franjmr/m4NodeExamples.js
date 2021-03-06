import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";

describe("M4JSAPI - Logon suite", () => {

    let m4ApiNodejs: M4ApiNode ;

    beforeAll(async ()=>{
        const server = "http://arya.meta4.com:5020";
        const user = "ORLIEMOBILE";
        const pass = "RUN";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
    });

    afterAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logout();
        }
    })

    it("should generate an api url", async () => {
        expect(m4ApiNodejs.getApiUrl()).toBeTruthy();
    });

    it("should use node api url", async () => {
        expect(m4ApiNodejs.getApiUrl()).toContain("node");
    });

    it("should do logon", async () => {
        const token = await m4ApiNodejs.logon()
        expect(token).toBeTruthy();
    });
});