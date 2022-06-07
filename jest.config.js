module.exports = {
  rootDir: `.`,
  testEnvironment: `node`,
  modulePathIgnorePatterns: [`dist`],
  moduleNameMapper: {
    "~": `<rootDir>/lib/index.ts`,
  },
  testRegex: `test.(ts|js)$`,
  coverageDirectory: `./coverage/`,
  collectCoverage: true,
  coverageReporters: [`json`, `html`, `text`, `text-summary`],
  collectCoverageFrom: [`./lib/**/*.{js,ts}`],
  coveragePathIgnorePatterns: [`<rootDir>/node_modules`],
}
