<template>
  <button
    class="btn"
    :class="`btn-${type}`"
    :disabled="disabled"
    @click="$emit('clicked')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonCmp',

  props: {
    type: {
      type: String,
      default: 'action'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  @include fontSizeRem(12, 16);
  text-transform: uppercase;
  border-radius: 5px;
  padding: .8rem 1.6rem;

  @include breakpoint(desktop) {
    padding: 1.5rem 3rem;
  }

  &:disabled {
    opacity: .3;
    transition: all .3s ease;
    cursor: default;
  }

  &-action {
    color: $white;
    background-color: $blue;
  }

  &-neutral {
    color: $font_color;
    background-color: $light_grey;
  }
}
</style>
