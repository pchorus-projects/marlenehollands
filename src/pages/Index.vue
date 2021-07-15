<template>
  <Layout>
    <section class="hero">
      <div class="hero__text">
        <h1 class="hero__title">Aquarell- & Acrylmalerei</h1>
        <p class="hero__subtitle">Marlene Hollands</p>
      </div>

      <g-image class="hero__image" src="@/assets/images/hero.jpg"></g-image>
    </section>

    <section class="section section--alternate">
      <text-and-image class="u-max-page-width" :data="marlene" :is-alternate="false" />
    </section>

    <section class="section">
      <text-and-image class="u-max-page-width" :data="aquarelle" :is-alternate="true" />
    </section>

    <section class="section section--alternate">
      <text-and-image class="u-max-page-width" :data="acrylbilder" :is-alternate="false" />
    </section>

    <section class="section">
      <text-and-image class="u-max-page-width" :data="grusskarten" :is-alternate="true" />
    </section>

    <section class="section section--alternate">
      <h2 class="heading heading--xxl heading--xxl-paragraph u-max-page-width">Aktuelle Termine</h2>
      <upcoming-dates class="u-max-page-width"></upcoming-dates>
    </section>
  </Layout>
</template>

<script>
import TextAndImage from '../components/TextAndImage';
import UpcomingDates from '../components/UpcomingDates';

export default {
  components: { TextAndImage, UpcomingDates },
  metaInfo: {
    title: 'Marlene Hollands',
  },
  data() {
    return {
      marlene: {
        header: 'Herzlich Willkommen in meiner digitalen Ausstellung!',
        text: 'Ich freue mich über Ihr Interesse an meiner Malerei. Sehen Sie sich gerne um und zögern Sie nicht, bei Gefallen eines Werkes eine Anfrage zu stellen.',
        image: {
          altText: 'Portrait Marlene Hollands',
          path: 'images/marlenehollands.jpg',
        },
        link: {
          text: 'Über mich',
          path: '/ueber-mich/',
        },
      },
      aquarelle: {
        header: 'Aquarelle',
        text: 'Die Aquarellmalerei ist eine sehr vielseitige Maltechnik, sie besticht durch ihre Tiefe und Leuchtkraft. Die leuchtende und lebendige Qualität kann mit einigen Techniken, z.B. Trocken-auf Nass; Nass-auf-Trocken; Trocken-auf-Trocken; Nass-in-Nass auf Papier oder Keilrahmen ausgeführt werden. Es können auch noch diverse Zusätze wie Salz, Folie oder Alkohol mit ins Spiel gebracht werden.',
        image: {
          altText: 'Aquarelle',
          path: 'images/aquarelle.jpg',
        },
        link: {
          text: 'Zu den Bildern',
          path: '/aquarelle/',
        },
      },
      acrylbilder: {
        header: 'Acrylbilder',
        text: 'Acryl ist eine wunderbare Malfarbe, die mit vielen Malmitteln durch Mischtechniken zu verwenden ist, z.B. Strukturpaste, Sand, Kaffee, Papier, Fotos, Naturmaterialien. Alles ist möglich. Der Fantasie ist kaum eine Grenze gesetzt.',
        image: {
          altText: 'Werkzeuge für Acrylmalerei',
          path: 'images/steve-johnson-ZXWOrKZ0h_M-unsplash.jpg',
        },
        link: {
          text: 'Zu den Bildern',
          path: '/acrylbilder/',
        },
      },
      grusskarten: {
        header: 'Grußkarten',
        text: 'Glückwünsche auf Karten mit Engeln zu übermitteln ist immer wieder eine wunderbare Möglichkeit, das Besondere hervorzuheben!',
        image: {
          altText: 'Grußkarte',
          path: 'images/karten.jpg',
        },
        link: {
          text: 'Zu den Grußkarten',
          path: '/grusskarten/',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.hero {
  position: relative;
  z-index: -1;
  margin-top: -$header-height;
  margin-bottom: 0;
  padding: 0;

  &__text {
    text-align: right;
    position: absolute;
    font-family: $font-family-header-default;
    font-weight: 400;
    color: $accent-color;
    bottom: 80px;
    right: 80px;
    padding: $space-m;
    border-radius: $border-radius-default;
    background-color: rgba(255, 255, 255, 0.6);
  }

  &__title {
    font-size: 72px;
    line-height: 80px;
  }

  &__subtitle {
    font-size: $font-size-l;
    line-height: $line-height-l;
  }

  &__image {
    display: block; // remove gap at the image's bottom
    min-height: 320px;
    max-height: 720px;
    width: 100%;
    object-fit: cover;
  }
}

@media (max-width: $max-width-tablet) {
  .hero {
    &__text {
      bottom: 40px;
      right: 40px;
    }

    &__title {
      font-size: 56px;
      line-height: 64px;
    }

    &__subtitle {
      display: none;
    }
  }
}

@media (max-width: $max-width-mobile-landscape) {
  .hero {
    &__text {
      bottom: 10px;
      right: 10px;
    }

    &__title {
      font-size: 40px;
      line-height: 48px;
    }
  }
}

@media (max-width: $max-width-mobile) {
  .hero {
    &__text {
      bottom: 10px;
      right: 10px;
    }

    &__title {
      font-size: 24px;
      line-height: 32px;
    }
  }
}
</style>
