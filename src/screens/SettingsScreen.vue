<template>
  <div>
    <v-btn color="blue" @click="exportHabits">Export habits</v-btn>
    <br />
    <!--    <input type="file" @change="handleFiles" />-->
    <vue-dropzone
      ref="dropzone"
      id="drop1"
      :options="dropOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
    <v-btn color="orange" @click="importHabits">Import habits</v-btn>
    <br />
    <v-select
      v-model="$i18n.locale"
      @change="updateLocale"
      :items="langs"
      label="Standard"
    ></v-select>
  </div>
</template>

<script>
import vueDropzone from 'vue2-dropzone';
import { downloadFile, readFile } from '@/helpers/file';

export default {
  name: 'SettingsScreen',
  components: {
    vueDropzone,
  },
  data() {
    return {
      file: null,
      dropOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 4, // MB
        maxFiles: 1,
      },
      langs: ['en', 'ru'],
    };
  },
  methods: {
    updateLocale() {
      localStorage.setItem('locale', this.$i18n.locale);
    },
    afterComplete(file) {
      console.log(file);
      this.file = file;
    },
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
