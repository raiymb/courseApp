import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // Use Node.js environment for testing
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"], // Path to setup file
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/tests/**/*.test.ts"], // Match test files in "tests" folder
  verbose: true, // Show detailed test results
};

export default config;
