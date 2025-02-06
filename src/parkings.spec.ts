import {afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {ParkingsApi, PbxParking} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";
import {odataParamEncoder} from "../auth";

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

    it('List', async () => {
        const response = await api.listParking({
            $select: new Set<string>(['Id'])
        })
        console.log(colorize(response.data));
    })

    it('Get', async () => {
        const response = await api.getByNumber({
            number: odataParamEncoder(item.Number!)
        })
        console.log(colorize(response.data));
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
