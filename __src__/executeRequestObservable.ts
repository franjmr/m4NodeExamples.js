import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4Event } from "@franjmr/m4-node-api/dist/m4Interfaces/M4Event";

async function example(){
    const server = "http://arya.meta4.com:5020";
    const user = "ORLIEMOBILE";
    const pass = "RUN";

    const m4apinode = await M4ApiNodejs(server,user,pass);

    await m4apinode.logonPromise();

    const m4object = await m4apinode.createM4ObjectAsync("PLCO_LOAD_ALL_PERSONAL_INFO");
    const m4node = m4object.getNode("PSCO_EMPLOYEE_RECORD_HEADER");
    const m4nodeObservableItemchange = m4apinode.createObservableByNodeItemChanged(m4node);
    const m4nodeObservableCurrentChanged = m4apinode.createObservableByNodeCurrentChanged(m4node);
    const m4nodeObservableRecordsChanged = m4apinode.createObservableByNodeRecordsChanged(m4node);

    await m4apinode.executeM4ObjectMethodPromise(m4object, "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
    
    m4nodeObservableItemchange.subscribe({
        next(event:M4Event) { console.log('Observale Item Changed'); },
        error(err:TypeError) { console.error('Observale Item Changed - something wrong occurred: ' + err); },
        complete() { console.log('Observale Item Changed - done'); }
    });

    m4nodeObservableCurrentChanged.subscribe({
        next(event:M4Event) { console.log('Observale Current Change'); },
        error(err:TypeError) { console.error('Observale Current Changed - something wrong occurred: ' + err); },
        complete() { console.log('Observale Current Changed Item Changed - done'); }
    });

    m4nodeObservableRecordsChanged.subscribe({
        next(event:M4Event) { console.log('Observale Records Change'); },
        error(err:TypeError) { console.error('Observale Records Changed - something wrong occurred: ' + err); },
        complete() { console.log('Observale Records Changed - done'); }
    });

    // Check Observables
    m4node.addRecord();
    m4node.setValue("PSCO_EMPLOYEE_NAME","Yoshimitsu");

    await m4apinode.logoutPromise();
    console.log("All done")
}

example();