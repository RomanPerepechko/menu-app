<template>
  <div class="menu-block">
    <div v-for="menuElement in elementsTree" :key="menuElement.id">
      <MenuElement :menuElement="menuElement" />
    </div>
  </div>
</template>

<script>
import MenuElement from './MenuElement.vue';
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    MenuElement
  },
  data() {
    const store = useStore();
    const elementsTree = computed(() => store.getters.getTree);
    return {
      elementsTree,
      store,
    }
  },
}
</script>
<style scoped>
</style>
