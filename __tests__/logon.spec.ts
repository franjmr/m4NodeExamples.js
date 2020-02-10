
import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";

describe("M4ApiNode.js suite", () => {

    let m4ApiNodejs: M4ApiNode ;

    /**
     * @jest-environment jsdom
     */
    beforeEach(async (done)=>{
        const server = "http://arya.meta4.com:5020";
        const user = "ORLIEMOBILE";
        const pass = "RUN";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        done();
    });

    /**
     * @jest-environment jsdom
     */
    test("should generate an api url to connect", async () => {
        expect(m4ApiNodejs.getApiUrl()).toBeTruthy();
    });
});