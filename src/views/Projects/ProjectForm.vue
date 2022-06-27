<template>
  <form @submit.prevent="saveProject">
    <div class="field">
      <label class="label" for="projectName"> Project Name </label>
      <input type="text" class="input" v-model="projectName" id="projectName" />
    </div>
    <div class="field">
      <button class="button" type="submit">Save</button>
    </div>
  </form>
</template>"New project saved"

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { CREATE_PROJECT, EDIT_PROJECT } from "@/store/mutationsType";
import { NotificationType } from "@/interfaces/INotification";
import { notifyMixin } from "@/mixins/notify";

export default defineComponent({
  name: "ProjectForm",
  props: {
    id: {
      type: String,
    },
  },
  mixins: [notifyMixin],
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (proj) => proj.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    saveProject() {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName,
        });
      } else {
        this.store.commit(CREATE_PROJECT, this.projectName);
      }
      this.projectName = "";
      this.notify(
        "New project saved",
        "Done :D   Our project is already available",
        NotificationType.SUCCESS
      );
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped>
.label {
  color: var(--text-primary) !important;
}
</style>