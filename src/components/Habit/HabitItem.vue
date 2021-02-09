<template>
  <v-list-item class="pb-4">
    <v-card
      :color="habit.color"
      dark
      width="100%"
      :to="{ name: 'habit-screen', params: { id: habit.id } }"
    >
      <v-row no-gutters>
        <v-col :cols="8" align-self="center">
          <v-card-title class="">
            {{ habit.title }}
          </v-card-title>
        </v-col>
        <v-col :cols="4" align-self="center">
          <v-card-subtitle class="text-right"> {{ percent }}% </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="8" align-self="center">
          <v-sheet color="rgba(0, 0, 0, 0)">
            <v-sparkline
              :value="scores"
              color="rgba(255, 255, 255, .7)"
              height="50"
              stroke-linecap="round"
              smooth
            >
            </v-sparkline>
          </v-sheet>
        </v-col>
        <v-col :cols="4" align-self="center">
          <v-card-actions class="d-flex justify-end">
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click.prevent="toggleCurrentDay"
            >
              <v-icon v-if="done" dark>
                mdi-check-bold
              </v-icon>
              <v-icon v-else dark>
                mdi-check-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-list-item>
</template>

<script>
import { compareDesc, isEqual, parseISO, format } from 'date-fns';
import getHabitDateScoreMap from '@/helpers/habit';

export default {
  name: 'HabitItem',
  props: {
    habit: {
      type: Object,
      default: () => ({
        id: 0,
        title: '',
        description: '',
        color: '#385F73',
        dates: [],
        percent: 0,
      }),
    },
  },
  data() {
    return {
      scores: [],
      percent: 0,
      done: false,
    };
  },
  mounted() {
    const parsedDates = this.habit.dates.map(date => parseISO(date));
    const sortedDates = parsedDates.sort(compareDesc);
    const current = parseISO(format(new Date(), 'yyyy-MM-dd'));
    this.done = isEqual(current, sortedDates[0]);
    const scores = getHabitDateScoreMap(this.habit.dates);
    this.scores = scores.map(s => s.score);
    this.percent = scores[scores.length - 1].score;
  },
  methods: {
    toggleCurrentDay() {
      this.done = !this.done;
    },
  },
};
</script>

<style lang="scss" scoped></style>
