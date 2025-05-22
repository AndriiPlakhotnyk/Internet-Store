import { useEffect } from 'react';

export function useDebounceEffect(
	fn: () => void,
	deps: React.DependencyList,
	delay: number,
) {
	useEffect(() => {
		const timeout = setTimeout(() => {
			fn();
		}, delay);

		return () => clearTimeout(timeout);
	}, deps);
}
