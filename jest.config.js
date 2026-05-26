//jest.config.js
export default {
    testEnvironment: "node",
    transform: {},
    testMatch: [
        "**/test/**/*.test.js",
        "**/test/**/*.integration.test.js"
    ],
    collectCoverageFrom: [
        "src/model/**/*.js",
        "src/utils/**/*.js"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ]
};
