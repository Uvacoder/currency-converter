export default {
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.ts"],
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
