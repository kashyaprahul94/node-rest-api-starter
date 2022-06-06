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
		"^@/config/(.*)$": "<rootDir>/src/config/$1",
		"^@/core/(.*)$": "<rootDir>/src/core/$1",
		"^@/features/(.*)$": "<rootDir>/src/features/$1",
		"^@/jobs/(.*)$": "<rootDir>/src/jobs/$1",
		"^@/server/(.*)$": "<rootDir>/src/server/$1",
	},
};
