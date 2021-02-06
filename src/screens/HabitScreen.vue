<template>
  <v-container v-if="habit">
    <div class="d-flex align-center pb-4">
      <v-btn fab color="blue" dark :to="{ name: 'home-screen' }">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="pl-4">{{ habit.title }}</h2>
      <v-btn
        fab
        color="orange"
        dark
        :to="{ name: 'edit-habit-screen', params: { id: habit.id } }"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
    <chart-line :chart-data="preparedHabitData" :options="options"></chart-line>
    <v-date-picker v-model="dates" :max="today" multiple></v-date-picker>
  </v-container>
</template>

<script>
import { format } from 'date-fns';
import ChartLine from '@/components/Chart/ChartLine';

export default {
  name: 'HabitScreen',
  components: { ChartLine },
  computed: {
    today() {
      return format(new Date(), 'yyyy-MM-dd');
    },
  },
  data() {
    return {
      id: null,
      habit: null,
      habits: [],
      dates: [],
      preparedHabitData: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    const stringifiedHabits = localStorage.getItem('habits');
    console.log(this.id, stringifiedHabits);
    if (stringifiedHabits) {
      this.habits = JSON.parse(stringifiedHabits);
      this.habit = this.habits.find(h => h.id === this.id);
      this.dates = this.habit.dates;
      this.preparedHabitData = {
        labels: [
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
        ],
        datasets: [
          {
            label: 'Data One',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
    }
  },
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  watch: {
    dates: {
      handler(val) {
        console.log('habit.dates', val);
        let habitIndex = this.habits.findIndex(h => h.id === this.id);

        if (habitIndex !== -1) {
          this.habits[habitIndex].dates = val;
          localStorage.setItem('habits', JSON.stringify(this.habits));
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
