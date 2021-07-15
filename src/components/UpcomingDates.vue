<template>
  <ul class="upcoming-dates">
    <li
      class="upcoming-dates__item"
      v-for="upcomingDate in this.$static.prismic.upcomingDates.edges"
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
</template>

<static-query>
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
</static-query>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

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
  .upcoming-dates {
    display: block;

    > :not(:last-child) {
      margin: 0 0 $space-l 0;
    }
  }
}
</style>
