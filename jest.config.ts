import type { Config } from 'jest';

const jestConfig: Config = {
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest",{}],
    },
};

export default jestConfig;
