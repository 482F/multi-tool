<template>
  <v-btn class="a-btn" v-bind="$props" :style="{ '--bg-color': bgColor }">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'a-btn',
  props: {
    variant: {
      type: String,
      default: 'outlined',
    },
    rounded: {
      type: [String, Number],
      default: 'primary',
    },
    bgColor: {
      type: String,
      default: 'white',
    },
  },
}
</script>

<style lang="scss" scoped>
.a-btn {
  background-color: var(--bg-color);
}
</style>
