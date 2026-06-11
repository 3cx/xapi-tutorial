# Getting Started with XAPI Application

This is an application example for 3CX XAPI API demonstration.

## Configuration steps from PBX Side

From the Admin Console in the 3CX Webclient, go to Integrations > API:
1. Press the Add button to create a new client application.
2. Specify the ClientID (DN for accessing the route point, which is also needed for authorization).
3. Check the XAPI Access Enabled checkbox.
4. Select group and desired role.
4. After successfully creating a new API instance, you will receive an API key for your third-party applications. This key will be shown only once, so be sure to save it for future use.

- [x] **That's it! You've successfully completed the PBX configuration.**

> [!IMPORTANT]
> You must have a 3CX Enterprise license to use 3CX XAPI.

## Credentials

Copy the example env file and fill in your PBX details:

```bash
cp .env.example .env
```

Edit `.env`:

```
XAPI_URL=https://your-pbx.example.com
XAPI_CLIENT_ID=<client_id from step 2>
XAPI_CLIENT_SECRET=<client_secret from step 4>
```

## Test run

> **Warning:** The tests CAN ALTER your PBX! Make a backup or use a separate instance.

Tests must run sequentially — only one access token can be active at a time.

```bash
# All tests
yarn jest -i

# Single file
yarn jest -i src/fax.spec.ts

# Single test by name
yarn jest -i src/users.spec.ts -t "test name here"
```

You can explore the Jest test suites in the `src/` folder to see how to use the API.
