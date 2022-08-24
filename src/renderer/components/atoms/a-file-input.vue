<template>
  <button
    class="a-file-input"
    :class="{ 'is-drag-over': isDragOver && !disabled, disabled }"
    @click="$refs.input.click()"
    @dragenter.prevent="isDragOver = true"
    @dragover.prevent
    @drop.stop.prevent="onDrop"
    @dragleave.prevent="isDragOver = false"
  >
    <div>{{ file?.name || label }}</div>
    <input ref="input" class="input-element" type="file" @input="onInput" />
  </button>
</template>

<script>
export default {
  name: 'a-file-input',
  data() {
    return {
      isDragOver: false,
      name: '',
    }
  },
  props: {
    label: {
      type: String,
      default: 'ファイル/フォルダをドロップ',
    },
    file: {
      type: File,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onDrop(e) {
      if (this.disabled) return
      const file = [...e.dataTransfer.files][0]
      this.inputFile(file)
    },
    onInput(e) {
      if (this.disabled) return
      const file = [...e.target.files][0]
      e.target.value = null
      this.inputFile(file)
    },
    async inputFile(file) {
      this.$emit('input', file)
      this.$emit('update:file', file)
      this.isDragOver = false
    },
  },
}
</script>

<style lang="scss" scoped>
.a-file-input {
  height: 48px;
  width: 100%;
  min-width: 0;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  &.disabled {
    cursor: normal;
    background-color: lightgray;
  }
  &.is-drag-over {
    background-color: #f8fcff;
    border-style: dashed;
    border-width: 2px;
    border-color: #78a0ff;
  }
  .input-element {
    display: none;
  }
}
</style>
