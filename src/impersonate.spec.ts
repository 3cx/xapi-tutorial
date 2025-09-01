import { describe, it } from '@jest/globals';
import { xapiConfig } from '../config';
import axios from 'axios';

describe('Impersonate tests', () => {
    it('List outbound rules', async () => {
        if (typeof xapiConfig.accessToken === 'function') {
            const token = await xapiConfig.accessToken();
            await axios.post('http://localhost:5004/webclient/api/MyPhone/session', JSON.stringify({
                name: 'AI',
                version: '0.1',
                isHuman: false,
                impersonate: '110',
            }), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        }
    });
});
