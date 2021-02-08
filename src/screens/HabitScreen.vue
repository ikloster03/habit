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
import getHabitDateScoreMap from '@/helpers/habit';

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
        title: {
          display: true,
          text: 'Chart.js Time Point Data',
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: { day: 'MM/YY' },
                tooltipFormat: 'DD-MM-YY',
                unit: 'month',
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
              ticks: {
                major: {
                  fontStyle: 'bold',
                  fontColor: '#FF0000',
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Score',
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    const stringifiedHabits = localStorage.getItem('habits');

    if (stringifiedHabits) {
      this.habits = JSON.parse(stringifiedHabits);
      this.habit = this.habits.find(h => h.id === this.id);
      this.dates = this.habit.dates;
      const scores = getHabitDateScoreMap(this.habit.dates);
      this.preparedHabitData = {
        datasets: [
          {
            label: 'Habit Score',
            fill: false,
            backgroundColor: this.habit.color,
            borderColor: this.habit.color,
            data: scores.map(s => ({
              x: s.date,
              y: s.score,
            })),
          },
        ],
      };
    }
  },
  watch: {
    dates: {
      handler(val) {
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
