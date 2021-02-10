<template>
  <div>
    <v-container>
      <habit-list>
        <habit-item
          v-for="habit in habits"
          :key="`habit-${habit.id}`"
          :habit="habit"
          @today-done="markToday"
        />
      </habit-list>
    </v-container>
    <v-btn
      color="purple"
      fab
      absolute
      large
      dark
      bottom
      right
      :to="{ name: 'create-habit-screen' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { format } from 'date-fns';
import HabitList from '@/components/Habit/HabitList';
import HabitItem from '@/components/Habit/HabitItem';

export default {
  name: 'HomeScreen',
  components: { HabitItem, HabitList },
  data() {
    return {
      habits: [],
    };
  },
  mounted() {
    const habits = localStorage.getItem('habits');

    if (habits) {
      this.habits = JSON.parse(habits);
    } else {
      this.habits = [];
      localStorage.setItem('habits', JSON.stringify([]));
    }
  },
  methods: {
    markToday({ id }) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');

      const strHabits = localStorage.getItem('habits');
      this.habits = JSON.parse(strHabits);

      const habitIndex = this.habits.findIndex(h => h.id === id);
      const dates = this.habits[habitIndex].dates;
      const dateIndex = dates.indexOf(currentDate);

      if (dateIndex !== -1) {
        dates.splice(dateIndex, 1);
      } else {
        dates.push(currentDate);
      }

      this.$set(this.habits, habitIndex, { ...this.habits[habitIndex], dates });

      localStorage.setItem('habits', JSON.stringify(this.habits));
    },
  },
};
</script>

<style lang="scss" scoped></style>
