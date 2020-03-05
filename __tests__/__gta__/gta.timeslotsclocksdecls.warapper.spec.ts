import {M4ApiNodejs} from "@automation/m4nodejs"
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import * as fs from "fs";
import { M4Node } from "@automation/m4nodejs/dist/m4Interfaces/M4Node";
import { GtaEditClockWrapper } from "./wrapper/GtaEditClockWrapper";

describe("GTA - timeslotsclocksdecls with wrapper suite", ()=>{
    
    let globalAny: any;
    let m4Nodejs : M4ApiNode;
    let wrapper : GtaEditClockWrapper
    let objectTimeslot : any;

    beforeAll(async(done)=>{
        globalAny = global;

        m4Nodejs = await M4ApiNodejs("http://arya.meta4.com:5020", "Chuck_Norris", "Walker Texas Ranger");
        m4Nodejs.__mock__initialize__();
        m4Nodejs.__mock__setM4ObjectMetadata__("PSCO_GTA_EDIT_CLOCK", fs.readFileSync("./__mocks__/metadata/PSCO_GTA_EDIT_CLOCK.xml", 'utf8'));

        await m4Nodejs.__importJavaScriptFileFromUrl__("http://neferiow10.meta4.com/libreria/gta/timeslotsclocksdecls/timeslotsclocksdecls.js");

        done();
    });

    beforeEach(async()=>{
        objectTimeslot = new globalAny.meta4.gta.timeslotsclocksdecls();
        const m4ObjGtaEditClockMock = await m4Nodejs.createM4Object("PSCO_GTA_EDIT_CLOCK");
        wrapper = new GtaEditClockWrapper(m4ObjGtaEditClockMock);
    })

    it("should calculate TimePickers with half hours in two clocks",async()=>{
        const times = [
            {dateStartHour: "2018-12-08T23:30:00.000Z", dateEndHour: "2018-12-09T00:00:00.000Z"}, 
            {dateStartHour: "2018-12-09T01:00:00.000Z", dateEndHour: "2018-12-09T02:00:00.000Z"}
        ]

        wrapper.addTimeslotsClocksDeclarative(times);
        objectTimeslot.__testonly__.initialize_node(wrapper.get_M4Node_TimeSlotsClockDeclaratives());
        objectTimeslot.__testonly__.calculateTimepickersTotal();   

        expect(wrapper.getTotalTimeSlotHours()).toEqual(1.5);
    });

    it("should calculate TimePickers with half hours in three clocks",async()=>{
        const times = [
            {dateStartHour: "2018-12-08T23:30:00.000Z", dateEndHour: "2018-12-09T00:00:00.000Z"}, 
            {dateStartHour: "2018-12-09T01:00:00.000Z", dateEndHour: "2018-12-09T02:00:00.000Z"},
            {dateStartHour: "2018-12-09T02:00:00.000Z", dateEndHour: "2018-12-09T03:00:00.000Z"}
        ]

        wrapper.addTimeslotsClocksDeclarative(times);
        objectTimeslot.__testonly__.initialize_node(wrapper.get_M4Node_TimeSlotsClockDeclaratives());
        objectTimeslot.__testonly__.calculateTimepickersTotal();   

        expect(wrapper.getTotalTimeSlotHours()).toEqual(2.5);
    });
});