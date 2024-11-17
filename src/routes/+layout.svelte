<script lang="ts">
	import { Navbar, NavBrand } from 'flowbite-svelte';
	import '../app.css';
	const { children } = $props();
</script>

<Navbar border class="py-4">
	<NavBrand href="/" class="mx-auto">
		<img src="/assets/logo.svg" class="h-6 md:h-[2.375rem]" alt="space x" />
	</NavBrand>
</Navbar>

<main class="container py-6">{@render children()}</main>
