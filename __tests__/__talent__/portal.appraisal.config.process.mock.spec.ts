import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import * as MockXMLHttpRequest from "mock-xmlhttprequest";
import { MockXhr } from "mock-xmlhttprequest/types";
import * as fs from "fs";

describe("Mocking - Appraisal Processes - Get Config Process suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    beforeAll(async (done)=>{
        m4ApiNodejs = await M4ApiNodejs("http://arya.meta4.com:5020","foo","foo");
    
        const m4Window = m4ApiNodejs.__getWindowObject__();
        const MockXhr = MockXMLHttpRequest.newMockXhr();
        
        const data = fs.readFileSync("./__mocks__/metadata/PLCO_FL_MN_EVALUATE_SSE.xml", 'utf8');

        MockXhr.onSend = (xhr : MockXhr) => {
            const responseHeaders = { 'Content-Type': 'text/xml' };
            xhr.respond(200, responseHeaders, data);
        };
    
        m4Window.XMLHttpRequest = MockXhr;
        done();

    });

    it("Should create a M4Object with mocked Metadata", async()=>{
        const m4Object = await m4ApiNodejs.createM4Object("PLCO_FL_MN_EVALUATE_SSE");
        const m4Node = m4Object.getNode("PLCO_FL_MN_EVALUATE");
        m4Node.setValue('PLCO_ID_EVALUATOR_TP',"01");
        const reqArgs = ["", "#1FFDCCC", new Date(2015,2,6,0,0,0,0)]
        const m4Request = m4ApiNodejs.createM4Request(m4Object, "PLCO_FL_MN_EVALUATE","ZOOM_EVAL_PLAN", reqArgs);
        expect(m4Request).toBeTruthy();
    });

});