<template>
  <div class="main" :class="{'place-mode': isPlaceModeActive}" @contextmenu.prevent="isPlaceModeActive = false">
    <div>
      <md-button class="md-raised md-primary" @click="isPlaceModeActive = true">Place a cat</md-button>
      <md-button class="md-raised md-accent" @click="clear()">Clear</md-button>
    </div>

    <div class="map">
      <LMap
          :center="center"
          :zoom="zoom"
          @update:center="centerUpdated"
          @update:zoom="zoomUpdated"
          @click="clickMap($event)"
      >
        <LTileLayer
            :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"
            :attribution="'&copy;&nbsp;<a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>&nbsp;contributors'"
        />
        <LMarker v-for="(cat, index) in $store.state.cats.dataList" :key="index" :lat-lng="cat.latLng">
          <LIcon :icon-url="highlightedColorCode === cat.colorCode ? catIconHighlight : getColor(cat.colorCode).icon" :icon-size="[32, 32]" :icon-anchor="[16, 16]"></LIcon>
          <LPopup>
            <p>{{ cat.words }}</p>
          </LPopup>
        </LMarker>
      </LMap>
    </div>

    <div class="highlight-row">
      <div class="md-body-2">Highlight:</div>
      <div class="colors">
        <div v-for="color in COLORS" :key="color.code" :class="['color-cell', {'selected': color.code === highlightedColorCode}]" :style="{'background': color.mono}" @click="toggleColorCell(color.code)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import swal from 'sweetalert';
  import {
    LIcon,
    LMap,
    LMarker,
    LPopup,
    LTileLayer
  } from 'vue2-leaflet';

  import catIconHighlight from '@/assets/pic/cat-highlight.png';
  import { COLORS } from '@/constants/commonConstants.js';
  import {
    ADD_CAT,
    REMOVE_ALL_CATS
  } from '@/constants/mutationTypes.js';

  export default {
    name: 'Main',
    components: {
      LMap: LMap,
      LTileLayer: LTileLayer,
      LMarker: LMarker,
      LIcon: LIcon,
      LPopup: LPopup
    },
    data: function() {
      return {
        COLORS: COLORS,
        catIconHighlight: catIconHighlight,
        center: [40.7590, -73.9844],
        zoom: 12,
        isPlaceModeActive: false,
        highlightedColorCode: null
      };
    },
    created: function() {
      if (this.$route.query.mapParams) {
        const mapParams = JSON.parse(this.$route.query.mapParams);
        this.center = mapParams.center;
        this.zoom = mapParams.zoom;
      }
      this.changeRouteQuery();
    },
    methods: {
      getColor: function(code) {
        return _.find(COLORS, (color) => color.code === code);
      },
      changeRouteQuery: function() {
        this.$router.replace({
          path: this.$route.path,
          query: {
            mapParams: JSON.stringify({
              center: this.center,
              zoom: this.zoom
            })
          }
        }).catch(err => {});
      },
      centerUpdated: function(center) {
        this.center = center;
        this.changeRouteQuery();
      },
      zoomUpdated: function(zoom) {
        this.zoom = zoom;
        this.changeRouteQuery();
      },
      clickMap: function(e) {
        if (this.isPlaceModeActive) {
          this.$router.push({
            path: '/create',
            query: {
              latLng: JSON.stringify(e.latlng)
            }
          });
        }
      },
      clear: function() {
        swal({
          text: 'Are you sure to remove all cats?',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((confirm) => {
            if (confirm) {
              this.$store.commit(REMOVE_ALL_CATS);
            }
          });
      },
      toggleColorCell: function(colorCode) {
        if (colorCode === this.highlightedColorCode) {
          this.highlightedColorCode = null;
        } else {
          this.highlightedColorCode = colorCode;
        }
      }
    }
  };
</script>