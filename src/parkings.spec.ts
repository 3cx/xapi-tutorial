import {afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {ParkingsApi, PbxParking} from "./xapi";
import {xapiConfig} from "../config";

describe('Parking tests', () => {
    let api: ParkingsApi;
    let item: PbxParking;

    beforeAll(() =>{
        api = new ParkingsApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createParking({
            pbxParking: {
                Number: 'SP100'
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteParking({
            id: item.Id!
        })
    })

    it('Create, update and delete', async () => {
        await api.updateParking({
            id: item.Id!,
            pbxParking: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateParking({
            id: item.Id!,
            pbxParking: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
