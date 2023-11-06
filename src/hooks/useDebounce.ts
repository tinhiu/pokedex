import { useEffect, useState } from 'react';

export default function useDebounce(value: any, delay: number) {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const event = setTimeout(() => setDebounceValue(value), delay);

		return () => clearTimeout(event);
	}, [value, delay]);

	return debounceValue;
}
