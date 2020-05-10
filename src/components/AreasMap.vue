<template>
  <yandex-map
    class="map"
    map-type="hybrid"
    :controls="['zoomControl']"
    :zoom="zoom"
    :coords="coords"
    :bounds.sync="areasPaddedBounding"
    @click="onClick"
  >
    <ymap-marker
      v-for="(area, i) in normalizedAreas"
      :key="i"
      marker-type="Polygon"
      :coords="area.coords"
      :marker-fill="area.markerFill"
      :marker-stroke="area.markerStroke"
      :marker-id="i"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
import { fetchAreas } from '@/api/index.js';
import { flatMap, map, zipAll, min, max, isEmpty } from 'lodash/fp';

const mapCoords = map(({ lat, lng }) => [Number(lat), Number(lng)]);

const MAP_PADDING = 0.005;

const getAreasCorners = coords => {
  console.log(coords);

  const [lats, longs] = zipAll(...coords);
  console.log(lats, longs, zipAll(...coords));
  return {
    minLat: min(lats),
    maxLat: max(lats),
    minLon: min(longs),
    maxLon: max(longs)
  };
};

export default {
  name: 'AreasMap',

  data() {
    return {
      coords: [55.869678, 37.530379],
      zoom: 3,
      areas: [],
      colors: {
        red: '#ff3860',
        green: '#48c774'
      }
    };
  },

  computed: {
    normalizedAreas() {
      return this.areas.map(({ coordinates, type }) => {
        const coords = coordinates ? [mapCoords(coordinates), []] : [[], []];

        const markerStroke = {
          color: this.colors[type],
          width: 5,
          opacity: 0.7
        };

        const markerFill = {
          enabled: true,
          color: this.colors[type],
          opacity: 0.5
        };

        return {
          coords,
          markerStroke,
          markerFill
        };
      });
    },
    areasPaddedBounding: {
      get() {
        if (isEmpty(this.areas)) return null;
        const coords = flatMap(area => mapCoords(area.coordinates), this.areas);

        const { minLat, maxLat, minLon, maxLon } = getAreasCorners(coords);

        return [
          [minLat - MAP_PADDING, minLon - MAP_PADDING],
          [maxLat + MAP_PADDING, maxLon + MAP_PADDING]
        ];
      },
      set(val) {
        console.log(val);
      }
    }
  },

  async mounted() {
    this.areas = await fetchAreas();
  },

  methods: {
    onClick(e) {
      console.log(e.get('coords'));
    }
  }
};
</script>

<style scoped>
.map {
  height: 30vh;
}
</style>
