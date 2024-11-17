<script>
	import view from '@stores/view';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { GridSolid, ListOutline } from 'flowbite-svelte-icons';
</script>

<ButtonGroup>
	<Button onclick={() => view.set('table')}>
		<ListOutline class={`${$view === 'table' && 'text-blue-600'}`} />
	</Button>
	<Button onclick={() => view.set('grid')}>
		<GridSolid class={`${$view === 'grid' && 'text-blue-600'}`} />
	</Button>
</ButtonGroup>
