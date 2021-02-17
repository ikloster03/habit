<template>
  <div>
    <v-container class="mb-12">
      <habit-list>
        <habit-item
          v-for="habit in habitList.list"
          :key="`habit-${habit.id}`"
          :habit="habit"
          @today-done="markToday"
        />
      </habit-list>
    </v-container>
    <v-btn
      color="#EC407AFF"
      fab
      fixed
      large
      dark
      bottom
      right
      style="z-index: 5;"
      :to="{ name: 'create-habit-screen' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { format } from 'date-fns';
import Habits from '@/components/Habit/HabitList';
import HabitItem from '@/components/Habit/HabitItem';
import HabitList from '@/modules/habit/habit-list';

export default {
  name: 'HomeScreen',
  components: { HabitItem, 'habit-list': Habits },
  data() {
    return {
      habitList: new HabitList(),
    };
  },
  mounted() {
    this.habitList.restore();
    this.habits = this.habitList.list;
  },
  methods: {
    markToday({ id }) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      const habit = this.habitList.restore().getById(id);
      if (!habit) {
        return;
      }

      const dates = habit.dates;
      const dateIndex = dates.indexOf(currentDate);
      if (dateIndex !== -1) {
        dates.splice(dateIndex, 1);
      } else {
        dates.push(currentDate);
      }

      this.habitList.updateById(id, { ...habit, dates }).store();
    },
  },
};
</script>

<style lang="scss" scoped></style>
