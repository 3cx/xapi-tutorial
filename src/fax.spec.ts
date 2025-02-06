import {afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {FaxApi, PbxFax} from "./xapi";
import {xapiConfig} from "../config";

describe('FAX tests', () => {
    let api: FaxApi;
    let item: PbxFax;

    beforeAll(() =>{
        api = new FaxApi(xapiConfig);
    })

    beforeEach(async () => {
        const initFax = await api.initFax();
        const response = await api.createFax({
            pbxFax: initFax.data
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteFax({
            id: item.Id!
        })
    })

    it('Create, update and delete', async () => {
        await api.updateFax({
            id: item.Id!,
            pbxFax: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateFax({
            id: item.Id!,
            pbxFax: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
