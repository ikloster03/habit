<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <bottom-menu></bottom-menu>
  </v-app>
</template>

<script>
import BottomMenu from '@/components/Layout/BottomMenu.vue';
export default {
  name: 'App',

  components: { BottomMenu },

  data: () => ({
    //
  }),
};
</script>
