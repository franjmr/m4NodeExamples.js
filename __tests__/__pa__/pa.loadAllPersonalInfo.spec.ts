import {M4ApiNodejs} from "@automation/m4nodejs"
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";

describe("PA - Load All Personal Info suite", ()=>{
    
    let m4Nodejs : M4ApiNode;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    
    beforeAll(async()=>{
        m4Nodejs = await M4ApiNodejs("http://drogo.meta4.com:9020","USUTRANING_MAN_ESP","RUN");
        await m4Nodejs.logon();
        m4Nodejs.enableConsoleMessages();
    })

    afterAll(async()=>{
        await m4Nodejs.logout();
    })

    it("should load employee name from M4Object",async()=>{
        const m4ObjLoadAllPersonInfo = await m4Nodejs.createM4Object("PLCO_LOAD_ALL_PERSONAL_INFO");
        await m4Nodejs.executeM4ObjectMethod(m4ObjLoadAllPersonInfo, "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
        
        const m4NodeEmpRecordHeader = m4ObjLoadAllPersonInfo.getNode("PSCO_EMPLOYEE_RECORD_HEADER");
        const m4PropEmpName = m4NodeEmpRecordHeader.getValue("PSCO_EMPLOYEE_NAME");

        expect(m4PropEmpName).toBeTruthy();
    });

    it("should load employee name from M4Request",async()=>{
        const m4Request = await m4Nodejs.executeMethod("PLCO_LOAD_ALL_PERSONAL_INFO", "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
        const m4NodeEmpRecordHeader = m4Request.getObject().getNode("PSCO_EMPLOYEE_RECORD_HEADER");
        const m4PropEmpName = m4NodeEmpRecordHeader.getValue("PSCO_EMPLOYEE_NAME");

        expect(m4PropEmpName).toBeTruthy();
    });

});