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
      <ul class="upcoming-dates u-max-page-width">
        <li
          class="upcoming-dates__item"
          v-for="upcomingDate in this.$page.prismic.upcomingDates.edges"
          :key="upcomingDate.title"
        >
          <p class="heading heading--l u-margin-bottom-s">{{ upcomingDate.node.title[0].text }}</p>
          <p class="u-font-s u-margin-bottom-s">
            {{ new Date(upcomingDate.node.start).toLocaleDateString() }} -
            {{ new Date(upcomingDate.node.end).toLocaleDateString() }}
          </p>
          <p class="u-font-m" v-html="upcomingDate.node.address[0].text.replace(/\n/g, '<br />')"></p>
          <a
            v-if="upcomingDate.node.link"
            style="display: block"
            class="link u-margin-top-s"
            :href="upcomingDate.node.link.url"
            target="_blank"
            rel="noopener"
            >Zur Webseite</a
          >
        </li>
      </ul>
    </section>
  </Layout>
</template>

<page-query>
query UpcomingDates {
  prismic {
    upcomingDates: allUpcoming_dates(sortBy: start_ASC) {
      edges {
        node {
          title
          start
          end
          address
          link {
            ... on prismic__ExternalLink {
              url
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import TextAndImage from '../components/TextAndImage';

export default {
  components: { TextAndImage },
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

.upcoming-dates {
  display: flex;
  justify-content: space-between;

  &__item {
    flex: 1 0 0;
    background-color: #ffffff;
    padding: $space-m;
    box-shadow: 0 0 50px -22px $shadow-default-color;
    border-radius: $border-radius-default;
  }

  > :not(:last-child) {
    margin-right: $space-xl;
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

  .upcoming-dates {
    display: block;

    > :not(:last-child) {
      margin: 0 0 $space-l 0;
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
