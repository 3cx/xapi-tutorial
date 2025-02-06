import {afterEach, beforeAll, beforeEach, describe, expect, it} from '@jest/globals';
import {PbxQueue, QueuesApi} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";
import {odataParamEncoder} from "../auth";

describe('Queues tests', () => {
    let api: QueuesApi;
    let item: PbxQueue;

    beforeAll(() =>{
        api = new QueuesApi(xapiConfig);
    })

    beforeEach(async () => {
        const response = await api.createQueue({
            pbxQueue: {
                AnnouncementInterval: 50
            }
        });
        item = response.data;
    })

    afterEach(async () => {
        await api.deleteQueue({
            id: item.Id!
        })
    })

    it('List', async () => {
        const response = await api.listQueue({
            $select: new Set<string>(['Id'])
        })
        console.log(colorize(response.data));
    })

    it('Get', async () => {
        const response = await api.getQueueByNumber({
            number: odataParamEncoder(item.Number!)
        })
        console.log(colorize(response.data));
    })

    it('Create, update and delete', async () => {
        await api.updateQueue({
            id: item.Id!,
            pbxQueue: {
                Number: item.Number
            }
        })
    })

    it('Should not allow to change number', async () => {
        await expect(api.updateQueue({
            id: item.Id!,
            pbxQueue: {
                Number: '100'
            }
        })).rejects.toThrow();
    })
})
