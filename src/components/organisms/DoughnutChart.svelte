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
		series: [],
		labels: [],
		colors: ['#E74694', '#1A56DB', '#16BDCA', '#FDBA8C', '#9B1C1C', '#03543F'],
		chart: {
			height: 300,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: [],
			lineCap: 'round'
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						total: {
							showAlways: true,
							show: true,
							label: 'Landing Pads',
							fontFamily: 'Inter, sans-serif',
							formatter: function () {
								return String(data.length);
							}
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20
						},
						name: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: 20
						},
						size: '100%'
					}
				}
			}
		},
		grid: {
			padding: {
				top: -2
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
				formatter: function (value: string) {
					return value + '%';
				}
			}
		},
		xaxis: {
			labels: {
				show: false,
				formatter: function (value: string) {
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
		options.series = res as never[];
		options.labels = lebs as never[];

		if (res.length > 1) {
			options.stroke.colors = ['transparent'] as never[];
		} else {
			options.stroke.colors = ['#f2f2f2'] as never[];
		}
	});
</script>

<div class="mt-4 rounded-lg border p-4 shadow-sm">
	<div class="py-3">
		<p class="text-semibold">Success Rate Chart</p>
	</div>

	{#if loading}
		<div class="py-6 text-center">
			<Spinner color="blue" />
		</div>
	{:else}
		<Chart options={options as any} class="py-6" />
	{/if}
</div>
