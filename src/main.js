// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/styles.scss';
import DefaultLayout from '~/layouts/Default.vue';
import VueGtag from 'vue-gtag';
import { siteName, siteUrl } from '../gridsome.config';

export default function (Vue, { head }) {
  const addMetaTag = (name, content) => head.meta.push({ key: name, name, content });

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  Vue.use(VueGtag, {
    config: { id: 'G-X3SX21GC47', params: { anonymize_ip: true } },
    bootstrap: false,
  });

  addMetaTag('application-name', siteName);
  addMetaTag('apple-mobile-web-app-title', siteName);
  addMetaTag('og:type', 'website');
  addMetaTag('og:title', siteName);
  addMetaTag('og:url', siteUrl);
  addMetaTag('og:image', `${siteUrl}/og-image.jpg`);
  addMetaTag('og:locale', 'de_DE');
  addMetaTag('twitter:card', 'summary');
}
