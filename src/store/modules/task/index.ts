import http from "@/http";
import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { GET_TASKS, CREATE_TASK, EDIT_TASK, DELETE_TASK } from "@/store/actionsType";
import { LIST_TASKS, ADD_TASK, MODIFY_TASK, REMOVE_TASK } from "@/store/mutationsType";
import { Module } from "vuex";

export interface TaskState {
    tasks: ITask[]
}

export const task: Module<TaskState, State> = {
    mutations: {
        [LIST_TASKS] (state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASK] (state, task: ITask) {
            state.tasks.push(task)
        },
        [MODIFY_TASK] (state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[index] = task
        },
        [REMOVE_TASK] (state, id: string) {
            state.tasks = state.tasks.filter(t => t.id != id)
        },
    }, 
    actions:{
        [GET_TASKS] ({ commit }, filter: string) {
            let url = 'tasks'

            if(filter) {
                url += '?description=' +  filter
            }

            http.get(url).then(answer => commit(LIST_TASKS,answer.data))
        },
        async [CREATE_TASK] (context, task: ITask) {
            const answer = await http.post('/tasks', task);
            return this.commit(ADD_TASK, answer.data);
        },
        async [EDIT_TASK] ({ commit }, task: ITask) {
            const answer = await http.put(`/tasks/${task.id}`, task);
            return commit(MODIFY_TASK, answer);
        },
        async [DELETE_TASK] (context, id: string) {
            await http.delete(`/tasks/${id}`);
            this.commit(REMOVE_TASK, id);
        }
    }
}