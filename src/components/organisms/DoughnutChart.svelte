<script lang="ts">
	import type { LandPad } from '@libs/types';
	import { successRate } from '@utils/helpers';
	import { Chart, Spinner } from 'flowbite-svelte';

	type Props = {
		data: LandPad[];
		loading: boolean;
	};

	const { data, loading }: Props = $props();

	let options = $state({
		labels: [],
		series: [],
		colors: ['#E74694', '#1A56DB', '#16BDCA', '#FDBA8C', '#9B1C1C', '#03543F'],
		chart: {
			height: 300,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: ['#f2f2f2'],
			lineCap: 'butt'
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							offsetY: 20
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Landing Pads',
							fontSize: '16',
							fontWeight: 400,
							color: '#6B7280',
							fontFamily: 'Inter, sans-serif',
							formatter: function () {
								return String(data.length);
							}
						},
						value: {
							show: true,
							offsetY: -20,
							fontWeight: 700
						}
					},
					size: '80%'
				}
			}
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		yaxis: {
			labels: {
				show: false,
				formatter: function (value: number) {
					return value + '%';
				}
			}
		},
		xaxis: {
			labels: {
				show: false,
				formatter: function (value: number) {
					return value + '%';
				}
			},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		}
	});

	$effect(() => {
		let res = [];
		let lebs = [];

		for (let i = 0; i < data.length; i++) {
			const element = data[i];
			const rate = successRate(element.attempted_landings, element.successful_landings);
			lebs.push(element.full_name);
			res.push(typeof parseInt(rate) === 'number' ? parseInt(rate) : 0);
		}
		options.series = res as any;
		options.labels = lebs as any;

		if (options.stroke) {
			if (res.length > 1) {
				options.stroke.colors = ['transparent'];
			} else {
				options.stroke.colors = ['#f2f2f2'];
			}
		}
	});
</script>

<div class="mt-4 rounded-lg border p-4 shadow-sm">
	<div class="pb-0">
		<p class="text-semibold">Success Rate Chart</p>
	</div>

	{#if loading}
		<div class="flex h-[300px] items-center justify-center py-6 text-center">
			<Spinner color="blue" />
		</div>
	{:else}
		<Chart options={options as any} class="py-6" />
	{/if}
</div>
