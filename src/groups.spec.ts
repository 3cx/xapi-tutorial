import {afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {GroupsApi, PbxGroup} from "./xapi";
import {xapiConfig} from "../config";

describe('Groups tests', () => {
    let api: GroupsApi;
    let item: PbxGroup;

    beforeAll(() =>{
        api = new GroupsApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createGroup({
            pbxGroup: {
                Name: 'Group 1',
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteGroup({
            id: item.Id!
        })
    })

    it('Create, update and delete', async () => {
        await api.updateGroup({
            id: item.Id!,
            pbxGroup: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateGroup({
            id: item.Id!,
            pbxGroup: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
