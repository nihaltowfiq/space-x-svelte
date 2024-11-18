<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { filterOptions } from '@utils/constants';
	import { Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalSolid,
		ChevronDownOutline,
		RefreshOutline
	} from 'flowbite-svelte-icons';

	let isDropdownOpen = $state(false);

	const handleFilter = (value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set('status', value);

		isDropdownOpen = false;
		goto(`${$page.url.pathname}?${searchParams.toString()}`);
	};
</script>

<div class="flex items-center gap-1 sm:gap-2">
	{#if $page.url.searchParams.size > 0}
		<Button
			color="alternative"
			onclick={() => goto('/')}
			class="ml-auto px-3 py-[0.325rem] md:px-5"
		>
			<RefreshOutline class="h-6 w-6" />
			<span class="hidden md:ms-1 md:inline-block">Reset</span>
		</Button>
	{/if}

	<Button color="alternative" class="ml-auto bg-gray-100 px-3 py-[0.325rem] md:px-5">
		<AdjustmentsVerticalSolid class="me-1 hidden h-4 w-4 sm:me-2 md:inline-block" />
		<span>Filter <span class="hidden md:inline">By Status</span> </span>
		<ChevronDownOutline class="ms-1 h-6 w-6 sm:ms-2" />
	</Button>
	<Dropdown bind:open={isDropdownOpen} class="w-[200px]">
		{#each filterOptions as { name, value }}
			<DropdownItem>
				<Radio
					{value}
					name="filter"
					class="hover:cursor-pointer"
					onchange={() => handleFilter(value)}
					checked={$page.url.searchParams.get('status') === value}
				>
					{name}
				</Radio>
			</DropdownItem>
		{/each}
	</Dropdown>
</div>
