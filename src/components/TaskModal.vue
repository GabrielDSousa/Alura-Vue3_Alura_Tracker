<template>
  <div
    class="modal"
    :class="{ 'is-active': task !== null }"
    v-if="task !== null"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label" for="taskDescription"> Task Description </label>
          <input
            type="text"
            class="input"
            v-model="editedTask.description"
            id="taskDescription"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="editTask">
          {{ textConfirm }}
        </button>
        <button class="button" @click="closeModal">{{ textCancel }}</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import ITask from "@/interfaces/ITask";
import { useStore } from "@/store";
import { EDIT_TASK } from "@/store/actionsType";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TaskModal",
  emits: ["editedTask"],
  props: {
    title: {
      type: String,
    },
    textConfirm: {
      type: String,
    },
    textCancel: {
      type: String,
    },
    task: {
      type: (Object as PropType<ITask>) || null,
    },
  },
  methods: {
    closeModal() {
      this.$emit("editedTask");
    },
    editTask() {
      this.store.dispatch(EDIT_TASK, this.editedTask).then(this.closeModal);
    },
  },
  computed: {
    editedTask() {
      if (this.task && this.task !== null) {
        return this.task;
      }

      return null;
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
