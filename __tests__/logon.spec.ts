import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";

describe("M4ApiNode.js suite", () => {

    let m4ApiNodejs: M4ApiNode ;

    beforeAll(async ()=>{
        const server = "http://arya.meta4.com:5020";
        const user = "ORLIEMOBILE";
        const pass = "RUN";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
    });

    beforeAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logoutPromise();
        }
    })

    it("should generate an api url", async () => {
        expect(m4ApiNodejs.getApiUrl()).toBeTruthy();
    });

    it("should use node api url", async () => {
        expect(m4ApiNodejs.getApiUrl()).toContain("node");
    });

    it("should do logon", async () => {
        const token = await m4ApiNodejs.logonPromise()
        expect(token).toBeTruthy();
    });
});