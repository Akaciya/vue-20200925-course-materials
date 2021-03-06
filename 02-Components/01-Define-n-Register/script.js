import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const VCat = {
  template: '#v-cat-template',
  data: () => ({
    random: Math.random(),
  }),
};

const VCatX = {
  template: '#v-cat-x-template',
  data: () => ({
    random: Math.random(),
  }),
};

const VCat3 = {
  template: '<img :src="`https://cataas.com/cat?height=300&random=${random}`" alt="Random cat">',
  data: () => ({
    random: Math.random(),
  }),
};

Vue.component('v-cat6', {
  template: '<img :src="`https://cataas.com/cat?height=300&random=${random}`" alt="Random cat">',
  data: () => ({
    random: Math.random(),
  }),
});

const app = new Vue({
  el: '#app',

  components: {
    VCat,
    VCat2: VCatX,
    VCat3,
    VCat4: {
      template: '<img :src="`https://cataas.com/cat?height=300&random=${random}`" alt="Random cat">',
      data() {
        return {
          random: Math.random(),
        };
      },
    },
    VCat5: () => import('./VCat.js'),
  },

  data: () => ({
    catsCount: 3,
  }),
});
