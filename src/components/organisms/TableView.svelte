<script lang="ts">
	import { WikiLink } from '@components/atoms';
	import { DetailsModal, Progress, StatusBadge } from '@components/molecules';
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
</script>

<div class="overflow-hidden rounded-lg border font-semibold shadow-sm">
	<Table hoverable>
		<TableHead class="text-xs uppercase text-gray-500">
			<TableHeadCell>FULL NAME</TableHeadCell>
			<TableHeadCell class="xl:min-w-[9rem]">LOCATION NAME</TableHeadCell>
			<TableHeadCell>REGION</TableHeadCell>
			<TableHeadCell>DETAIL</TableHeadCell>
			<TableHeadCell class="xl:min-w-[9rem]">SUCCESS RATE</TableHeadCell>
			<TableHeadCell class="xl:min-w-[9rem]">WIKIPEDIA LINK</TableHeadCell>
			<TableHeadCell>STATUS</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y text-sm">
			{#if data?.length > 0}
				{#each data as item}
					<TableBodyRow>
						<TableBodyCell>
							<p class="max-w-[10rem] text-wrap xl:min-w-[8em]">{item.full_name}</p>
						</TableBodyCell>
						<TableBodyCell>
							<p class="max-w-[10.25rem] text-wrap xl:min-w-[8rem]" title={item.location.name}>
								{item.location.name}
							</p>
						</TableBodyCell>
						<TableBodyCell>
							{item.location.region}
						</TableBodyCell>
						<TableBodyCell>
							<DetailsModal title={item.full_name} details={item.details} />
						</TableBodyCell>
						<TableBodyCell class="text-gray-500">
							<Progress value={successRate(item.attempted_landings, item.successful_landings)} />
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
