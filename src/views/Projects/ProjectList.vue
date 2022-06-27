<template>
  <router-link to="/projects/new" class="button">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
    <span>New project</span>
  </router-link>
  <table class="table is-fullwidth mt-5">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in projects" :key="project.id">
        <td>{{ project.id }}</td>
        <td>{{ project.name }}</td>
        <td>
          <router-link :to="`/projects/${project.id}`" class="button">
            <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
            </span>
          </router-link>
          <button
            class="button ml-2 is-danger"
            @click="deleteProject(project.id)"
          >
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { DELETE_PROJECT } from "@/store/mutationsType";

export default defineComponent({
  name: "ProjectsList",
  methods: {
    deleteProject(id: string) {
      this.store.commit(DELETE_PROJECT, id);
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },
});
</script>
<style scoped>
table {
  background-color: var(--bg-primary);
  color: var(--text-primary) !important;
}
th {
  color: var(--text-primary) !important;
}
</style>