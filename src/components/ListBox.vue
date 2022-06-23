<template>
  <div class="box has-text-weight-bold" :style="listBoxStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListBox",
  data() {
    return {
      listBoxStyle: {
        backgroundColor: "#faf0ca",
      },
    };
  },
});
</script>
