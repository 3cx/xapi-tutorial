import {beforeAll, describe, it} from "@jest/globals";
import {SipDevicesApi} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";

describe('Phones tests', () => {
    let api: SipDevicesApi;

    beforeAll(() =>{
        api = new SipDevicesApi(xapiConfig);
    })

    it('List SIP devices', async () => {
        const list = await api.listSipDevice({
            $select: new Set<string>(['Id'])
        })
        console.log(colorize(list.data));
    })

})
