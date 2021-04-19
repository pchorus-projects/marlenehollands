<template>
  <Layout>
    <section class="u-max-page-width u-margin-top-xl u-margin-bottom-xl">
      <h1 class="heading heading--xxl heading--xxl-paragraph">Aquarelle</h1>
      <p>
        Die Aquarellmalerei ist eine sehr vielseitige Maltechnik, sie besticht durch ihre Tiefe und Leuchtkraft. Die
        leuchtende und lebendige Qualität kann mit einigen Techniken, z.B. Trocken-auf Nass; Nass-auf-Trocken;
        Trocken-auf-Trocken; Nass-in-Nass auf Papier oder Keilrahmen ausgeführt werden. Es können auch noch diverse
        Zusätze wie Salz, Folie oder Alkohol mit ins Spiel gebracht werden.
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
    'Aquarelle',
    // TODO: Fix description text.
    'Aquarelle'
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
