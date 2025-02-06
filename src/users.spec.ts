import {afterEach, beforeAll, beforeEach, describe, expect, it} from '@jest/globals';
import {GroupsApi, PbxGroup, PbxUser, UsersApi} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";
import {odataParamEncoder} from "../auth";

describe('User tests', () => {
    let usersApi: UsersApi;
    let groupsApi: GroupsApi;
    let user: PbxUser;

    beforeAll(() =>{
        usersApi = new UsersApi(xapiConfig);
        groupsApi = new GroupsApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await usersApi.createUser({
            pbxUser: {
            }
        });
        user = response.data;
    })

    afterEach(async () => {
        await usersApi.deleteUser({
            id: user.Id!
        })
    })

    it('List', async () => {
        const response = await usersApi.listUser({
            $select: new Set<string>(['Id'])
        })
        console.log(colorize(response.data));
    })

    it('Get', async () => {
        const response = await usersApi.getUserByNumber({
            number: odataParamEncoder(user.Number!)
        })
        console.log(colorize(response.data));
    })

    it('Create, update and delete', async () => {
        await usersApi.updateUser({
            id: user.Id!,
            pbxUser: {
                Number: user.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(usersApi.updateUser({
            id: user.Id!,
            pbxUser: {
                Number: '100'
            }
        })).rejects.toThrow();
    })

    describe('Group management', () =>{
        let group: PbxGroup;

        beforeEach(async () => {
            const response = await groupsApi.createGroup({
                pbxGroup: {
                    Name: 'Group 1',
                }
            });
            group = response.data;
        })

        afterEach(async () => {
            await groupsApi.deleteGroup({
                id: group.Id!
            })
        })

        it('Add and delete group member', async () => {
            await usersApi.updateUser({
                id: user.Id!,
                pbxUser: {
                    Groups: [{
                        GroupId: group.Id!,
                        Rights: {
                            RoleName: 'users'
                        }
                    }]
                }
            })
            await usersApi.updateUser({
                id: user.Id!,
                pbxUser: {
                    Groups: []
                }
            })
        })
    })

})
