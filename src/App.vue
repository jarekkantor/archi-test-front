<template>
  <div id="app" class="d-flex justify-content-center">
    <Sidebar
      :data="mapData"
      @results="resultsUpdated"
    />
    <Map
      :data="mapData"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="mapCenter"
      :zoom="mapZoom"
      :markers="mapMarkers"
    />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import data from './assets/data.json';
import { config } from './consts';

export default {
  name: 'App',
  components: {
    Sidebar,
    Map,
  },
  data() {
    return {
      accessToken: config.accessToken,
      mapStyle: config.mapStyle,
      mapCenter: [
        151.210,
        -33.870,
      ],
      mapZoom: 14,
      mapData: data,
      mapMarkers: [],
    };
  },
  // TODO: set mapCenter and mapZoom based on coordinates from data.json
  methods: {
    resultsUpdated(data) {
      this.mapMarkers = data;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
