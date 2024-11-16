<script lang="ts">
	import Badge from '@components/atoms/Badge.svelte';
	import { dummy_table_data } from '@libs/data';
	import {
		Progressbar,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';
	import { sineOut } from 'svelte/easing';
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
			{#each dummy_table_data as data}
				<TableBodyRow>
					<TableBodyCell>{data.fullName}</TableBodyCell>
					<TableBodyCell>{data.locationName}</TableBodyCell>
					<TableBodyCell>{data.region}</TableBodyCell>
					<TableBodyCell>
						<button
							color="light"
							class="rounded-md border-none bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
						>
							View Details
						</button>
					</TableBodyCell>
					<TableBodyCell class="text-gray-500">
						{#if data?.successRate}
							<div>
								<Progressbar
									animate
									precision={2}
									tweenDuration={1500}
									easing={sineOut}
									labelInside={false}
									progress={data.successRate}
									progressClass="bg-green-400"
								/>
								<p class="text-sm font-normal leading-4">{data.successRate}%</p>
							</div>
						{:else}
							"N/A"
						{/if}
					</TableBodyCell>
					<TableBodyCell>
						<a href={data.wikipediaLink} class="text-blue-600">
							<LinkOutline />
						</a>
					</TableBodyCell>
					<TableBodyCell>
						<Badge color="blue">
							{data.status}
						</Badge>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
