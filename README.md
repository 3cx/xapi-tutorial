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

## Test run

1. In the example.ts file put your base PBX URL, client_id from step 2. and client_secret from step 4.
2. Launch yarn
3. Launch yarn.start

