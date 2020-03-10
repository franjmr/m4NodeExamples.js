import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import * as fs from "fs";

describe("M4JSAPI - Create Instances Mock Suite", () => {

    let m4ApiNodejs: M4ApiNode ;

    beforeAll(async (done)=>{
        const server = "http://arya.meta4.com:5020";
        m4ApiNodejs = await M4ApiNodejs(server,"foo","fpp");

        const m4Metadata = fs.readFileSync("./__mocks__/metadata/PLCO_LOAD_ALL_PERSONAL_INFO.xml", 'utf8');
        m4ApiNodejs.__mock__initialize__();
        m4ApiNodejs.__mock__setM4ObjectMetadata__("PLCO_LOAD_ALL_PERSONAL_INFO", m4Metadata);
        done();
    });

    it("should create M4Object instance with mocked metadata", async () => {
        const m4Object = await m4ApiNodejs.createM4Object("PLCO_LOAD_ALL_PERSONAL_INFO");
        expect(m4Object).toBeTruthy();
        expect(m4Object.getId()).toEqual("PLCO_LOAD_ALL_PERSONAL_INFO");
    });

    it("should create M4Request instance with mocked M4Object", async () => {
        const m4Object = await m4ApiNodejs.createM4Object("PLCO_LOAD_ALL_PERSONAL_INFO");
        const m4Request = await m4ApiNodejs.createM4Request(m4Object, "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
        expect(m4Request).toBeTruthy();
        expect(m4Request.getObjectId()).toEqual("PLCO_LOAD_ALL_PERSONAL_INFO");
    });
});