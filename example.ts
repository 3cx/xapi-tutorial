import {UsersApi} from "./src/xapi";
import {createXAPIConfiguration} from "./auth";

const xapiConfig = createXAPIConfiguration('http://127.0.0.1:5004', 'client1', 'VnVG7T211fzAWRKBPEPmL78zQ95AQt89');

async function main(){
    const usersApi = new UsersApi(xapiConfig);
    const users = await usersApi.listUser({
        $top: 10,
        $select: new Set(['FirstName', 'LastName', 'EmailAddress'])
    });
    console.log(users.data.value);
}

main();
