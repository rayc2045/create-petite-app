'use strict';

import { createApp } from '/src/libraries/petite-vue.es.min.js';
import { fetchData, copyText, toggleClasses } from '/src/scripts/utils/utils.js';

const App = {
  ClassesSearch,
  isPrefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches,
  isLoading: true,
  animations: [],
  async init() {
    this.animations = await fetchData('./src/data/animations.json');
    this.isLoading = false;
  },
  copyText,
  toggleAnimation(el, animation) {
    toggleClasses(el, `animate__animated animate__${animation} animate__infinite`);
  },
};

createApp(App).mount();
