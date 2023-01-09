/* eslint-disable no-useless-escape */
module.exports = {
  transformIgnorePatterns: ['node_modules/(?!\\@?axios)'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/cssStub.js',
    '\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mediaStub.js',
  },
};
