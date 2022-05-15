// jest.config.js
module.exports = {
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    collectCoverageFrom: [
        "pages/**",
        "!**/node_modules/**",
        "!**/tests/**"
    ],
    verbose: true,
    resetMocks: true
  };