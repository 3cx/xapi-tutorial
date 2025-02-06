import {
    afterEach, beforeAll, beforeEach, describe, expect, it,
} from '@jest/globals';
import {
    GroupsApi, PbxGroup, PbxUser, UsersApi,
} from './xapi';
import { xapiConfig } from '../config';
import { colorize } from 'json-colorizer';

describe('Groups tests', () => {
    let groupsApi: GroupsApi;
    let usersApi: UsersApi;
    let group: PbxGroup;

    beforeAll(() => {
        groupsApi = new GroupsApi(xapiConfig);
        usersApi = new UsersApi(xapiConfig);
    });

    beforeEach(async () => {
        const response = await groupsApi.createGroup({
            pbxGroup: {
                Name: 'Group 1',
            },
        });
        group = response.data;
    });

    afterEach(async () => {
        await groupsApi.deleteGroup({
            id: group.Id!,
        });
    });

    it('List', async () => {
        const response = await groupsApi.listGroup({
            $select: new Set<string>(['Id']),
        });
        console.log(colorize(response.data));
    });

    it('Create, update and delete', async () => {
        await groupsApi.updateGroup({
            id: group.Id!,
            pbxGroup: {
                Number: group.Number,
            },
        });
    });

    it('Should not allow to change number', async () => {
        await expect(groupsApi.updateGroup({
            id: group.Id!,
            pbxGroup: {
                Number: '100',
            },
        })).rejects.toThrow();
    });

    describe('User management', () => {
        let user: PbxUser;

        beforeEach(async () => {
            const response = await usersApi.createUser({
                pbxUser: {
                },
            });
            user = response.data;
        });

        afterEach(async () => {
            await usersApi.deleteUser({
                id: user.Id!,
            });
        });

        it('Add and delete group member', async () => {
            await groupsApi.updateGroup({
                id: group.Id!,
                pbxGroup: {
                    Members: [{
                        Number: user.Number!,
                        Rights: {
                            RoleName: 'users',
                        },
                    }],
                },
            });
            await groupsApi.updateGroup({
                id: group.Id!,
                pbxGroup: {
                    Members: [],
                },
            });
        });
    });
});
