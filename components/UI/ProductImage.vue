<template>
  <transition 
    name="fade" 
    mode="out-in">
    <img
      :key="$attrs.src"
      :id="$attrs.id"
      :src="$attrs.src"
      :alt="$attrs.alt"
    >
  </transition>
</template>

<script>
  export default {
    name: "ProductImage",
    inheritAttrs: false
  };
</script>
