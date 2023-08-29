export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/jest-svg-transformer.js",
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/src/components$1",
    "^@/services(.*)$": "<rootDir>/src/services$1",
    "^@/assets(.*)$": "<rootDir>/src/assets$1",
    "^@/pages(.*)$": "<rootDir>/src/pages$1",
  },
  testEnvironment: "jsdom",
  errorOnDeprecated: false,
};
