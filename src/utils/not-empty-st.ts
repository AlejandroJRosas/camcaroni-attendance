import { EnvError, makeValidator } from "envalid";

export const notEmptyStr = makeValidator<string>((input: string) => {
	const coerced = input.trim();
	if (coerced.length <= 0)
		throw new EnvError(`Invalid not empty string input: "${input}"`);
	return coerced;
});
