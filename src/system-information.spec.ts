import {beforeAll, describe, it} from "@jest/globals";
import {DefsApi, LicenseStatusApi, SystemStatusApi} from "./xapi";
import {xapiConfig} from "../config";
import {colorize} from "json-colorizer";

describe('Sys Info tests', () => {
    let api: SystemStatusApi;
    let defsApi: DefsApi;
    let licenseApi: LicenseStatusApi;

    beforeAll(() =>{
        api = new SystemStatusApi(xapiConfig);
        defsApi = new DefsApi(xapiConfig);
        licenseApi = new LicenseStatusApi(xapiConfig);
    })

    it('Show system status', async () => {
        const status = await api.getSystemStatus({
        })
        console.log(colorize(status.data));
    })

    it('Show system health status', async () => {
        const status = await api.systemHealthStatus({
        })
        console.log(colorize(status.data));
    })

    it('Show system parameters', async () => {
        const status = await defsApi.getSystemParameters({
        })
        console.log(colorize(status.data));
    })

    it('Show license', async () => {
        const status = await licenseApi.getLicenseStatus({
        })
        console.log(colorize(status.data));
    })
})
