<template>
  <Layout>
    <section class="u-max-page-width u-margin-top-xl u-margin-bottom-xl">
      <h1 class="heading heading--xxl heading--xxl-paragraph">Aquarelle</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste
        tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
      </p>
    </section>
    <section class="u-max-page-width u-margin-bottom-xl">
      <ul class="image-list">
        <li class="image-item" v-for="edge in $page.prismic.aquarelle.edges" :key="edge.node.id">
          <img class="image-item__image" :src="edge.node.image.thumbnail.url" :alt="edge.node.title[0].text" />
          <div class="image-item__content">
            <p class="image-item__title">{{ edge.node.title[0].text }}</p>
            <p class="image-item__text">
              <span> {{ edge.node.width }} x {{ edge.node.height }} </span>
              <span>{{ edge.node.available ? 'verfügbar' : 'nicht verfügbar' }}</span>
            </p>
          </div>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<page-query>
query Aquarelle {
  prismic {
    aquarelle: allAquarells(sortBy: title_ASC) {
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
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.image-list {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
}

.image-item {
  margin: 0;
  position: relative;

  &:hover {
    .image-item__content {
      opacity: 1;
    }
  }

  &__image {
    display: block;
    width: 100%;
    border-radius: $border-radius-small;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    color: $font-color-white;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    padding: $space-m;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: $border-radius-small;
  }

  &__title {
    font-size: $font-size-m;
  }

  &__text {
    font-size: $font-size-s;
    color: $font-color-white-dark;
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: $max-width-tablet) {
  .image-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: $max-width-mobile-landscape) {
  .image-list {
    grid-gap: 16px;
  }

  .image-item {
    &:hover {
      .image-item__content {
        opacity: 0;
      }
    }
  }
}

@media (max-width: $max-width-mobile) {
  .image-list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
