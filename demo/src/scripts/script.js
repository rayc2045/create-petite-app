'use strict';

import { createApp } from '/src/libraries/petite-vue.es.min.js';
import { ContextMenu } from '/src/scripts/components.js';
import { getWindowWidth, toggleClasses, thousandFormat } from '/src/scripts/utils.js';

((window, document) => {
  ContextMenu.lists = [
    // { content: 'Features', link: '#features' },
  ];

  const App = {
    ContextMenu,
    windowWidth: getWindowWidth(),
    isPrefersReducedMotion: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches,
    isLoading: true,
    contents: ['project', 'posts', 'comments'],
    currentContentIdx: 0,
    posts: [],
    comments: [],
    rewards: [],
    async init() {
      this.rewards = await fetch('/demo/src/data/rewards.json').then(res =>
        res.json()
      );
      this.isLoading = false;
    },
    async updateContent(idx) {
      this.currentContentIdx = idx;
      if (idx === 0) return;
      if (idx === 1 && !this.posts.length) {
        this.isLoading = true;
        this.posts = await fetch('/demo/src/data/posts.json').then(res =>
          res.json()
        );
        return this.isLoading = false;
      }
      if (idx === 2 && !this.comments.length) {
        this.isLoading = true;
        this.posts = await fetch('/demo/src/data/comments.json').then(res =>
          res.json()
        );
        return this.isLoading = false;
      }
    },
    toggleClasses,
    thousandFormat,
    updateWindowWidth() {
      this.windowWidth = getWindowWidth();
    },
  };

  createApp(App).mount();

  window.onresize = () => {
    ContextMenu.isShow = false;
    App.updateWindowWidth();
  };

  window.onscroll = () => (ContextMenu.isShow = false);
})(window, document);
