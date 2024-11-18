<script lang="ts">
	import { page } from '$app/stores';
	import { FilterByStatus, ViewSwitcher } from '@components/molecules';
	import { DoughnutChart, GridView, Map, TableView } from '@components/organisms';
	import { getLandPads } from '@libs/api';
	import { type LandPad } from '@libs/types';
	import view from '@stores/view';

	let data: LandPad[] | null = $state(null);
	let loading: boolean = $state(true);
	let filteredData: LandPad[] = $state([]);

	$effect(() => {
		async function getData() {
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

		getData();
	});

	$effect(() => {
		function filterData(status: string | null) {
			if (data) {
				filteredData = data.filter((item) => (status ? item.status === status : true));
			}
		}

		const status = $page.url.searchParams.get('status');
		filterData(status);
	});
</script>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-12 lg:col-span-9">
		<div class="mb-4 flex flex-col items-center justify-between gap-1 md:flex-row">
			<ViewSwitcher />

			<FilterByStatus />
		</div>

		{#if loading}
			<div class="space-y-4">
				<div class="h-6 animate-pulse rounded bg-gray-200"></div>
				<div class="h-6 animate-pulse rounded bg-gray-200"></div>
				<div class="h-6 animate-pulse rounded bg-gray-200"></div>
			</div>
		{:else if filteredData && filteredData?.length > 0}
			{#if $view === 'table'}
				<TableView data={filteredData as LandPad[]} />
			{:else}
				<GridView data={filteredData as LandPad[]} />
			{/if}
		{:else}
			<div class="py-8 text-center">
				<p class="text-lg text-gray-500">No data found</p>
			</div>
		{/if}
	</div>
	<div class="spacey-4 col-span-12 lg:col-span-3">
		<Map />

		<DoughnutChart {loading} data={filteredData as LandPad[]} />
	</div>
</div>
