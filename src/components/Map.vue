<template>
  <div id="map">
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :attributionControl="false"
      :center="center"
      :zoom="zoom"
    >
<!--      <MglGeolocateControl position="bottom-right" />-->
      <MglScaleControl position="bottom-right" />
      <MglNavigationControl position="bottom-right" />

      <div v-if="markers">
      <MglMarker
        v-for="(marker, index) in markers"
        :key="index"
        :coordinates="[ marker.Long, marker.Lat ]"
        anchor="top"
      >
        <MglPopup>
          <div>
            <div><b>{{ marker.Title }} </b></div>
            <div>{{ marker['Address'] }}</div>
            <div>{{ marker['Suburb'] }}</div>

            <div><b>Commence Date:</b> {{ marker['Commence Date'] }} </div>
            <div><b>Completion Date:</b> {{ marker['Completion Date'] }} </div>
            <div><b>Value:</b> {{ formatCurrency(marker['Value']) }} </div>
          </div>
        </MglPopup>
      </MglMarker>
      </div>
    </MglMap>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import {
  // MglGeolocateControl,
  MglMap,
  MglMarker,
  MglNavigationControl,
  MglScaleControl,
  MglPopup,
} from 'vue-mapbox';

export default {
  name: 'Map',
  props: [
    'data',
    'accessToken',
    'mapStyle',
    'center',
    'zoom',
    'markers',
  ],
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    // MglGeolocateControl,
    MglScaleControl,
    MglPopup,
  },
  data() {
    return {
      map: null,
      formatter: new Intl.NumberFormat('en-US', {
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    };
  },
  created() {
    this.map = Mapbox;
  },
  methods: {
    formatCurrency(value) {
      return '$' + this.formatter.format(value);
    },
  },
};
</script>

<style>
#map {
  height: 650px;
  max-height: 100%;
  width: 850px;
  max-width: 100%;

  margin: 15px;
  margin-left: 0;

  border: 1px solid #eee;
  border-left: none;
}
</style>
