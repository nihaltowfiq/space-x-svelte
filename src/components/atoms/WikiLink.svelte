<script lang="ts">
	import { LinkOutline } from 'flowbite-svelte-icons';

	const { href }: { href: string } = $props();
</script>

<a {href} target="_blank" class="text-blue-600">
	<LinkOutline />
</a>
