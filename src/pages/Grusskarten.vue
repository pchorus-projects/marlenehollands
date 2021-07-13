<template>
  <Layout>
    <section class="u-max-page-width u-margin-top-xl u-margin-bottom-xl">
      <h1 class="heading heading--xxl heading--xxl-paragraph">Grußkarten</h1>
      <p class="u-font-m">
        Glückwünsche auf Karten mit Engeln zu übermitteln ist immer wieder eine wunderbare Möglichkeit, das Besondere
        hervorzuheben!
      </p>
    </section>
    <section class="u-max-page-width u-margin-bottom-xl">
      <photo-swipe :items="items"></photo-swipe>
    </section>
  </Layout>
</template>

<page-query>
query Grusskarten {
  prismic {
    grusskarten: allGrusskartes(sortBy: title_ASC) {
      edges {
        node {
          _meta {
            uid
          }
          image
          title
          description
        }
      }
    }
  }
}
</page-query>

<script>
import { getMetaInfo } from '../utils';
import PhotoSwipe from '../components/PhotoSwipe';

export default {
  components: { PhotoSwipe },
  metaInfo: getMetaInfo(
    'Grußkarten',
    // TODO: Fix description text.
    'Grußkarten'
  ),
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = this.$page.prismic.grusskarten.edges.map(({ node }) => {
      return {
        id: node._meta.uid,
        title: node.title[0].text,
        src: node.image.url,
        thumbnail: node.image.thumbnail.url,
        thumbnailx2: node.image.thumbnailx2.url,
        imageHeight: node.image.dimensions.height,
        imageWidth: node.image.dimensions.width,
      };
    });
  },
};
</script>
