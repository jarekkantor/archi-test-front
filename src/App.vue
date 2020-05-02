<template>
  <div id="#app" class="d-flex justify-content-center">
    <Sidebar
      :data="mapData"
    />
    <Map
      :data="mapData"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="mapCenter"
      :zoom="mapZoom"
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
        151.20819200,
        -33.86626170,
      ],
      mapZoom: 12,
      mapData: data,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
