# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a tutorial/test application demonstrating how to use the 3CX XAPI (external API) for PBX system management. It contains Jest tests that serve as usage examples for the auto-generated TypeScript API client.

## Commands

```bash
yarn lint              # Run ESLint (Airbnb config, 4-space indent)
yarn gen               # Regenerate src/xapi/ from swagger.yaml via OpenAPI Generator
yarn jest -i                                        # Run all tests sequentially (required — see below)
yarn jest -i src/fax.spec.ts                        # Run a single test file
yarn jest -i src/users.spec.ts -t "test name here"  # Run a single test by name
```

## Architecture

### Layers

**Configuration** (`config.ts`) — Exports `xapiConfig`, a pre-built `Configuration` object used by all API classes. Credentials are read from environment variables: `XAPI_URL`, `XAPI_CLIENT_ID`, `XAPI_CLIENT_SECRET`. Copy `.env.example` to `.env` and fill in the values before running tests.

**Authentication** (`auth.ts`) — `createXAPIConfiguration()` wraps token management: fetches OAuth2 tokens, refreshes them on expiry, and uses `AsyncLock` to prevent concurrent token requests (the PBX only allows one active access token at a time).

**Generated API** (`src/xapi/`) — Auto-generated TypeScript-Axios client from `swagger.yaml` (OpenAPI 3.0.4). The main file `api.ts` (~75k lines) exports all API classes: `UsersApi`, `GroupsApi`, `FaxApi`, `ContactsApi`, `SystemStatusApi`, and 100+ more. Regenerate with `yarn gen` after updating `swagger.yaml`.

**Tests** (`src/*.spec.ts`) — 14 Jest test files, one per domain (users, groups, fax, contacts, IVR, trunks, queues, ring-groups, outbound-rules, parking, service-principals, system-information, impersonate). Tests serve as API usage examples.

**Utilities** (`src/util.ts`) — `randomName()` and `alphanumericPassword()` for generating test data.

### Test Pattern

All test files follow the same structure: `beforeAll` creates an API instance from `xapiConfig`, `beforeEach`/`afterEach` create and clean up a PBX entity, and individual `it` blocks test list/update/delete/validation operations.

### Critical Constraints

- **Run tests with `-i`** (in-band/sequential): the PBX allows only one active access token. Parallel execution causes authentication failures.
- **Tests mutate PBX state**: run against a dedicated test PBX instance or take a backup before running.
- **Enterprise license required**: the XAPI endpoint is only available on 3CX Enterprise.
