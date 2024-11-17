<script lang="ts">
	import { Badge } from '@components/atoms';
	import type { Status } from '@libs/types';

	const { status }: { status: Status } = $props();

	const statusMapper: Record<string, 'green' | 'red' | 'blue'> = {
		active: 'green',
		'under construction': 'blue',
		retired: 'red'
	};
</script>

<Badge color={statusMapper[status]}>
	{status}
</Badge>
