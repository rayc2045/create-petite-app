'use strict';

import { createApp, reactive } from '/src/libraries/petite-vue.es.min.js';

((window, document) => {
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

  const ContextMenu = reactive({
    isShow: false,
    lists: [
      // { content: 'Features', link: '#features'},
    ],
    showMenu(e) {
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
    isPrefersReducedMotion: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches,
    isLoading: true,
    isContextMenuShow: false,
    async init() {
      this.isLoading = false;
    },
  };

  createApp(App).mount();
  window.onresize = () => (ContextMenu.isShow = false);
  window.onscroll = () => (ContextMenu.isShow = false);
})(window, document);
