<template>
  <v-container v-if="habit">
    <div class="d-flex align-center pb-4">
      <v-btn
        fab
        color="blue"
        dark
        :to="{ name: 'habit-screen', params: { id: habit.id } }"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="pl-4">{{ $t('form.editing-habit') }}: {{ habit.title }}</h2>
    </div>
    <habit-form :habit="habit" @form-data="updateHabit" />
  </v-container>
</template>

<script>
import HabitForm from '@/components/Habit/HabitForm.vue';

export default {
  name: 'EditHabitScreen',
  components: { HabitForm },
  data() {
    return {
      id: null,
      habit: null,
      habits: [],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    const stringifiedHabits = localStorage.getItem('habits');
    if (stringifiedHabits) {
      this.habits = JSON.parse(stringifiedHabits);
      this.habit = this.habits.find(h => h.id === this.id);
    }
  },
  methods: {
    updateHabit(updatedHabit) {
      let habitIndex = this.habits.findIndex(h => h.id === this.id);

      if (habitIndex !== -1) {
        this.habits[habitIndex] = { ...updatedHabit };
        localStorage.setItem('habits', JSON.stringify(this.habits));
      }

      this.$router.push({ name: 'home-screen' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
