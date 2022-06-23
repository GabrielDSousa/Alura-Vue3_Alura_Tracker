<template>
  <button class="button" @click="methodOnClick" :disabled="disabled">
    <span class="icon">
      <i class="fas" :class="iconClass"></i>
    </span>
    <span>{{ buttonText }}</span>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonTimer",
  props: {
    methodOnClick: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    iconClass: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
  },
});
</script>
