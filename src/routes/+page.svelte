<script lang="ts">
	import Map from '@components/sections/Map.svelte';
	import TableView from '@components/sections/TableView.svelte';
</script>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-12 lg:col-span-9">
		<TableView />
	</div>
	<div class="col-span-12 lg:col-span-3">
		<Map />
	</div>
</div>
