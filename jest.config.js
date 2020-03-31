module.exports = {
  verbose: true,
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/packages/babel-jest',
  },
  coverageReporters: ['json'],
  reporters: [
    [
      'jest-junit',
      { outputDirectory: 'reports/junit', outputName: 'js-test-results.xml' },
    ],
    [
      'jest-silent-reporter',
      { showPaths: true, showWarnings: true, useDots: true },
    ],
  ],
};
