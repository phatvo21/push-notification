// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  // This will be used to configure minimum threshold enforcement for coverage results
  // With the following configuration jest will fail if there is less than around 80% branch,
  // line, and function coverage
  coverageThreshold: {
    global: {
      functions: 79,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '**/**/*.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!dist/**',
    '!jest.config.js',
    '!**/test/**',
    '!test/**',
  ],
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'text-summary'],
  // An array of regexp pattern strings that are matched against all test paths before executing the test.
  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/', '/dist/'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '@app/notification/(.*)': '<rootDir>/apps/notification/src/$1',
    '@app/notification': '<rootDir>/apps/notification/src',
    '@app/common/(.*)': '<rootDir>/libs/common/src/$1',
    '@app/common': '<rootDir>/libs/common/src',
  },
  setupFilesAfterEnv: ['jest-extended', './libs/common/tests/setup.testing.ts'],
};
