<template>
  <div class="png-to-jpg-converter">
    <a-file-input
      v-model:file="file"
      @input="onInput"
      :disabled="processing"
      label="フォルダをドロップ"
    />
    <v-progress-linear
      color="flaxen"
      v-model="progressRate"
      :indeterminate="loading"
    />
  </div>
</template>

<script>
import AFileInput from '../../atoms/a-file-input.vue'

export const label = 'png->jpg変換'
export default {
  name: 'png-to-jpg-converter',
  components: {
    AFileInput,
  },
  data() {
    return {
      file: undefined,
      filePaths: [],
      loading: false,
      processing: false,
      doneNum: 0,
    }
  },
  computed: {
    progressRate() {
      return (this.doneNum / this.filePaths.length) * 100
    },
  },
  methods: {
    async onInput(file) {
      this.doneNum = 0
      this.loading = true
      this.processing = true
      if (!(await window.fs.isDirectory(file.path))) {
        this.loading = false
        this.processing = false
        return
      }
      this.filePaths = window.fs.filterExt(
        await window.fs.getAllFilePaths(file.path),
        'png'
      )
      this.loading = false
      await Promise.all(
        this.filePaths.map(async (filePath) => {
          await window.images.convert(filePath, 'jpg')
          // png の退避
          await window.fs.evacuate(
            file.path,
            filePath,
            window.fs.join(file.path, '../pngs')
          )
          this.doneNum++
        })
      )
      this.processing = false
    },
  },
}
</script>
