import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ItemChangedEvent } from "@franjmr/m4-node-api/dist/m4Interfaces/client/events/M4ItemChangedEvent";
import { M4NodeCurrentChangedEvent } from "@franjmr/m4-node-api/dist/m4Interfaces/client/events/M4NodeCurrentChangedEvent";
import { M4NodeRecordsChangedEvent } from "@franjmr/m4-node-api/dist/m4Interfaces/client/events/M4NodeRecordsChangedEvent";

async function example(){
    const server = "http://arya.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";

    const m4apinode = await M4ApiNodejs(server,user,pass);

    await m4apinode.logon();

    const m4object = await m4apinode.createM4Object("PLCO_LOAD_ALL_PERSONAL_INFO");
    const m4node = m4object.getNode("PSCO_EMPLOYEE_RECORD_HEADER");
    const m4nodeObservableItemchange = m4apinode.createObservableByNodeItemChanged(m4node);
    const m4nodeObservableCurrentChanged = m4apinode.createObservableByNodeCurrentChanged(m4node);
    const m4nodeObservableRecordsChanged = m4apinode.createObservableByNodeRecordsChanged(m4node);

    await m4apinode.executeM4ObjectMethod(m4object, "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
    
    m4nodeObservableItemchange.subscribe({
        next(event:M4ItemChangedEvent) { console.log('Observable Item Changed - Item Id: '+event.getItemId()); },
        error(err:TypeError) { console.error('Observable Item Changed - something wrong occurred: ' + err); },
        complete() { console.log('Observable Item Changed - done'); }
    });

    m4nodeObservableCurrentChanged.subscribe({
        next(event:M4NodeCurrentChangedEvent) { console.log('Observable Current Change - Node Current: '+event.getNode().getCurrent()); },
        error(err:TypeError) { console.error('Observable Current Changed - something wrong occurred: ' + err); },
        complete() { console.log('Observable Current Changed Item Changed - done'); }
    });

    m4nodeObservableRecordsChanged.subscribe({
        next(event:M4NodeRecordsChangedEvent) { console.log('Observable Records Change - Node Count: ' +event.getNode().count()); },
        error(err:TypeError) { console.error('Observable Records Changed - something wrong occurred: ' + err); },
        complete() { console.log('Observable Records Changed - done'); }
    });

    // Check Observables

    console.log('Previous Observable Node Records - Node Count: '+m4node.count());
    console.log('Previous Observable Node Current - Node Current: '+m4node.getCurrent());
    m4node.addRecord();
    m4node.setValue("PSCO_EMPLOYEE_NAME","Yoshimitsu");

    await m4apinode.logout();
    console.log("All done")
}

example();