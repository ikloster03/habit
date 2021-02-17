<template>
  <v-container v-if="habit">
    <div class="d-flex align-center pb-4">
      <v-btn
        fab
        color="#42A5F5FF"
        dark
        :to="{ name: 'habit-screen', params: { id: habit.id } }"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div class="pa-4">
        <h3>{{ $t('form.editing-habit') }}:</h3>
        <h5 class="text-subtitle-1">{{ habit.title }}</h5>
      </div>
    </div>
    <habit-form :habit="habit" @form-data="updateHabit" />
  </v-container>
</template>

<script>
import HabitForm from '@/components/Habit/HabitForm.vue';
import HabitList from '@/modules/habit/habit-list';

export default {
  name: 'EditHabitScreen',
  components: { HabitForm },
  data() {
    return {
      id: null,
      habit: null,
      habitList: new HabitList(),
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.habit = this.habitList.restore().getById(this.id);
  },
  methods: {
    updateHabit(updatedHabit) {
      this.habitList.updateById(this.id, updatedHabit).store();
      this.$router.push({ name: 'home-screen' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
