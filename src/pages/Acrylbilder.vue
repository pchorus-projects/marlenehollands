<template>
  <Layout>
    <section class="u-max-page-width u-margin-top-xl u-margin-bottom-xl">
      <h1 class="heading heading--xxl heading--xxl-paragraph">Acrylbilder</h1>
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
query Acrylbilder {
  prismic {
    acrylbilder: allAcrylbilds(sortBy: title_ASC) {
      edges {
        node {
          _meta {
            uid
          }
          date
          image
          title
          technique
          description
          height
          width
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
    'Acrylbilder',
    // TODO: Fix description text.
    'Acrylbilder'
  ),
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = this.$page.prismic.acrylbilder.edges.map(({ node }) => {
      return {
        id: node._meta.uid,
        title: node.title[0].text,
        technique: node.technique,
        height: node.height,
        width: node.width,
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
