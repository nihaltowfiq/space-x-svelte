<script lang="ts">
	import view from '@stores/view';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { GridSolid, ListOutline } from 'flowbite-svelte-icons';
</script>

<ButtonGroup>
	<Button
		color="alternative"
		onclick={() => view.set('table')}
		class={`py-[0.45rem] ${$view === 'table' && 'bg-gray-100 text-blue-600'}`}
	>
		<ListOutline class="h-5 w-5" />
	</Button>
	<Button
		color="alternative"
		onclick={() => view.set('grid')}
		class={`py-[0.45rem] ${$view === 'grid' && 'bg-gray-100 text-blue-600'}`}
	>
		<GridSolid class="h-5 w-5" />
	</Button>
</ButtonGroup>
