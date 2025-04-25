export function getNoError<T>(fallback: T, ...getters: (() => T)[]): T {
	for (const getter of getters) {
		try {
			return getter()
		} catch (e) {}
	}
	return fallback
}
