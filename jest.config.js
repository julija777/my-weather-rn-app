const jestExpoPreset = require("jest-expo/jest-preset");

module.exports = {
  preset: "jest-expo/universal",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("babel-jest"), 
    ...jestExpoPreset.transform,
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|expo(nent)?|@expo(nent)?/.*)",
    "node_modules/(?!(react-native|@react-native|@react-native-community|@react-native-js-polyfills)/)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: 'jsdom',
};
