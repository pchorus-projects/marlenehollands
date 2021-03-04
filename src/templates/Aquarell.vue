<template>
  <Layout>
    <section v-if="aquarell" class="page-section">
      <h1 class="image-item__title heading heading--xxl heading--xxl-paragraph">{{ aquarell.title[0].text }}</h1>
      <img class="image-item__image" :src="aquarell.image.url" :alt="aquarell.title[0].text" />
      <div class="image-item__content">
        <p class="image-item__text">
          <span>{{ aquarell.width }} x {{ aquarell.height }}</span>
          <span>{{ aquarell.available ? 'verfügbar' : 'nicht verfügbar' }}</span>
        </p>
        <p>{{ aquarell.description.reduce((cum, curr) => `${cum} ${curr.text}`, '') }}</p>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Aquarell($uid: String) {
  prismic {
    aquarelle: allAquarells(uid: $uid, sortBy: title_ASC) {
      edges {
        node {
          _meta {
            uid
          }
          date
          image
          title
          description
          width
          height
          available
        }
      }
    }
  }
}
</page-query>

<script>
import { getMetaInfo } from '../utils';

export default {
  metaInfo: getMetaInfo(
    'Galerie',
    // TODO: Fix description text.
    'Galerie'
  ),
  data() {
    return {
      aquarell: undefined,
    };
  },
  mounted() {
    this.aquarell = this.$page.prismic.aquarelle.edges[0].node;
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.page-section {
  margin-left: auto;
  margin-right: auto;
  padding-top: $space-xl;
  padding-bottom: $space-xl;
  width: 60%;
}

.image-item {
  margin: 0;

  &__image {
    width: 100%;
    border-radius: $border-radius-small;
    margin-bottom: $space-m;
    object-fit: contain;
  }

  &__content {
  }

  &__text {
    font-size: $font-size-s;
    color: $font-color-secondary;
    display: flex;
    justify-content: space-between;
    margin-bottom: $space-m;
  }
}

@media (max-width: $max-width-tablet) {
  .page-section {
    width: 80%;
  }
}

@media (max-width: $max-width-mobile-landscape) {
}

@media (max-width: $max-width-mobile) {
  .page-section {
    width: 100%;
  }

  .image-item {
    &__title,
    &__content {
      padding: 0 $space-m;
    }
    &__image {
      border-radius: 0;
    }
  }
}
</style>
