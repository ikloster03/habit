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
  created() {
    const locale = localStorage.getItem('locale');

    if (locale) {
      this.$i18n.locale = locale;
    } else {
      localStorage.setItem('locale', this.$i18n.locale);
    }
  },
};
</script>
