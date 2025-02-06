import {beforeAll, describe, it} from "@jest/globals";
import {OutboundRulesApi} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";

describe('Outbound rules tests', () => {
    let api: OutboundRulesApi;

    beforeAll(() =>{
        api = new OutboundRulesApi(xapiConfig);
    })

    it('List outbound rules', async () => {
        const list = await api.listOutboundRule({
            $select: new Set<string>(['Id'])
        })
        console.log(colorize(list.data));
    })

})
