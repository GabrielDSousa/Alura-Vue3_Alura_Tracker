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
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import { CREATE_PROJECT, EDIT_PROJECT } from "@/store/actionsType";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectForm",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    //Imports and hooks
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotifier();

    //Reactive variables
    const projectName = ref("");

    //Reactivity rule for project name
    if (props.id) {
      const project = store.state.project.projects.find(
        (proj) => proj.id == props.id
      );
      projectName.value = project?.name || "";
    }

    //Methods
    const saveProject = () => {
      if (props.id) {
        store
          .dispatch(EDIT_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => {
            successOnSave();
          });
      } else {
        store.dispatch(CREATE_PROJECT, projectName.value).then(() => {
          notify(
            "New project saved",
            "Done :D   Our project is already available",
            NotificationType.SUCCESS
          );

          successOnSave();
        });
      }
    };
    const successOnSave = () => {
      projectName.value = "";
      router.push("/projects");
    };

    //Return of what is used
    return {
      projectName,
      saveProject,
    };
  },
});
</script>

<style scoped>
.label {
  color: var(--text-primary) !important;
}
</style>