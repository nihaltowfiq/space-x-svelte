<script lang="ts">
	import { page } from '$app/stores';
	import { FilterByStatus, ViewSwitcher } from '@components/molecules';
	import { GridView, Map, TableView } from '@components/organisms';
	import { getLandPads } from '@libs/api';
	import { type LandPad } from '@libs/types';
	import view from '@stores/view';

	let data: LandPad[] | null = $state(null);
	let loading: boolean = $state(true);
	let filteredData: LandPad[] | null = $state(null);

	$effect(() => {
		getData();
	});

	$effect(() => {
		if (data) {
			filteredData = data.filter((item) =>
				$page.url.searchParams.get('status')
					? item.status === $page.url.searchParams.get('status')
					: true
			);
		}
	});

	console.log({ filteredData });

	async function getData(): Promise<void> {
		try {
			loading = true;
			const res = await getLandPads();
			if (res.status === 200) {
				data = res.data;
			} else {
				throw new Error(res.statusText);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			data = null;
		} finally {
			loading = false;
		}
	}

	console.log($state.snapshot(data));
</script>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-12 lg:col-span-9">
		<div class="mb-4 flex items-center justify-between gap-1">
			<ViewSwitcher />
			<FilterByStatus />
		</div>

		{#if loading}
			<div class="space-y-4">
				<div class="h-6 animate-pulse rounded bg-gray-200"></div>
				<div class="h-6 animate-pulse rounded bg-gray-200"></div>
				<div class="h-6 animate-pulse rounded bg-gray-200"></div>
			</div>
		{:else if data && data?.length > 0}
			{#if $view === 'table'}
				<TableView data={data as LandPad[]} />
			{:else}
				<GridView data={data as LandPad[]} />
			{/if}
		{:else}
			<div class="py-8 text-center">
				<p class="text-lg text-gray-500">No data found</p>
			</div>
		{/if}
	</div>
	<div class="col-span-12 lg:col-span-3">
		<Map />
	</div>
</div>
