// import defineConfig from cypress to set up configuration for cypress end-to-end tests
const { defineConfig } = require("cypress");

// export the cypress config
module.exports = defineConfig({
    // specifically for e2e test
  e2e: {
    // tells cypress where app is running
    baseUrl: "http://localhost:5173",
  },
});
