// jest configuration file for running tests in project

module.exports = {
  // tells jest to simulate a browser-like environment using jsdom
  testEnvironment: "jsdom",
  // run setup file before every test
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  // module name mappper to handle non-javascript imports
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^react$": "<rootDir>/node_modules/react",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "^react/jsx-runtime$": "<rootDir>/node_modules/react/jsx-runtime.js",
  },
  // tells jest how to process javascript and jsx files using babel-jest to transform them with the babel config defined in babel.config.cjs
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
