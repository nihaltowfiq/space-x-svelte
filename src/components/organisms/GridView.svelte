<script lang="ts">
	import { DetailsModal, Progress, StatusBadge } from '@components/molecules';
	import type { LandPad } from '@libs/types';
	import { successRate } from '@utils/helpers';

	type Props = {
		data: LandPad[];
	};

	const { data }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each data as item}
		<div class="rounded-lg border border-gray-200 bg-white p-4 shadow">
			<h3 class="mb-2 text-lg font-semibold text-gray-800">{item.full_name}</h3>
			<p class="text-sm text-gray-600"><strong>Location Name:</strong> {item.location.name}</p>

			<div class="mt-2 flex items-center justify-between">
				<p class="text-sm text-gray-600"><strong>Region:</strong> {item.location.region}</p>
				<StatusBadge status={item.status} />
			</div>
			<div class="mt-4">
				<Progress value={successRate(item.attempted_landings, item.successful_landings)} />
			</div>
			<div class="mt-4 flex items-center justify-between">
				<a href={item.wikipedia} target="_blank" class="text-sm text-blue-500 hover:underline">
					Wikipedia Link
				</a>
				<DetailsModal title={item.full_name} details={item.details} />
			</div>
		</div>
	{/each}
</div>
