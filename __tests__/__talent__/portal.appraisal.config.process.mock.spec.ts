import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import { M4Node } from "@automation/m4nodejs/dist/m4Interfaces/M4Node";
import { MockXhr } from "mock-xmlhttprequest/types";
import * as fs from "fs";
import * as MockXMLHttpRequest from "mock-xmlhttprequest";
import { M4Object } from "@automation/m4nodejs/dist/m4Interfaces/M4Object";
const moootols = require('mootools');

describe("Mocking - Appraisal Processes - Get Config Process suite", () => {

    let globalAny: any;
    let m4ApiNodejs: M4ApiNode ;
    let mockM4Object: M4Object;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000;

    beforeAll(async (done)=>{
        globalAny = global;

        m4ApiNodejs = await M4ApiNodejs("http://arya.meta4.com:5020","foo","foo");
        await m4ApiNodejs.__importJsFileFromUrl__("http://arya.meta4.com:5020/libreria/appraisal/processexecution/evaluation.js");
    
        const m4Window = m4ApiNodejs.__getWindowObject__();
        const MockXhr = MockXMLHttpRequest.newMockXhr();
        
        const data = fs.readFileSync("./__mocks__/metadata/PLCO_FL_MN_EVALUATE_SSE.xml", 'utf8');

        MockXhr.onSend = (xhr : MockXhr) => {
            const responseHeaders = { 'Content-Type': 'text/xml' };
            xhr.respond(200, responseHeaders, data);
        };
    
        m4Window.XMLHttpRequest = MockXhr;
        
        function mockGetValues(node: M4Node, itemsId: string[]){
            let itemValues : any = [];
            itemsId.forEach(itemId =>{
                itemValues.push(node.getValue(itemId));
            })
            return itemValues;
        }

        function mockGetValue(node: M4Node, itemId: string){
            return node.getValue(itemId);
        }

        globalAny.meta4.data = {};
        globalAny.meta4.data.utils = {};
        globalAny.meta4.data.utils.getValues = null;
        globalAny.meta4.data.utils.getValue = null;
        spyOn(globalAny.meta4.data.utils,"getValues").and.callFake(mockGetValues);
        spyOn(globalAny.meta4.data.utils,"getValue").and.callFake(mockGetValue);
        
        done();

    });

    it("should initialize evaluation core", async(done)=>{
        mockM4Object = await m4ApiNodejs.createM4Object("PLCO_FL_MN_EVALUATE_SSE");
        const m4NodeDesProc = mockM4Object.getNode("PLCO_FL_DESC_PROC");
        const m4NodeMnEvaluate = mockM4Object.getNode("PLCO_FL_MN_EVALUATE");
        const m4NodeMnEvaluator = mockM4Object.getNode("PLCO_FL_MN_EVALUATOR");
        m4NodeDesProc.addRecord();
        m4NodeMnEvaluate.addRecord();
        m4NodeMnEvaluator.addRecord();

        m4NodeDesProc.setValue("PLCO_ORDER_COMMENTS",1);
        m4NodeDesProc.setValue("PLCO_ORDER_KN",4);
        m4NodeDesProc.setValue("PLCO_ORDER_CUAN_OBJ",3);
        m4NodeDesProc.setValue("PLCO_ORDER_CL_OBJ",2);

        const mockM4Request = m4ApiNodejs.createM4Request(mockM4Object, "PLCO_FL_MN_EVALUATE","ZOOM_EVAL_PLAN", ["","",new Date()]);

        const appraisalCore = new globalAny.meta4.appraisal.execution.evaluation.core(mockM4Request);

        appraisalCore.getConfigProcess();
        
        const visualOrderExpected = [];
        visualOrderExpected.push({type: "CM", order: 1});
        visualOrderExpected.push({type: "CL", order: 2});
        visualOrderExpected.push({type: "CN", order: 3});
        visualOrderExpected.push({type: "EK", order: 4});

        expect(appraisalCore._configProcess).toBeTruthy();
        expect(appraisalCore._configProcess.visualOrder).toEqual(visualOrderExpected);

        done();
    });

});