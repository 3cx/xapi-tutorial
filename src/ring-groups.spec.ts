import {
    afterEach, beforeAll, beforeEach, describe, expect, it,
} from '@jest/globals';
import { PbxRingGroup, RingGroupsApi } from './xapi';
import { xapiConfig } from '../config';
import { colorize } from 'json-colorizer';
import { odataParamEncoder } from '../auth';

describe('Ring group tests', () => {
    let api: RingGroupsApi;
    let item: PbxRingGroup;

    beforeAll(() => {
        api = new RingGroupsApi(xapiConfig);
    });

    beforeEach(async () => {
        const response = await api.createRingGroup({
            pbxRingGroup: {
                Name: 'RG',
            },
        });
        item = response.data;
    });

    afterEach(async () => {
        await api.deleteRingGroup({
            id: item.Id!,
        });
    });

    it('List', async () => {
        const response = await api.listRingGroup({
            $select: new Set<string>(['Id']),
        });
        console.log(colorize(response.data));
    });

    it('Get', async () => {
        const response = await api.getRingGroupByNumber({
            number: odataParamEncoder(item.Number!),
        });
        console.log(colorize(response.data));
    });

    it('Create, update and delete RingGroup', async () => {
        await api.updateRingGroup({
            id: item.Id!,
            pbxRingGroup: {
                Number: item.Number,
            },
        });
    });

    it('Should not allow to change number', async () => {
        await expect(api.updateRingGroup({
            id: item.Id!,
            pbxRingGroup: {
                Number: '100',
            },
        })).rejects.toThrow();
    });
});
