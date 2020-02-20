import { M4ApiNodejs } from "@franjmr/m4-node-api";
import { M4ApiNode } from "@franjmr/m4-node-api/dist/m4apiNode";
import { M4LogonResult } from "@franjmr/m4-node-api/dist/m4Interfaces/M4LogonResult";

describe("Logon Mock suite", () => {

    let m4ApiNodejs: M4ApiNode ;
    const logonToken: string = "TengoUnAmigoJaponesQueEsSexadorDePollos";

    class MockM4LogonResult implements M4LogonResult {
        getToken(): string {
            return logonToken;
        }
        getLogonStatus(): number {
            throw new Error("Method not implemented.");
        }
        getLogonStatusAsString(): string {
            throw new Error("Method not implemented.");
        }
        getRoleId(): string {
            throw new Error("Method not implemented.");
        }
        getOrganizationId(): string {
            throw new Error("Method not implemented.");
        }
        getRoles(): any[] {
            throw new Error("Method not implemented.");
        }
        isAuthenticated() {
            return 'Mocked';
        }
    }
    const mockM4LogonResult = new MockM4LogonResult();

    beforeAll(async ()=>{
        const server = "http://arya.meta4.com:5020";
        const user = "LUISARAGONES";
        const pass = "YGANAR_YGANAR_YGANAR_YGANAR";
        m4ApiNodejs = await M4ApiNodejs(server,user,pass);
        spyOn(m4ApiNodejs,"logon").and.returnValues(Promise.resolve(mockM4LogonResult));
    });

    afterAll(async() => {
        if(m4ApiNodejs){
            await m4ApiNodejs.logout();
        }
    })

    it("should do logon", async () => {
        const m4LogonResult = await m4ApiNodejs.logon()
        expect(m4LogonResult.getToken()).toEqual(logonToken);
    });
});