<template>
  <Layout>
    <section class="section section--alternate">
      <h1 class="heading heading--xxl heading--xxl-paragraph u-max-page-width">Aktuelle Termine</h1>
      <upcoming-dates class="u-max-page-width"></upcoming-dates>
    </section>
    <section class="section">
      <h2 class="heading heading--xxl heading--xxl-paragraph u-max-page-width">Vergangene Termine</h2>
      <ul class="u-max-page-width" v-for="yearAndDates in datesPerYear" :key="yearAndDates.year">
        <li class="u-margin-bottom-xl">
          <p class="heading heading--l heading--xs-paragraph">{{ yearAndDates.year }}</p>
          <ul v-for="date in yearAndDates.dates" :key="`${date.title}-${date.year}`">
            <li>
              <a class="link" v-if="date.link" :href="date.link" target="_blank" rel="noopener">{{ date.title }}</a>
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
import UpcomingDates from '../components/UpcomingDates';

export default {
  components: { UpcomingDates },
  metaInfo: getMetaInfo('Termine', 'Aktuelle und vergangene Ausstellungen.'),
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
