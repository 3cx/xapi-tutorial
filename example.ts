import {UsersApi} from "./src/xapi";
import {createXAPIConfiguration} from "./auth";

const xapiConfig = createXAPIConfiguration('http://127.0.0.1:5004', '<client_id>', '<api_key>');

async function main(){
    const usersApi = new UsersApi(xapiConfig);
    const users = await usersApi.listUser({
        $top: 1,
        $select: new Set(['FirstName', 'LastName', 'EmailAddress'])
    });
    console.log(users.data.value);
}

main();
