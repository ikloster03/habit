<template>
  <v-bottom-navigation v-model="value" :background-color="color" dark shift>
    <v-btn :to="{ name: 'home-screen' }">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'settings-screen' }">
      <span>Settings</span>
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
          return 'brown';
        case 1:
          return 'blue-grey';
        default:
          return 'blue-grey';
      }
    },
  },
};
</script>

<style scoped></style>
