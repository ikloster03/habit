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
        class="pb-4"
        :chart-data="preparedHabitData"
        :options="options"
      ></chart-line>
      <div>
        <v-date-picker
          v-model="dates"
          :max="today"
          :first-day-of-week="1"
          :locale="$i18n.locale"
          multiple
          no-title
          full-width
        ></v-date-picker>
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
import HabitList from '@/modules/habit/habit-list';

export default {
  name: 'HabitScreen',
  components: { ChartLine },
  data() {
    return {
      id: null,
      habit: null,
      habitList: new HabitList(),
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
                labelString: this.$t('chart.date'),
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
                labelString: this.$t('chart.score'),
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    today() {
      return format(new Date(), 'yyyy-MM-dd');
    },
  },
  watch: {
    dates: {
      handler(val) {
        const habit = this.habitList.restore().getById(this.id);

        if (habit) {
          this.habitList.updateById(this.id, { ...habit, dates: val });
          this.habitList.store();
          this.updateChartData();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.habit = this.habitList.restore().getById(this.id);
    this.dates = this.habit.dates;
    this.updateChartData();
  },
  methods: {
    resetProgress() {
      const habit = this.habitList.restore().getById(this.id);

      if (habit) {
        this.habitList.updateById(this.id, { ...habit, dates: [] });
        this.habitList.store();
        this.updateChartData();
        this.$router.push({ name: 'home-screen' });
      }
    },
    deleteHabit() {
      this.habitList
        .restore()
        .remove(this.id)
        .store();
      this.updateChartData();
      this.$router.push({ name: 'home-screen' });
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
            label: this.$t('chart.label'),
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
