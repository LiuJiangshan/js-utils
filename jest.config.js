module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'jsx', 'node'],
  testMatch: ['**/?(*.)(spec|test).(js|ts)?(x)'],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  }
}
