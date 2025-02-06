import {afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {PbxServicePrincipal, ServicePrincipalsApi} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";

describe('Service principal tests', () => {
    let api: ServicePrincipalsApi;
    let item: PbxServicePrincipal;

    beforeAll(() =>{
        api = new ServicePrincipalsApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createServicePrincipal({
            pbxServicePrincipal: {
                Number: 'sptest'
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteServicePrincipal({
            id: item.Id!
        })
    })

    it('List', async () => {
        const response = await api.listServicePrincipal({
            $select: new Set<string>(['Id'])
        })
        console.log(colorize(response.data));
    })

    it('Create, update and delete RingGroup', async () => {
        await api.updateServicePrincipal({
            id: item.Id!,
            pbxServicePrincipal: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateServicePrincipal({
            id: item.Id!,
            pbxServicePrincipal: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
