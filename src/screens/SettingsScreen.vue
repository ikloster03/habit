<template>
  <div>
    <v-btn color="blue" @click="exportHabits">Export habits</v-btn>
    <br />
    <input type="file" @change="handleFiles" />
    <v-btn color="orange" @click="importHabits">Import habits</v-btn>
  </div>
</template>

<script>
import { downloadFile, readFile } from '@/helpers/file';

export default {
  name: 'SettingsScreen',
  data() {
    return {
      file: null,
    };
  },
  methods: {
    exportHabits() {
      const stringifiedHabits = localStorage.getItem('habits');
      if (stringifiedHabits) {
        const fileName = 'habits-backup';
        const fileType = 'json';
        downloadFile({ data: stringifiedHabits, fileName, fileType });
      }
    },
    handleFiles(event) {
      this.file = event.target.files[0];
    },
    async importHabits() {
      if (this.file) {
        const habits = await readFile(this.file);
        localStorage.setItem('habits', String(habits));
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
