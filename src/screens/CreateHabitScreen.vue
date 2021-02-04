<template>
  <v-container>
    <div class="d-flex align-center pb-4">
      <v-btn fab color="blue" dark :to="{ name: 'home-screen' }">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="pl-4">Creating habit</h2>
    </div>
    <habit-form @form-data="saveHabit" />
  </v-container>
</template>

<script>
import HabitForm from '@/components/Habit/HabitForm.vue';
export default {
  name: 'CreateHabitScreen',
  components: { HabitForm },
  methods: {
    saveHabit(habit) {
      console.log('habit', habit);
    },
  },
};
</script>

<style lang="scss" scoped></style>
