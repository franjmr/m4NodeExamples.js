import { M4TestUtils } from "@automation/m4nodejs";

async function example(){
    const m4TestUtils = new M4TestUtils();
    await m4TestUtils.createXmlMetadataFile("http://jonsnow.meta4.com:13020", "JCM_ESS", "123", "SRCO_PA_WZ_FAMILY","C:/Temp");
}

example();