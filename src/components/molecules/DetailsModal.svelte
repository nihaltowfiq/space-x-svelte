<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	type Props = {
		title: string;
		details: string;
	};
	const { title, details }: Props = $props();

	let isModal = $state(false);
</script>

<button
	color="light"
	onclick={() => (isModal = true)}
	class="rounded-md border-none bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
>
	View Details
</button>

<Modal {title} bind:open={isModal} autoclose outsideclose class="text-wrap">
	<p>{details}</p>
</Modal>
