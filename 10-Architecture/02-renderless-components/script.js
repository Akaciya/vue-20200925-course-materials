import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const RenderlessListView = {
  props: {
    items: Array,
  },

  data() {
    return {
      items_: [...this.items],
    };
  },

  methods: {
    remove(idx) {
      this.items_.splice(idx, 1);
      this.$emit('update:items', [...this.items_]);
    },
  },

  render(h) {
    return this.$scopedSlots.default({
      items: this.items,
      methods: {
        remove: this.remove,
      },
    });
  },
};


const UlListView = {
  template: `<renderless-list-view :items="list" @update:items="$emit('update:list', $event)">
  <template #default="{ methods, items }">
    <ul>
      <li v-for="(item, idx) in items">
        <span>{{ item }}</span>
        <button @click="methods.remove(idx)">x</button>
      </li>
    </ul>
  </template>
</renderless-list-view>`,

  components: {
    RenderlessListView,
  },

  props: {
    list: Array,
  },
};


const App = {
  template: `<div>
    <ul-list-view :list.sync="list" />
  </div>`,

  components: {
    UlListView,
  },

  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
}

const app = new Vue(App).$mount('#app');
