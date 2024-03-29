<template>
  <div class="layout">
    <div class="header-container">
      <header class="header u-max-page-width">
        <g-link class="header__link" to="/">Marlene Hollands</g-link>
        <div>
          <button class="menu-button" type="button" @click="onMenuButtonClick">
            <img class="menu-button__icon" :src="isMobileMenuVisible ? '../close.svg' : '../menu.svg'" alt="Menü" />
          </button>
          <nav class="nav" :class="{ 'nav--visible': this.isMobileMenuVisible }">
            <g-link
              v-for="navItem in navItems"
              class="nav__link"
              active-class="nav__link--active"
              :to="navItem.to"
              :key="navItem.to"
              >{{ navItem.name }}</g-link
            >
          </nav>
        </div>
      </header>
    </div>

    <div>
      <nav class="nav" :class="{ 'nav--visible': this.isMobileMenuVisible }"></nav>
    </div>
    <main class="main">
      <slot />
    </main>
    <div class="footer-container">
      <footer class="footer u-max-page-width">
        <div class="footer__author">
          erstellt durch
          <a class="footer__author-link" href="https://pascalchorus.de" target="_blank" rel="noopener"
            >pascalchorus.de</a
          >
        </div>

        <div class="footer__links">
          <g-link v-for="footerLink in footerLinks" class="footer__link" :to="footerLink.to" :key="footerLink.to">{{
            footerLink.name
          }}</g-link>
        </div>
      </footer>
    </div>
    <cookie-policy-modal v-if="isModalVisible" @close="onCookiePolicyModalClose"></cookie-policy-modal>
  </div>
</template>

<script>
import CookiePolicyModal from '../components/CookiePolicyModal';
import { bootstrapGtag, STATISTICS_COOKIES_COOKIE_NAME } from '../utils';

export default {
  components: { CookiePolicyModal },
  data: function () {
    return {
      isModalVisible: false,
      isMobileMenuVisible: false,
      navItems: [
        {
          name: 'Aquarelle',
          to: '/aquarelle/',
        },
        {
          name: 'Acrylbilder',
          to: '/acrylbilder/',
        },
        {
          name: 'Grußkarten',
          to: '/grusskarten/',
        },
        {
          name: 'Über mich',
          to: '/ueber-mich/',
        },
        {
          name: 'Termine',
          to: '/termine/',
        },
        {
          name: 'Kontakt',
          to: '/kontakt/',
        },
      ],
      footerLinks: [
        {
          name: 'Impressum',
          to: '/impressum/',
        },
        {
          name: 'Datenschutz',
          to: '/datenschutz/',
        },
      ],
    };
  },
  mounted: function () {
    const localStorageItem = localStorage.getItem(STATISTICS_COOKIES_COOKIE_NAME);

    if (localStorageItem) {
      bootstrapGtag();
    } else {
      this.isModalVisible = true;
    }
  },
  methods: {
    onMenuButtonClick: function () {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    },
    onCookiePolicyModalClose(isStatisticsCookiesAllowed) {
      this.isModalVisible = false;
      localStorage.setItem(STATISTICS_COOKIES_COOKIE_NAME, JSON.stringify({ isStatisticsCookiesAllowed }));
      bootstrapGtag();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header-container {
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 16px 0 $shadow-default-color;
}

.header {
  height: $header-height;
  width: 100%;
  max-width: $max-content-width;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__link {
    font-weight: 300;
    font-size: $font-size-xl;
    display: block;
  }
}

.nav {
  display: flex;

  &__link {
    display: block;
    padding: $space-xs 0 $space-xs - $tabs-border-bottom-width 0;
    margin: 0 $space-s;

    border-bottom: $tabs-border-bottom-width solid transparent;

    &:hover {
      border-color: $tabs-border-bottom-color-hover;
    }

    &--active {
      border-color: $tabs-border-bottom-color-selected;
    }
  }
}

.menu-button {
  display: none;
  font-size: $size-m;
  height: $size-l;
  width: $size-l;

  &__icon {
    height: $size-l;
    width: $size-l;
  }
}

.main {
  // IE 11 needs all three attributes
  flex: 1 0 auto;
}

.footer-container {
  background-color: $background-color-dark;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  &__author {
    color: $primary-color;
    font-size: $font-size-s;
  }

  &__author-link {
    color: $font-color-white;
  }

  &__links {
    display: flex;
  }

  &__link {
    display: block;
    padding: $space-s;
    color: $font-color-white;

    &:hover {
      color: $font-color-white-light;
      border-color: $tabs-border-bottom-color-hover;
    }

    &:active {
      color: $font-color-white-dark;
    }
  }
}

@media (max-width: $max-width-tablet) {
  .menu-button {
    display: block;
  }

  .header {
    &__link {
      font-size: $font-size-l;
    }
  }

  .nav {
    display: none;
    background-color: $background-color-default;
    border-radius: $border-radius-small;
    min-width: 30vw;
    box-shadow: 0 0 50px -22px $shadow-default-color;

    &--visible {
      display: block;
      position: absolute;
      top: $header-height + $size-xs;
      right: $size-xs;
    }

    &__link {
      padding: $space-s 0;
      border-bottom: none;
    }
  }
}

@media (max-width: $max-width-mobile) {
  .footer {
    flex-direction: column-reverse;

    &__author {
      padding: $size-s;
    }
  }
}
</style>
