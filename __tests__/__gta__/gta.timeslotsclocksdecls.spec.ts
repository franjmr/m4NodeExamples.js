import {M4ApiNodejs} from "@automation/m4nodejs"
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import * as fs from "fs";
import { M4Node } from "@automation/m4nodejs/dist/m4Interfaces/M4Node";

describe("GTA - Time Slots Clock Declarative suite", ()=>{
    
    let globalAny: any;
    let m4Nodejs : M4ApiNode;
    let m4NodeGtaTimeSlots: M4Node;

    async function setupM4Object(): Promise<void>{
        const m4ObjGtaEditClockMock = await m4Nodejs.createM4Object("PSCO_GTA_EDIT_CLOCK");
        m4NodeGtaTimeSlots = m4ObjGtaEditClockMock.getNode('PLCO_GTA_TIMESLOTS_CLOCKSDECLS');
        const m4NodeGtaEditClockRwd = m4NodeGtaTimeSlots.getParentNode();
        m4NodeGtaEditClockRwd.addRecord();
    }

    beforeAll(async(done)=>{
        globalAny = global;

        m4Nodejs = await M4ApiNodejs("http://arya.meta4.com:5020", "Chuck_Norris", "Walker Texas Ranger");
        m4Nodejs.__mock__initialize__();
        m4Nodejs.__mock__setM4ObjectMetadata__("PSCO_GTA_EDIT_CLOCK", fs.readFileSync("./__mocks__/metadata/PSCO_GTA_EDIT_CLOCK.xml", 'utf8'));

        await m4Nodejs.__importJavaScriptFileFromUrl__("http://neferiow10.meta4.com/libreria/gta/timeslotsclocksdecls/timeslotsclocksdecls.js");

        await setupM4Object();

        done();
    });

    it("should calculate TimePickers with half hours",async()=>{
        m4NodeGtaTimeSlots.addRecord();
        m4NodeGtaTimeSlots.setValue("PLCO_DT_START_HOUR", new Date("2018-12-08T23:30:00.000Z"));
        m4NodeGtaTimeSlots.setValue("PLCO_DT_END_HOUR", new Date("2018-12-09T00:00:00.000Z"));

        m4NodeGtaTimeSlots.addRecord();
        m4NodeGtaTimeSlots.setValue("PLCO_DT_START_HOUR", new Date("2018-12-09T01:00:00.000Z"));
        m4NodeGtaTimeSlots.setValue("PLCO_DT_END_HOUR", new Date("2018-12-09T02:00:00.000Z"));

        const objectTimeslot = new globalAny.meta4.gta.timeslotsclocksdecls();

        objectTimeslot.__testonly__.initialize_node(m4NodeGtaTimeSlots);
        objectTimeslot.__testonly__.calculateTimepickersTotal();   

        expect(m4NodeGtaTimeSlots.getValue("PLCO_TOTAL_TIMESLOTS_HOURS")).toEqual(1.5);
    });
});