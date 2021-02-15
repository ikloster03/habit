<template>
  <v-bottom-navigation v-model="value" :background-color="color" fixed dark shift>
    <v-btn exact :to="{ name: 'home-screen' }">
      <span>{{ $t('menu.home') }}</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'settings-screen' }">
      <span>{{ $t('menu.settings') }}</span>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomMenu',
  data: () => ({ value: 0 }),

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
  },
};
</script>

<style scoped></style>
