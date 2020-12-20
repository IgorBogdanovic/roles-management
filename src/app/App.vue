<template>
  <router-view/>
</template>

<style lang="scss">
@import "@/-common-/assets/style/main";

#app {
  max-width: 144rem;
  padding: 1rem;
  margin: 0 auto;
  font-family: sans-serif;
  color: $font_color;
  @include fontSizeRem(12, 16);
}

h1 {
  @include fontSizeRem(20, 36);
  margin: 1rem 0;

  @include breakpoint(desktop) {
    margin: 2rem 0;
  }
}

input, select {
  @include fontSizeRem(12, 16);
  outline: none;
  border: none;
  border-bottom: 2px solid $blue;
  width: 12rem;
  padding: .5rem 0;

  @include breakpoint(desktop) {
    width: 25rem;
  }
}
</style>
