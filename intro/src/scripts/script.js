'use strict';

import { createApp, reactive } from '/src/libraries/petite-vue.es.min.js';
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

const ContextMenu = reactive({
  isShow: false,
  lists: [
    { content: 'Features', link: '#features'},
    { content: 'Pre-packed', link: '#pre-packed'},
    { content: 'Ways of quick start', link: '#ways-of-quick-start'},
    { content: 'Usage', link: '#usage'},
    { content: 'Petite-Vue syntax', link: '#petite-vue-template-syntax'},
    { content: 'MDBootstrap examples', link: '#mdbootstrap-examples'},
    { content: 'Animate.css animations', link: '#animate-css-animations'},
  ],
  showMenu(e) {
    if (!this.lists.length) return;
    this.isShow = true;
    const menuEl = document.querySelector('#context-menu');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const menuWidth = menuEl.getBoundingClientRect().width;
    const menuHeight = menuEl.getBoundingClientRect().height;

    const offset = 5;

    let menuPosX = `${e.clientX + offset}px`;
    let menuPosY = `${e.clientY + offset}px`;

    if (e.clientX + offset + menuWidth > windowWidth)
      menuPosX = `${e.clientX - offset - menuWidth}px`;

    if (e.clientY + offset + menuHeight > windowHeight)
      menuPosY = `${e.clientY - offset - menuHeight}px`;

    menuEl.style.left = menuPosX;
    menuEl.style.top = menuPosY;
  }
});

const App = {
  ContextMenu,
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
window.onresize = () => (ContextMenu.isShow = false);
window.onscroll = () => (ContextMenu.isShow = false);