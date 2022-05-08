'use strict';

const { createApp, reactive } = PetiteVue;

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
  isPrefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches,
  isLoading: true,
  async init() {
    this.isLoading = false;
  },
  toggleClasses(el, cls) {
    cls.split(' ').map(cl => el.classList.toggle(cl));
  },
};

createApp(App).mount();
