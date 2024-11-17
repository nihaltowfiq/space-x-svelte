<script>
	import { ViewSwitcher } from '@components/molecules';
	import { GridView, Map, TableView } from '@components/organisms';
	import { dummy_table_data } from '@libs/data';
	import view from '@stores/view';
</script>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-12 lg:col-span-9">
		<div class="mb-4 flex items-center justify-between gap-3">
			<ViewSwitcher />
		</div>

		{#if $view === 'table'}
			<TableView data={dummy_table_data} />
		{:else}
			<GridView data={dummy_table_data} />
		{/if}
	</div>
	<div class="col-span-12 lg:col-span-3">
		<Map />
	</div>
</div>
