<template>
    <div
      :class="cn('w-full h-auto', $props.class)"
      style="transform-style: preserve-3d"
    >
      <slot />
    </div>
  </template>
  
  <script setup>
  /* eslint-disable no-undef */
  import { cn } from "@/lib/utils.js";
  
  defineProps({
    class: String,
  });
  </script>