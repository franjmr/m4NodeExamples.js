import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";
import { M4Request } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Request";
import { M4Object } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Object";

describe("Appraisal Processes - Load suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    let m4ReqFlAppProcess: M4Request;
    let m4ObjectEvalProc: M4Object;
    let m4ObjectEvalProPublish: M4Object;
    let m4ObjectEvalProFeedback: M4Object;
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    beforeAll(async (done)=>{
        const server = "http://drogo.meta4.com:9020";
        const user = "LGUINDOS";
        const pass = "Sqafunc*12";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        m4ApiNodejs.enableConsoleMessages();

        await m4ApiNodejs.logon();

        const m4ObjFlAppProcess = await m4ApiNodejs.createM4Object("PLCO_FL_APP_PROCESSES");
        m4ReqFlAppProcess = m4ApiNodejs.createM4Request(m4ObjFlAppProcess,"PLCO_FL_APP_PROCESSES","LOAD_CHANNELS", []);

        m4ObjectEvalProc = await m4ApiNodejs.createM4Object("PLCO_FL_MT_H_EVAL_PROC");
        m4ObjectEvalProPublish = await m4ApiNodejs.createM4Object("PLCO_FL_EVAL_PRO_PUBLISH");
        m4ObjectEvalProFeedback = await m4ApiNodejs.createM4Object("PLCO_FL_EVAL_PRO_FEEDBACK");

        m4ReqFlAppProcess.addReference("PLCO_FL_MT_H_EVAL_PROC", m4ObjectEvalProc);
        m4ReqFlAppProcess.addReference("PLCO_FL_EVAL_PRO_PUBLISH", m4ObjectEvalProPublish);
        m4ReqFlAppProcess.addReference("PLCO_FL_EVAL_PRO_FEEDBACK", m4ObjectEvalProFeedback);
        done();
    });

    afterAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logout();
        }
    });

    it("should load channels", async(done)=>{
        m4ApiNodejs.executeM4Request(m4ReqFlAppProcess).then(()=>{
            done();
        }).catch(()=>{
            done.fail();
        });
    });

    it("should load some Opened Processes", async () => {
        const m4NodeEvalProc = m4ObjectEvalProc.getNode("PLCO_FL_MT_H_EVAL_PROC");
        expect(m4NodeEvalProc).toBeTruthy();
        expect(m4NodeEvalProc.count()).toBeGreaterThan(0);
    });

    it("should not load Publication Processes", async () => {
        const m4NodeEvalProc = m4ObjectEvalProPublish.getNode("PLCO_FL_MT_H_EVAL_PROC");
        expect(m4NodeEvalProc).toBeTruthy();
        expect(m4NodeEvalProc.count()).toEqual(0)
    });

    it("should not load Assesment Processes", async () => {
        const m4NodeEvalProc = m4ObjectEvalProFeedback.getNode("PLCO_FL_MT_H_EVAL_PROC");
        expect(m4NodeEvalProc).toBeTruthy();
        expect(m4NodeEvalProc.count()).toEqual(0)
    });
});