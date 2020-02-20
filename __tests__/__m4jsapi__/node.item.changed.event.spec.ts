import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";
import { M4ItemChangedEvent } from "@franjmr/m4-node-api/dist/m4Interfaces/client/events/M4ItemChangedEvent";
import { M4LogonResult } from "@franjmr/m4-node-api/dist/m4Interfaces/M4LogonResult";

describe("Node Item Changed Event suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    let m4LogonResult : M4LogonResult;

    beforeAll(async ()=>{
        m4ApiNodejs = await M4ApiNodejs("http://arya.meta4.com:5020","ORLIEMOBILE","RUN");
        m4LogonResult = await m4ApiNodejs.logon();
    });

    afterAll(async() => {
        if(m4LogonResult.getToken()){
            await m4ApiNodejs.logout();
        }
    })

    it("should trigger node item changed", async (done) => {
        const m4object = await m4ApiNodejs.createM4Object("PLCO_LOAD_ALL_PERSONAL_INFO");
        const m4nodePersEmpInf = m4object.getNode("PLCO_PERSONAL_EMPLOYEE_INFORMT");
        const m4nodeEmpRecHeader = m4object.getNode("PSCO_EMPLOYEE_RECORD_HEADER");
        const m4nodeObservableItemchange = m4ApiNodejs.createObservableByNodeItemChanged(m4nodeEmpRecHeader);

        m4nodeObservableItemchange.subscribe({
            next(event:M4ItemChangedEvent) {
                const itemId = event.getItemId();
                const itemValue = event.getValue();
                expect(itemId).toEqual("PSCO_EMPLOYEE_NAME");
                expect(itemValue).toEqual("Yoshimitsu");
            },
            error(err:TypeError) { 
                done.fail(err.message);
            },
            complete() { 
                done();
            }
        });

        m4nodePersEmpInf.addRecord();
        m4nodeEmpRecHeader.addRecord();
        m4nodeEmpRecHeader.setValue("PSCO_EMPLOYEE_NAME","Yoshimitsu");
    });
});