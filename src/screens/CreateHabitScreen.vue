<template>
  <v-container>
    <div class="d-flex align-center pb-4">
      <v-btn fab color="#42A5F5FF" dark :to="{ name: 'home-screen' }">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="pl-4">{{ $t('form.creating-habit') }}</h2>
    </div>
    <habit-form @form-data="saveHabit" />
  </v-container>
</template>

<script>
import HabitForm from '@/components/Habit/HabitForm.vue';
import HabitList from '@/modules/habit/habit-list';
import Habit from '@/modules/habit/habit';

export default {
  name: 'CreateHabitScreen',
  components: { HabitForm },
  methods: {
    saveHabit(formData) {
      const habitList = new HabitList();
      const habit = new Habit({
        ...formData,
        dates: [],
      });
      habitList
        .restore()
        .add(habit.getObject())
        .store();

      this.$router.push({ name: 'home-screen' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
