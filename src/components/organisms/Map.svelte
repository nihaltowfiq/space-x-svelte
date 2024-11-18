<script lang="ts">
	import type { LandPad } from '@libs/types';
	import { Spinner } from 'flowbite-svelte';
	import { Feature } from 'ol';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import { Point } from 'ol/geom';
	import TileLayer from 'ol/layer/Tile';
	import VectorLayer from 'ol/layer/Vector';
	import 'ol/ol.css';
	import { fromLonLat } from 'ol/proj';
	import OSM from 'ol/source/OSM';
	import VectorSource from 'ol/source/Vector';
	import { Circle, Fill, Style } from 'ol/style';

	type Props = {
		data: LandPad[];
		loading: boolean;
	};

	let { data, loading }: Props = $props();

	let map: Map | null = null;
	let mapLayer: HTMLDivElement;

	$effect(() => {
		initializeMap();

		return () => {
			if (map) {
				map.setTarget(undefined);
				map = null;
			}
		};
	});

	function initializeMap() {
		map = new Map({
			target: mapLayer,
			layers: [
				new TileLayer({
					source: new OSM({
						attributions: []
					})
				})
			],
			view: new View({
				center: fromLonLat([-95.7129, 37.0902]),
				zoom: 0
			}),
			controls: []
		});

		setLocation();
	}

	function setLocation() {
		if (!map || data.length === 0) return;

		const features = data.map((pad) => {
			const feature = new Feature({
				geometry: new Point(fromLonLat([pad.location.longitude, pad.location.latitude])),
				name: pad.full_name,
				status: pad.status
			});

			feature.setStyle(
				new Style({
					image: new Circle({
						radius: 8,
						fill: new Fill({
							color: '#91F652'
						})
					})
				})
			);

			return feature;
		});

		const vectorSource = new VectorSource({ features });
		const vectorLayer = new VectorLayer({ source: vectorSource });
		map.addLayer(vectorLayer);

		const tooltipContainer = document.createElement('div');
		tooltipContainer.className =
			'absolute z-10 bg-white px-4 py-2 rounded-lg shadow-lg pointer-events-none hidden';
		mapLayer.appendChild(tooltipContainer);

		map.on('pointermove', function (e: any) {
			const feature = map?.forEachFeatureAtPixel(e.pixel, (feature: any) => feature);

			if (feature) {
				tooltipContainer.style.display = 'block';
				tooltipContainer.style.left = e.pixel[0] + 10 + 'px';
				tooltipContainer.style.top = e.pixel[1] + 10 + 'px';
				tooltipContainer.innerHTML = `
          <div class="font-medium">${feature.get('name')}</div>
          <div class="text-sm text-muted-foreground capitalize">${feature.get('status')}</div>
        `;
			} else {
				tooltipContainer.style.display = 'none';
			}
		});
	}
</script>

<div class="mb-4 overflow-hidden rounded-lg border shadow-sm">
	<div class="px-4 py-3">
		<p class="text-semibold text-gray-900">Map View</p>
	</div>

	{#if loading}
		<div class="flex h-[300px] items-center justify-center py-6 text-center">
			<Spinner color="blue" />
		</div>
	{:else}
		<div bind:this={mapLayer} class="h-[300px] w-full"></div>
	{/if}
</div>
