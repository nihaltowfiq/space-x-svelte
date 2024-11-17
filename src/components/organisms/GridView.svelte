<script lang="ts">
	import { Badge } from '@components/atoms';
	import type { dummy_table_data } from '@libs/data';

	type Props = {
		data: typeof dummy_table_data;
	};

	const { data }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each data as item}
		<div class="rounded-lg border border-gray-200 bg-white p-4 shadow">
			<h3 class="mb-2 text-lg font-semibold text-gray-800">{item.fullName}</h3>
			<p class="text-sm text-gray-600"><strong>Location Name:</strong> {item.locationName}</p>
			<p class="text-sm text-gray-600"><strong>Region:</strong> {item.region}</p>
			<div class="mt-2">
				<Badge color="blue">
					{item.status}
				</Badge>
			</div>
			<div class="mt-4">
				<strong class="text-sm text-gray-700">Success Rate:</strong>
				{#if item.successRate !== null}
					<div class="relative mt-2 h-2 w-full rounded bg-gray-200">
						<div
							class="absolute left-0 top-0 h-2 rounded bg-green-500"
							style="width: {item.successRate}%"
						></div>
					</div>
					<p class="mt-1 text-xs text-gray-500">{item.successRate}%</p>
				{:else}
					<p class="text-sm text-gray-400">N/A</p>
				{/if}
			</div>
			<div class="mt-4 flex items-center justify-between">
				<a href={item.wikipediaLink} target="_blank" class="text-sm text-blue-500 hover:underline">
					Wikipedia Link
				</a>
				<button
					class="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
				>
					{item.details}
				</button>
			</div>
		</div>
	{/each}
</div>
