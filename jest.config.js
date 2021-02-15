module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage/jest'
};