import {afterEach, beforeAll, beforeEach, describe, expect, it} from '@jest/globals';
import {PbxUser, UsersApi} from "./xapi";
import {xapiConfig} from "../config";

describe('User tests', () => {
    let api: UsersApi;
    let item: PbxUser;

    beforeAll(() =>{
        api = new UsersApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createUser({
            pbxUser: {
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteUser({
            id: item.Id!
        })
    })

    it('Create, update and delete', async () => {
        await api.updateUser({
            id: item.Id!,
            pbxUser: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateUser({
            id: item.Id!,
            pbxUser: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
