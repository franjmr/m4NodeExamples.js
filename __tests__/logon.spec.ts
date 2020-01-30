
import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";

describe("JSONFileUtils Sync suite", () => {

    let m4ApiNodejs: M4ApiNode ;

    beforeEach(async ()=>{
        const server = "http://franciscocaw10.meta4.com:5020";
        const user = "ORLIEMOBILE";
        const pass = "RUN";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
    });

    /**
     * @testEnvironment jsdom
     */
    test("should generate an api url to connect", async () => {
        expect(m4ApiNodejs.apiUrl).toBeTruthy();
    });
});