module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/**/__tests__/*.[jt]s?(x)', '<rootDir>/**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleNameMapper: {
        '^lodash-es(.*)': 'lodash$1',
    },
};
