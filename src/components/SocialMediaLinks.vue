<template>
  <div class="social-media">
    <a href="/" target="_blank" rel="noopener">
      <img class="social-media__icon" src="@/assets/images/instagram.svg" alt="Instagram" />
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/variables';
.social-media {
  display: flex;
  align-items: center;

  &__icon {
    display: block;
    height: $size-m;
    margin: 0 $space-xs;

    &--large {
      height: $size-l;
    }
  }
}
</style>
