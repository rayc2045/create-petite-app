'use strict';

import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/petite-vue/0.4.1/petite-vue.es.min.js';
import { fetchData, copyText, toggleClasses } from '/src/scripts/utils.js';

const App = {
  isPrefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches,
  isLoading: true,
  animations: [],
  async init() {
    this.animations = await fetchData('./data/animations.json');
    this.isLoading = false;
  },
  copyText,
  toggleAnimation(el, animation) {
    toggleClasses(el, `animate__animated animate__${animation} animate__infinite`);
  },
};

createApp(App).mount();
