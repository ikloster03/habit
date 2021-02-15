<template>
  <v-container>
    <div class="pa-4">
      <div class="text-h5">{{ $t('settings.change-lang') }}</div>
      <v-select
        v-model="$i18n.locale"
        :items="langs"
        label=""
        @change="updateLocale"
      ></v-select>
    </div>
    <div class="pa-4">
      <div class="text-h5">{{ $t('settings.export-import-habits') }}</div>
      <div class="d-flex justify-center py-4">
        <v-btn color="blue" dark @click="exportHabits">
          {{ $t('settings.export-habits') }}
        </v-btn>
      </div>
      <div :key="$i18n.locale" class="py-4">
        <vue-dropzone
          id="drop1"
          ref="dropzone"
          :options="dropOptions"
          @vdropzone-complete="afterComplete"
        ></vue-dropzone>
        <div class="d-flex justify-center py-4">
          <v-btn color="orange" @click="importHabits">
            {{ $t('settings.import-habits') }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
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
        dictDefaultMessage: this.$t('settings.upload'),
      },
      langs: [
        { text: 'English', value: 'en' },
        { text: 'Русский', value: 'ru' },
      ],
    };
  },
  methods: {
    updateLocale() {
      this.$set(this.dropOptions, 'dictDefaultMessage', this.$t('settings.upload'));
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
    async importHabits() {
      if (this.file) {
        const habits = await readFile(this.file);
        localStorage.setItem('habits', String(habits));
        await this.$router.push({ name: 'home-screen' });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
