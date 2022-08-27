<template>
  <div class="tab-bar">
    <a-btn class="menu" :rounded="0" variant="text">
      <v-icon>mdi-plus</v-icon>
    </a-btn>
    <div class="tabs">
      <a-btn
        class="tab"
        v-for="tab of tabs"
        :key="tab"
        :rounded="0"
        variant="text"
        :bg-color="tab === currentTab ? 'var(--flaxen)' : undefined"
        @click="$emit('update:current-tab', tab)"
      >
        {{ tab }}
      </a-btn>
    </div>
  </div>
</template>

<script>
import ABtn from './atoms/a-btn.vue'

export default {
  name: 'tab-bar',
  components: {
    ABtn,
  },
  props: {
    currentTab: {
      type: String,
      default: undefined,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-bar {
  --border: solid 1px lightgray;
  display: flex;
  justify-content: flex-start;

  border-bottom: var(--border);
  .tabs {
    display: flex;
    > .tab {
      border-right: var(--border);
    }
  }
  .a-btn {
    height: 100%;
  }
  > .menu {
    border-right: var(--border);
    min-width: 32px;
    width: 32px;
  }
}
:where(.tab-bar) {
  height: 32px;
}
</style>
