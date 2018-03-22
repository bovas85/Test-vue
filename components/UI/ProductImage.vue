<template>
  <transition 
    tag="div" 
    name="fade" 
    mode="out-in">
    <img 
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