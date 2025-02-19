import {
    afterEach, beforeAll, beforeEach, describe, it,
} from '@jest/globals';
import { ContactsApi, PbxContact } from './xapi';
import { xapiConfig } from '../config';
import { colorize } from 'json-colorizer';

describe('FAX tests', () => {
    let api: ContactsApi;
    let item: PbxContact;

    beforeAll(() => {
        api = new ContactsApi(xapiConfig);
    });

    beforeEach(async () => {
        const response = await api.createContact({
            pbxContact: {
                FirstName: 'Nikolai',
                PhoneNumber: '1234567890',
            },
        });
        item = response.data;
    });

    afterEach(async () => {
        await api.deleteContact({
            id: item.Id!,
        });
    });

    it('List', async () => {
        const response = await api.listContact({
            $select: new Set<string>(['Id']),
            $top: 1,
        });
        console.log(colorize(response.data));
    });
});
