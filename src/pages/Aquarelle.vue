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
      <photo-swipe :items="items"></photo-swipe>
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
    'Galerie',
    // TODO: Fix description text.
    'Galerie'
  ),
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = this.$page.prismic.aquarelle.edges.map(({ node }) => {
      return {
        id: node._meta.uid,
        title: node.title[0].text,
        width: node.width,
        height: node.height,
        src: node.image.url,
        thumbnail: node.image.thumbnail.url,
        imageWidth: node.image.dimensions.width,
        imageHeight: node.image.dimensions.height,
      };
    });
  },
};
</script>
