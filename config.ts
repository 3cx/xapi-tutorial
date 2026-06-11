import { createXAPIConfiguration } from './auth';
import { config } from 'dotenv';

config();

export const xapiConfig = createXAPIConfiguration(
  process.env.XAPI_URL!,
  process.env.XAPI_CLIENT_ID!,
  process.env.XAPI_CLIENT_SECRET!,
);
