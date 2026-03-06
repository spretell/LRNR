// babel config file used by jest when running tests ; converts modern javascript and react jsx into code that the test environment can understand
module.exports = {
  presets: [
    // preset-env with target of current node version to ensure compatibility with jest's test environment
    ["@babel/preset-env", { targets: { node: "current" } }],
    // preset-react with automatic runtime to allow for jsx syntax in tests without needing to import React in each test file
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
