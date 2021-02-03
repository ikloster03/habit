<template>
  <v-list-item class="pb-4">
    <v-card
      :color="habit.color"
      dark
      width="100%"
      :to="{ name: 'habit-screen', params: { id: habit.id } }"
    >
      <v-container>
        <v-row no-gutters>
          <v-col :cols="8" align-self="center">
            <v-card-title class="">
              {{ habit.title }}
            </v-card-title>
          </v-col>
          <v-col :cols="4" align-self="center">
            <v-card-subtitle class="text-right"> {{ habit.percent }}% </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-list-item>
</template>

<script>
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
        points: [],
        percent: 0,
      }),
    },
  },
};
</script>

<style lang="scss" scoped></style>
