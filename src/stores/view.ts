import browserStorage from '@services/browser-storage';
import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

const initialView = isBrowser ? browserStorage().get<string>('view') || 'table' : 'table';
const view = writable<string>(initialView);

if (isBrowser) {
	view.subscribe((value) => {
		browserStorage().set('view', value);
	});
}

export default view;
