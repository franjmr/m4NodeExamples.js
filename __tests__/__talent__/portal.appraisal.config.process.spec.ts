import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import { M4Node } from "@automation/m4nodejs/dist/m4Interfaces/M4Node";
import { M4Request } from "@automation/m4nodejs/dist/m4Interfaces/M4Request";
var requireFromUrl = require('require-from-url/sync');
var moootols = require('mootools');

describe("Talent - Appraisal Processes - Get Config Process suite", () => {

    let globalAny:any;
    let m4ApiNodejs: M4ApiNode ;
    let m4RequestResult: M4Request;
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    beforeAll(async (done)=>{
        globalAny = global;

        const server = "http://drogo.meta4.com:9020";
        const user = "LGUINDOS";
        const pass = "Sqafunc*12";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        await m4ApiNodejs.logon();
        await m4ApiNodejs.__importJsFileFromUrl__(server+"/libreria/appraisal/processexecution/evaluation.js");
        
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

    afterAll(async() => {
        await m4ApiNodejs.logout();
    });

    it("Should load configuration process ", async()=>{
        const m4Object = await m4ApiNodejs.createM4Object("PLCO_FL_MN_EVALUATE_SSE");
        const m4Node = m4Object.getNode("PLCO_FL_MN_EVALUATE");
        m4Node.setValue('PLCO_ID_EVALUATOR_TP',"01");
        const reqArgs = ["", "#1FFDCCC", new Date(2015,2,6,0,0,0,0)]
        const m4Request = m4ApiNodejs.createM4Request(m4Object, "PLCO_FL_MN_EVALUATE","ZOOM_EVAL_PLAN", reqArgs);

        m4RequestResult = await m4ApiNodejs.executeM4Request(m4Request);

        expect(m4RequestResult.getErrorCode()).toEqual(0);
    });

    it("should initialize evaluation core", async()=>{
        const appraisalCore = new globalAny.meta4.appraisal.execution.evaluation.core(m4RequestResult);
        appraisalCore.getConfigProcess();
        expect(appraisalCore._configProcess).toBeTruthy();
    });

    it("should load config process visible sections", async()=>{
        let appraisalCore = new globalAny.meta4.appraisal.execution.evaluation.core(m4RequestResult);
        appraisalCore.getConfigProcess();

        expect(appraisalCore._configProcess.criteriaInfoVisible).toEqual(1);
        expect(appraisalCore._configProcess.reqLevelVisibility).toEqual(1);
        expect(appraisalCore._configProcess.showCalcButtons).toEqual(1);
        expect(appraisalCore._configProcess.showExtKnowNotes).toEqual(1);
        expect(appraisalCore._configProcess.showGlobalNotes).toEqual(1);
        expect(appraisalCore._configProcess.showObjCualNotes).toEqual(1);
        expect(appraisalCore._configProcess.showObjCuanNotes).toEqual(1);
    });

    it("should load config process visual order", async()=>{
        let appraisalCore = new globalAny.meta4.appraisal.execution.evaluation.core(m4RequestResult);
        appraisalCore.getConfigProcess();

        expect(appraisalCore._configProcess.visualOrder).toBeTruthy();
        expect(appraisalCore._configProcess.visualOrder.length).toEqual(4);
        expect(appraisalCore._configProcess.visualOrder[0].order).toEqual(1);
        expect(appraisalCore._configProcess.visualOrder[0].type).toEqual("EK");
        expect(appraisalCore._configProcess.visualOrder[1].order).toEqual(2);
        expect(appraisalCore._configProcess.visualOrder[1].type).toEqual("CN");
        expect(appraisalCore._configProcess.visualOrder[2].order).toEqual(3);
        expect(appraisalCore._configProcess.visualOrder[2].type).toEqual("CL");
        expect(appraisalCore._configProcess.visualOrder[3].order).toEqual(4);
        expect(appraisalCore._configProcess.visualOrder[3].type).toEqual("CM");
    });
});