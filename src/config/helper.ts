export const getConfigValue = (key: string, required?: boolean) => {
	const value = process.env[key] ?? "NO_VALUE";

	if (value === "NO_VALUE" && required) {
		throw new Error(`Missing configuration value - ${key}`);
	}

	return value === "NO_VALUE" ? "" : value;
};
