<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cancel">
          {{ $t('form.cancel') }}
        </v-btn>
        <v-btn color="green darken-1" text @click="submit">
          {{ $t('form.ok') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConsentPopup',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('submit', this.type);
    },
  },
};
</script>

<style scoped></style>
