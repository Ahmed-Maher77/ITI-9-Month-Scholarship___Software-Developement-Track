module.exports = {
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { types: ["jest"] } }],
  },
};
