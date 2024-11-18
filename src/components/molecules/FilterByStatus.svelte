<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { filterOptions } from '@utils/constants';
	import { Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	import { AdjustmentsVerticalSolid, ChevronDownOutline } from 'flowbite-svelte-icons';

	let isDropdownOpen = false;

	const handleFilter = (value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set('status', value);

		isDropdownOpen = false;
		goto(`${$page.url.pathname}?${searchParams.toString()}`);
	};
</script>

<Button color="alternative" class="ml-auto bg-gray-100 px-3 py-[0.325rem] md:px-5">
	<AdjustmentsVerticalSolid class="me-1 h-4 w-4 sm:me-2" />
	<span>Filter By Status</span>
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
