module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  roots: ['<rootDir>'],
  testRegex: '(/_tests_/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
