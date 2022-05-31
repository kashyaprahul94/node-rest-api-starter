module.exports = {
	globals: {},
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	testMatch: ["**/*.(test|spec).ts"],
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
	coveragePathIgnorePatterns: ["/node_modules/"],
	coverageReporters: ["json", "lcov", "text", "text-summary"],
	moduleDirectories: ["node_modules", "<rootDir>/src"],
	moduleNameMapper: {
		"^@/utils/(.*)$": "<rootDir>/src/utils/$1",
	},
};
