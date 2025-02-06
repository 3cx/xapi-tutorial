import {afterEach, beforeAll, beforeEach, describe, expect, it} from '@jest/globals';
import {PbxReceptionist, ReceptionistsApi} from "./xapi";
import {xapiConfig} from "../config";

describe('IVR tests', () => {
    let api: ReceptionistsApi;
    let item: PbxReceptionist;

    beforeAll(() =>{
        api = new ReceptionistsApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createReceptionist({
            pbxReceptionist: {
                Name: 'testIVR'
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteReceptionist({
            id: item.Id!
        })
    })

    it('Create, update and delete', async () => {
        await api.updateReceptionist({
            id: item.Id!,
            pbxReceptionist: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateReceptionist({
            id: item.Id!,
            pbxReceptionist: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
