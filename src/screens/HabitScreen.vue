<template>
  <v-container v-if="habit" class="mb-12">
    <div class="d-flex align-center justify-space-between pb-4">
      <v-btn fab color="#42A5F5FF" dark :to="{ name: 'home-screen' }">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="pa-4">{{ habit.title }}</h2>
      <v-btn
        fab
        color="#5C6BC0FF"
        dark
        :to="{ name: 'edit-habit-screen', params: { id: habit.id } }"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
    <div class="pa-4">
      <div>
        <span class="text-subtitle-1"> {{ $t('habit.progress') }}: </span>
        <span class="font-weight-bold"> {{ percent }} % </span>
      </div>
      <div>
        <span class="text-subtitle-1"> {{ $t('habit.description') }}: </span>
        <span>{{ habit.description }}</span>
      </div>
    </div>
    <div class="d-flex flex-column justify-center align-center">
      <chart-line
        style="width: 100%"
        :chart-data="preparedHabitData"
        :options="options"
      ></chart-line>
      <div>
        <v-date-picker v-model="dates" :max="today" multiple full-width></v-date-picker>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="d-flex flex-column justify-center align-center">
      <div>
        <v-btn color="orange" class="ma-4" dark @click="resetProgress">
          {{ $t('form.reset') }}
        </v-btn>
      </div>
      <div>
        <v-btn color="red" class="ma-4" dark @click="deleteHabit">
          {{ $t('form.delete') }}
        </v-btn>
      </div>
    </div>
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
      percent: 0,
      preparedHabitData: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
    this.habits = this.getHabits();
    this.id = this.$route.params.id;
    this.habit = this.getHabit(this.habits);
    this.dates = this.habit.dates;
    this.updateChartData();
  },
  watch: {
    dates: {
      handler(val) {
        let habitIndex = this.habits.findIndex(h => h.id === this.id);

        if (habitIndex !== -1) {
          this.habits[habitIndex].dates = val;
          localStorage.setItem('habits', JSON.stringify(this.habits));
          this.updateChartData();
        }
      },
      deep: true,
    },
  },
  methods: {
    resetProgress() {
      let habitIndex = this.habits.findIndex(h => h.id === this.id);

      if (habitIndex !== -1) {
        this.$set(this.habits, habitIndex, { ...this.habits[habitIndex], dates: [] });
        localStorage.setItem('habits', JSON.stringify(this.habits));
        this.updateChartData();
        this.$router.push({ name: 'home-screen' });
      }
    },
    deleteHabit() {
      let habitIndex = this.habits.findIndex(h => h.id === this.id);

      if (habitIndex !== -1) {
        this.habits.splice(habitIndex, 1);
        localStorage.setItem('habits', JSON.stringify(this.habits));
        this.updateChartData();
        this.$router.push({ name: 'home-screen' });
      }
    },
    getHabits() {
      const stringifiedHabits = localStorage.getItem('habits');

      if (stringifiedHabits) {
        return JSON.parse(stringifiedHabits);
      }

      return [];
    },
    getHabit(habits) {
      if (this.id && habits && habits.length > 0) {
        return habits.find(h => h.id === this.id);
      }

      return null;
    },
    updateChartData() {
      const scores = getHabitDateScoreMap(this.dates);

      if (scores.length > 0) {
        const preparedScores = scores.map(s => s.score);
        this.percent = preparedScores[preparedScores.length - 1];
      }

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
    },
  },
};
</script>

<style lang="scss" scoped></style>
