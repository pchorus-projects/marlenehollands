<template>
  <Layout>
    <section class="u-max-page-width u-margin-top-xl u-margin-bottom-xl">
      <h1 class="heading heading--xxl heading--xxl-paragraph">Termine</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste
        tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
      </p>
    </section>
    <section class="u-max-page-width u-margin-bottom-xl">
      <ul v-for="yearAndDates in datesPerYear" :key="yearAndDates.year">
        <li class="u-margin-bottom-xl">
          <p class="heading heading--l heading--xs-paragraph">{{ yearAndDates.year }}</p>
          <ul v-for="date in yearAndDates.dates" :key="`${date.title}-${date.year}`">
            <li>
              <a v-if="date.link" :href="date.link" target="_blank" rel="noopener">{{ date.title }}</a>
              <span v-else>{{ date.title }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<page-query>
query PastDates {
  prismic {
    pastDates: allPast_dates(sortBy: year_DESC) {
      edges {
        node {
          year
          title
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
import { getMetaInfo } from '../utils';

export default {
  metaInfo: getMetaInfo(
    'Termine',
    // TODO: Fix description text.
    'Termine'
  ),
  data() {
    return {
      datesPerYear: [],
    };
  },
  mounted() {
    const nodes = this.$page.prismic.pastDates.edges.map(({ node }) => {
      return {
        title: node.title[0].text,
        year: node.year,
        link: node.link?.url,
      };
    });

    const years = [...new Set(nodes.map((node) => node.year))];
    this.datesPerYear = years.map((year) => ({
      year,
      dates: nodes.filter((node) => node.year === year).sort((a, b) => a.title.localeCompare(b.title)),
    }));
  },
};
</script>
