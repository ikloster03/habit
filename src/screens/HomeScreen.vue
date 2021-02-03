<template>
  <v-container>
    <habit-list>
      <habit-item v-for="habit in habits" :key="`habit-${habit.id}`" :habit="habit" />
    </habit-list>
  </v-container>
</template>

<script>
import HabitList from '@/components/Habit/HabitList';
import HabitItem from '@/components/Habit/HabitItem';
export default {
  name: 'HomeScreen',
  components: { HabitItem, HabitList },
  data() {
    return {
      habits: [
        {
          id: 1,
          title: 'Workout',
          description: 'Workout description',
          color: '#385F73',
          points: [],
          percent: 3,
        },
        {
          id: 2,
          title: 'Meditation',
          description: 'Meditation description',
          color: '#1F7087',
          points: [],
          percent: 100,
        },
        {
          id: 3,
          title: 'Teeth cleaning',
          description: 'Teeth cleaning description',
          color: '#952175',
          points: [],
          percent: 78,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
