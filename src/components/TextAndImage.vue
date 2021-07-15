<template>
  <div class="root" :class="{ 'root--alternate': isAlternate }">
    <div class="description" :class="{ 'description--alternate': isAlternate }">
      <h2 class="heading heading--xl heading--xl-paragraph" v-html="data.header"></h2>
      <p class="u-font-m">{{ data.text }}</p>
      <g-link
        v-if="data.link"
        :to="data.link.path"
        :aria-label="data.link.text"
        class="link u-inline-block u-margin-top-m"
        >{{ data.link.text }}</g-link
      >
    </div>
    <g-image
      v-if="data.image"
      class="image"
      :src="require(`!!assets-loader!@assets/${data.image.path}`)"
      :alt="data.image.altText"
    />
  </div>
</template>

<script>
export default {
  props: ['data', 'isAlternate'],
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.root {
  display: flex;
  align-items: center;

  &--alternate {
    flex-direction: row-reverse;
  }
}

.description {
  margin-right: $space-l;
  flex: 1;

  &--alternate {
    margin-right: 0;
    margin-left: $space-l;
  }
}

@media (max-width: $max-width-mobile) {
  .image {
    width: 100vw;
    border-radius: 0;
  }
}

@media (max-width: $max-width-tablet) {
  .root {
    flex-direction: column;
  }

  .description {
    margin: 0 0 $space-l 0;

    &--alternate {
      margin: 0 0 $space-l 0;
    }
  }

  // IE11 does not handle flex-box in flex-box both with direction column correctly
  @media (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .root {
      display: block;
    }
  }
}
</style>
