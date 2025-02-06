import {Configuration} from "./src/xapi";
import AsyncLock from 'async-lock';
import axios, {AxiosError} from "axios";

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error instanceof AxiosError ? new Error(JSON.stringify(error.response?.data)) : error);
})

export interface TokenResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
}

export async function getAccessToken(basePath: string, username: string, password: string): Promise<TokenResponse> {
    const formParams = new FormData();
    formParams.append('client_id', username);
    formParams.append('client_secret', password);
    formParams.append('grant_type', 'client_credentials');
    const refreshResponseFetch = await fetch(`${basePath}/connect/token`, {
        method: 'POST',
        body: formParams
    });
    if (!refreshResponseFetch.ok) {
        throw new Error(`Refresh failed with status code ${refreshResponseFetch.status}'`);
    }
    return refreshResponseFetch.json();
}

export function createXAPIConfiguration(basePath: string, username: string, password: string){
    let accessTokenResponse: TokenResponse| null = null;
    let expires = 0;
    const lock = new AsyncLock();

    return new Configuration({
        basePath: `${basePath}/xapi/v1`,
        accessToken: async () => lock.acquire('token', async () => {
            const now = Date.now();
            if (!accessTokenResponse || now > expires){
                accessTokenResponse = await getAccessToken(basePath, username, password);
                expires = now + accessTokenResponse.expires_in * 60 * 1000;
            }
            return accessTokenResponse.access_token
        })
    })
}
