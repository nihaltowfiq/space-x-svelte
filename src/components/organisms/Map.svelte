<script lang="ts">
	import type { LandPad } from '@libs/types';
	import { Feature, Map, View } from 'ol';
	import { Point } from 'ol/geom';
	import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
	import 'ol/ol.css';
	import { fromLonLat } from 'ol/proj';
	import { OSM, Vector as VectorSource } from 'ol/source';
	import { Icon, Style } from 'ol/style';

	type Props = {
		data: LandPad[];
		loading: boolean;
	};

	const { data }: Props = $props();

	let map: any;
	let vectorLayer: any;

	$effect(() => {
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: fromLonLat([-80.544444, 28.485833]), // Center on the first location as default
				zoom: 6
			})
		});

		vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: createFeatures(data)
			})
		});

		map.addLayer(vectorLayer);
	});

	function createFeatures(zones: LandPad[]) {
		return zones.map((zone: any) => {
			const feature = new Feature({
				geometry: new Point(fromLonLat([zone.location.longitude, zone.location.latitude]))
			});
			feature.setStyle(
				new Style({
					image: new Icon({
						color: '#00FF00',
						crossOrigin: 'anonymous',
						src: 'https://openlayers.org/en/latest/examples/data/dot.png',
						scale: 1.5
					})
				})
			);
			return feature;
		});
	}

	$effect(() => {
		if (vectorLayer) {
			const source = vectorLayer.getSource();
			source.clear(); // Clear previous features
			source.addFeatures(createFeatures(data)); // Add updated features
		}
	});
</script>

<div class="mb-4 overflow-hidden rounded-lg border shadow-sm">
	<div class="px-4 py-3">
		<p class="text-semibold">Map View</p>
	</div>

	<div class="relative h-[300px] w-full">
		<div id="map" class="h-96 w-full rounded-lg"></div>
	</div>
</div>

<style>
	#map {
		width: 100%;
		height: 100%;
	}
</style>
