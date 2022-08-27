<template>
  <div class="main">
    <tab-bar class="tab-bar" v-model:current-tab="currentTab" :tabs="tabs" />
    <component
      class="component"
      v-for="m of modules"
      :is="m.component"
      v-show="m.label === currentTab"
    />
  </div>
</template>

<script>
const rawModules = import.meta.glob('./modules/*/index.vue')
const modules = Object.fromEntries(
  await Promise.all(
    Object.entries(rawModules).map(async ([key, func]) => [
      key.replaceAll(/^\.\/modules\/|\/index\.vue$/g, ''),
      await func().then((result) => ({
        component: result.default,
        label: result.label ?? key,
      })),
    ])
  )
)

import TabBar from './tab-bar.vue'

export default {
  name: 'main',
  components: {
    TabBar,
  },
  data: () => ({
    currentTab: Object.values(modules)[0]?.label,
  }),
  computed: {
    modules() {
      return modules
    },
    tabs() {
      return Object.values(modules).map(({ label }) => label)
    },
  },
  async mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #ffffff;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .tab-bar {
    flex-shrink: 0;
  }
  .component {
    padding: 1rem;

    min-height: 0;
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: auto;
  }
}
</style>
