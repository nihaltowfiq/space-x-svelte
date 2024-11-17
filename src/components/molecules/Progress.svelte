<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';

	const { value }: Props = $props();

	type Props = {
		value?: number | null;
	};
</script>

{#if value && typeof value === 'number'}
	<div>
		<Progressbar
			animate
			precision={2}
			tweenDuration={1500}
			easing={sineOut}
			labelInside={false}
			progress={value}
			progressClass="bg-green-400"
		/>
		<p class="text-sm font-normal leading-4">{value}%</p>
	</div>
{:else}
	N/A
{/if}
