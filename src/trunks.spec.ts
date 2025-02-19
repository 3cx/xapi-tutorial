import {
    afterEach, beforeAll, beforeEach, describe, it,
} from '@jest/globals';
import { PbxTrunk, TrunksApi } from './xapi';
import { xapiConfig } from '../config';
import { odataParamEncoder } from '../auth';
import { colorize } from 'json-colorizer';
import { alphanumericPassword } from './util';

describe('Trunk tests', () => {
    let api: TrunksApi;
    let item: PbxTrunk;

    beforeAll(() => {
        api = new TrunksApi(xapiConfig);
    });

    beforeEach(async () => {
        // Create trunk data from template
        const initTrunk = await api.initTrunk({
            template: odataParamEncoder('1cx.pv.xml'),
        });
        // Use provided data and fill in remaining params
        const response = await api.createTrunk({
            pbxTrunk: {
                ...initTrunk.data,
                AuthPassword: {
                    Value: alphanumericPassword(10),
                },
            },
        });
        item = response.data;
    });

    afterEach(async () => {
        if (item) {
            await api.deleteTrunk({
                id: item.Id!,
            });
        }
    });

    it('List', async () => {
        const response = await api.listTrunk({
            $select: new Set<string>(['Id']),
        });
        console.log(colorize(response.data));
    });

    it('Get', async () => {
        const response = await api.getTrunkByNumber({
            number: odataParamEncoder(item.Number!),
        });
        console.log(colorize(response.data));
    });
});
