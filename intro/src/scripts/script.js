'use strict';

import { createApp } from '/src/libraries/petite-vue.es.min.js';
import { fetchData, copyText, toggleClasses } from '/src/scripts/utils/utils.js';

const petiteVueExample = `
  <script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module'

    function Counter(props) {
      return {
        count: props.initialCount,
        inc() {
          this.count++
        },
        mounted() {
          console.log("I'm mounted!")
        }
      }
    }

    createApp({
      Counter
    }).mount()
  </script>

  <div v-scope="Counter({ initialCount: 1 })" @vue:mounted="mounted">
    <p>{{ count }}</p>
    <button @click="inc">increment</button>
  </div>

  <div v-scope="Counter({ initialCount: 2 })">
    <p>{{ count }}</p>
    <button @click="inc">increment</button>
  </div>
`.trim();

const App = {
  isPrefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches,
  isLoading: true,
  petiteVueExample,
  animations: [],
  async init() {
    this.animations = await fetchData('./src/data/animations.json');
    this.isLoading = false;
  },
  copyText,
  removeStyleAttr(str) {
    return str.replace(/style="[^"]*"/g, '').replace(/" >/g, '">');
  },
  toggleAnimation(el, animation) {
    toggleClasses(el, `animate__animated animate__${animation} animate__infinite`);
  },
};

createApp(App).mount();