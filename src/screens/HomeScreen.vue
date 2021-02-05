<template>
  <div>
    <v-container>
      <habit-list>
        <habit-item v-for="habit in habits" :key="`habit-${habit.id}`" :habit="habit" />
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
};
</script>

<style lang="scss" scoped></style>
