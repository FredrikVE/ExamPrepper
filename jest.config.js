//jest.config.js
export default {
    testEnvironment: "node",
    transform: {
        "\\.jsx$": "<rootDir>/test/helpers/jsxOxcTransformer.cjs"
    },
    extensionsToTreatAsEsm: [".jsx"],
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
