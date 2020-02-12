import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";

describe("Logon Mock suite", () => {

    let m4ApiNodejs: M4ApiNode ;

    beforeAll(async ()=>{
        const server = "http://arya.meta4.com:5020";
        const user = "LUISARAGONES";
        const pass = "YGANAR_YGANAR_YGANAR_YGANAR";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        spyOn(m4ApiNodejs,"logonPromise").and.returnValues(Promise.resolve("TengoUnAmigoJaponesQueEsSexadorDePollos"));
    });

    beforeAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logoutPromise();
        }
    })

    it("should do logon", async () => {
        const logonToken = "TengoUnAmigoJaponesQueEsSexadorDePollos";
        const token = await m4ApiNodejs.logonPromise()
        expect(token).toEqual(logonToken);
    });
});