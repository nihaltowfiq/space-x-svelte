<script lang="ts">
	import { page } from '$app/stores';
	import { WikiLink } from '@components/atoms';
	import { Progress, StatusBadge } from '@components/molecules';
	import type { LandPad } from '@libs/types';
	import { successRate } from '@utils/helpers';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	type Props = {
		data: LandPad[];
	};

	const { data }: Props = $props();

	console.log({ page: $page.url });
</script>

<div class="overflow-hidden rounded-lg border font-semibold shadow-sm">
	<Table hoverable>
		<TableHead class="text-xs uppercase text-gray-500">
			<TableHeadCell>FULL NAME</TableHeadCell>
			<TableHeadCell>LOCATION NAME</TableHeadCell>
			<TableHeadCell>REGION</TableHeadCell>
			<TableHeadCell>DETAIL</TableHeadCell>
			<TableHeadCell>SUCCESS RATE</TableHeadCell>
			<TableHeadCell>WIKIPEDIA LINK</TableHeadCell>
			<TableHeadCell>STATUS</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y text-sm">
			{#if data?.length > 0}
				{#each data as item}
					<TableBodyRow>
						<TableBodyCell>{item.full_name}</TableBodyCell>
						<TableBodyCell>{item.locality}</TableBodyCell>
						<TableBodyCell>{item.region}</TableBodyCell>
						<TableBodyCell>
							<button
								color="light"
								class="rounded-md border-none bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
							>
								View Details
							</button>
						</TableBodyCell>
						<TableBodyCell class="text-gray-500">
							<Progress value={successRate(item.landing_attempts, item.landing_successes)} />
						</TableBodyCell>
						<TableBodyCell>
							<WikiLink href={item.wikipedia} />
						</TableBodyCell>
						<TableBodyCell>
							<StatusBadge status={item.status} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
</div>
