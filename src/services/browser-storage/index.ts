export default function browserStorage(type: 'local' | 'session' = 'local') {
	if (typeof window === 'undefined') {
		return {
			set: () => {},
			get: () => null,
			remove: () => {}
		};
	}

	const store = type === 'session' ? sessionStorage : localStorage;

	const setValue = <T = unknown>(key: string, value: T) => {
		if (!key || !value) return;

		store.setItem(key, JSON.stringify(value));
	};

	const getValue = <T = unknown>(key: string): T | null => {
		if (!key) return null;

		const item = store.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
		return null;
	};

	const removeValue = (key: string) => {
		if (!key) return;

		store.removeItem(key);
	};

	return {
		set: setValue,
		get: getValue,
		remove: removeValue
	};
}
