import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@libs': path.resolve(__dirname, 'src/libs'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@services': path.resolve(__dirname, 'src/services')
		}
	},
	plugins: [sveltekit()]
});
