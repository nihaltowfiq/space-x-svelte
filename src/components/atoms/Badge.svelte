<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		color?: 'green' | 'red' | 'blue';
		children: Snippet;
	};

	const { color = 'green', children }: Props = $props();

	const variants = {
		green: 'bg-green-100 text-green-800',
		red: 'bg-red-100 text-red-800',
		blue: 'bg-blue-100 text-blue-800'
	};
</script>

<span class={`rounded-lg px-2 py-1 text-xs ${variants[color]}`}>
	{@render children()}
</span>
