<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';

	const { value }: Props = $props();

	type Props = {
		value: number | string;
	};

	console.log({ value });
</script>

{#if value && typeof Number(value) === 'number'}
	<div>
		<Progressbar
			animate
			precision={1}
			tweenDuration={1500}
			easing={sineOut}
			labelInside={false}
			progress={value}
			progressClass="bg-green-400 h-[6px]"
			class="h-[6px]"
		/>
		<p class="text-sm font-normal leading-4">{value}%</p>
	</div>
{:else}
	N/A
{/if}
