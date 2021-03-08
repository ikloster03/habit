<template>
  <v-bottom-navigation
    v-model="value"
    :background-color="color"
    :height="isMobSafari ? mobSafariHeight : baseHeight"
    fixed
    dark
    shift
  >
    <div>
      <div class="d-flex" :style="{ height: `${baseHeight}px` }">
        <v-btn exact :to="{ name: 'home-screen' }">
          <span>{{ $t('menu.home') }}</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'settings-screen' }">
          <span>{{ $t('menu.settings') }}</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>
      <div v-if="isMobSafari" :style="{ height: `${mobSafariHeightEmptyBlock}px` }"></div>
    </div>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomMenu',
  data: () => ({
    value: 0,
    windowWidth: 0,
    baseHeight: 56,
    mobSafariHeight: 70,
  }),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return '#546E7AFF';
        case 1:
          return '#90A4AEFF';
        default:
          return '#546E7AFF';
      }
    },
    mobSafariHeightEmptyBlock() {
      return this.mobSafariHeight - this.baseHeight;
    },
    isSafari() {
      return /iPhone|iPad|iPod|/i.test(navigator.userAgent);
    },
    isMobSafari() {
      return this.isSafari && this.windowWidth < 900 && this.windowWidth > 0;
    },
  },
  created() {
    window.addEventListener('resize', this.windowResize);
  },
  mounted() {
    this.windowResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResize);
  },
  methods: {
    windowResize() {
      this.windowWidth = document.documentElement.clientWidth;
    },
  },
};
</script>

<style scoped></style>
