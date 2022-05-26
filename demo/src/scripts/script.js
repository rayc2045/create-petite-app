'use strict';

import { createApp } from '/src/libraries/petite-vue.es.min.js';
import { ContextMenu } from '/src/scripts/components.js';

((window, document) => {
  ContextMenu.lists = [
    // { content: 'Features', link: '#features' },
  ];

  const App = {
    ContextMenu,
    isPrefersReducedMotion: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches,
    isLoading: true,
    async init() {
      this.isLoading = false;
    },
  };

  createApp(App).mount();
  window.onresize = () => (ContextMenu.isShow = false);
  window.onscroll = () => (ContextMenu.isShow = false);
})(window, document);
