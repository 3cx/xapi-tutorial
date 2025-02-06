import {afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {PbxRingGroup, RingGroupsApi} from "./xapi";
import {xapiConfig} from "../config";

describe('Ring group tests', () => {
    let api: RingGroupsApi;
    let item: PbxRingGroup;

    beforeAll(() =>{
        api = new RingGroupsApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createRingGroup({
            pbxRingGroup: {
                Name: 'RG'
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteRingGroup({
            id: item.Id!
        })
    })

    it('Create, update and delete RingGroup', async () => {
        await api.updateRingGroup({
            id: item.Id!,
            pbxRingGroup: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateRingGroup({
            id: item.Id!,
            pbxRingGroup: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
