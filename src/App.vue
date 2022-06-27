<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <SideBar @changedTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <AppNotifications></AppNotifications>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import AppNotifications from "./components/AppNotifications.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    AppNotifications,
  },
  data() {
    return {
      darkMode: true,
    };
  },
  methods: {
    changeTheme(darkMode: boolean) {
      this.darkMode = darkMode;
    },
  },
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>