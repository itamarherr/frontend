module.exports = {
    testEnvironment: "node", // Use "jsdom" for React or DOM testing
    transform: {
      "^.+\\.tsx?$": "ts-jest", // Enable TypeScript support
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Match test files
    collectCoverage: true, // Optional: Collect test coverage
    coverageDirectory: "coverage", // Optional: Output coverage reports to "coverage" folder
  };
  