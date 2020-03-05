import { M4Object } from "@automation/m4nodejs/dist/m4Interfaces/M4Object";
import { M4Node } from "@automation/m4nodejs/dist/m4Interfaces/M4Node";

class GtaEditClockWrapper {

    private m4GtaEditClock: M4Object;
    private m4NodeGtaTimeSlotsDeclaratives: M4Node;

    constructor(m4GtaEditClock: M4Object) {
        this.m4GtaEditClock = m4GtaEditClock;
        this.m4NodeGtaTimeSlotsDeclaratives = this.m4GtaEditClock.getNode('PLCO_GTA_TIMESLOTS_CLOCKSDECLS');
        this.initialize();
    }

    /**
     * 
     */
    get_M4Node_TimeSlotsClockDeclaratives(){
        return this.m4NodeGtaTimeSlotsDeclaratives;
    }

    /**
     * Setup M4Object to testing
     */
    private initialize() {
        const m4NodeGtaEditClockRwd = this.m4NodeGtaTimeSlotsDeclaratives.getParentNode();
        m4NodeGtaEditClockRwd.addRecord();
    }

    /**
     * 
     */
    addTimeslotsClocksDeclarative( times : Array<{dateStartHour: string, dateEndHour: string }> ){
        times.forEach( (timeItem)=>{
            this.m4NodeGtaTimeSlotsDeclaratives.addRecord();
            this.m4NodeGtaTimeSlotsDeclaratives.setValue("PLCO_DT_START_HOUR", new Date(timeItem.dateStartHour));
            this.m4NodeGtaTimeSlotsDeclaratives.setValue("PLCO_DT_END_HOUR", new Date(timeItem.dateEndHour));
        })
    }

    /**
     * 
     */
    getTotalTimeSlotHours(){
        return this.m4NodeGtaTimeSlotsDeclaratives.getValue("PLCO_TOTAL_TIMESLOTS_HOURS")
    }
}

export { GtaEditClockWrapper }