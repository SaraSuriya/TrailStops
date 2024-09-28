module.exports = {
    verbose: true,
    // clearMocks: true,
    globals: {
        axios: require("axios"),
       },
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      },
    setupFilesAfterEnv: ['@testing-library/jest-dom', './setupJest.js'],
  };