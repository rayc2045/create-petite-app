'use strict';

import { createApp, reactive } from 'https://cdnjs.cloudflare.com/ajax/libs/petite-vue/0.4.1/petite-vue.es.min.js';
import { fetchData, copyText, toggleClasses } from '/src/scripts/utils.js';

(() => {
  const STORAGE_KEY = 'storage-key';
  const localStore = {
    fetch() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },
    save(id) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(id));
    },
    remove() {
      localStorage.removeItem(STORAGE_KEY);
    },
  };

  const Counter = reactive({
    count: 0,
    get plusOne() {
      return this.count + 1;
    },
    increment() {
      this.count++;
    },
  });

  const App = {
    Counter,
    isPrefersReducedMotion: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches,
    isLoading: true,
    animations: [],
    async init() {
      this.isLoading = false;
    },
    copyText,
    toggleClasses,
  };

  createApp(App).mount();
})();
