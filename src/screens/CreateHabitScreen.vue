<template>
  <v-container>
    <div class="d-flex align-center pb-4">
      <v-btn fab color="blue" dark :to="{ name: 'home-screen' }">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="pl-4">{{ $t('form.creating-habit') }}</h2>
    </div>
    <habit-form @form-data="saveHabit" />
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import HabitForm from '@/components/Habit/HabitForm.vue';

export default {
  name: 'CreateHabitScreen',
  components: { HabitForm },
  methods: {
    saveHabit(habit) {
      const stringifiedHabits = localStorage.getItem('habits');
      const habits = stringifiedHabits ? JSON.parse(stringifiedHabits) : [];

      habits.push({
        ...habit,
        id: uuidv4(),
        dates: [],
        percent: 0,
      });

      localStorage.setItem('habits', JSON.stringify(habits));

      this.$router.push({ name: 'home-screen' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
