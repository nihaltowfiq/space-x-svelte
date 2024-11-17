<script lang="ts">
	import { page } from '$app/stores';
	import { Badge, WikiLink } from '@components/atoms';
	import { Progress } from '@components/molecules';
	import type { dummy_table_data } from '@libs/data';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	const { data }: Props = $props();

	type Props = {
		data: typeof dummy_table_data;
	};

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
			{#each data as item}
				<TableBodyRow>
					<TableBodyCell>{item.fullName}</TableBodyCell>
					<TableBodyCell>{item.locationName}</TableBodyCell>
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
						<Progress value={item.successRate} />
					</TableBodyCell>
					<TableBodyCell>
						<WikiLink href={item.wikipediaLink} />
					</TableBodyCell>
					<TableBodyCell>
						<Badge color="blue">
							{item.status}
						</Badge>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
