<template>
  <v-form ref="form" v-model="valid" lazy-validation class="">
    <v-text-field
      v-model="form.title"
      :counter="20"
      :rules="titleRules"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="form.description"
      :counter="120"
      :rules="descriptionRules"
      label="Description"
    ></v-text-field>
    <v-color-picker
      v-model="form.color"
      dot-size="20"
      mode="hexa"
      hide-canvas
      hide-mode-switch
      hide-sliders
      hide-inputs
      show-swatches
      swatches-max-height="250"
      :swatches="swatches"
    ></v-color-picker>
    <div class="d-flex justify-center pa-4">
      <v-btn color="red" dark @click="submit">
        {{ $t('form.ok') }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'HabitForm',
  props: {
    habit: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        color: '',
      }),
    },
  },
  data() {
    return {
      valid: true,
      swatches: [
        ['#0097A7FF'],
        ['#E91E63FF'],
        ['#9C27B0FF'],
        ['#673AB7FF'],
        ['#3F51B5FF'],
      ],
      form: {
        title: '',
        description: '',
        color: '',
      },
      titleRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      descriptionRules: [
        v =>
          (v && v.length >= 0 && v.length <= 120) ||
          'Description must be less than 120 characters',
      ],
    };
  },
  mounted() {
    if (this.habit) {
      this.form = { ...this.habit };
    }
  },
  methods: {
    submit() {
      console.log(this.form);
      this.$emit('form-data', this.form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
