<template>
  <div id="map">
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :attributionControl="false"
      :center="center"
      :zoom="zoom"
    >
      <MglAttributionControl />
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglScaleControl />
    </MglMap>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import {
  MglAttributionControl,
  MglGeolocateControl,
  MglMap,
  MglNavigationControl,
  MglScaleControl,
} from 'vue-mapbox';

export default {
  name: 'Map',
  props: [
    'data',
    'accessToken',
    'mapStyle',
    'center',
    'zoom',
  ],
  components: {
    MglMap,
    MglAttributionControl,
    MglNavigationControl,
    MglGeolocateControl,
    MglScaleControl,
  },
  data() {
    return {
      map: null,
    };
  },
  created() {
    this.map = Mapbox;

  },
};
</script>

<style>
#map {
  height: 650px;
  max-height: 100%;
  width: 850px;
  max-width: 100%;
}
</style>
