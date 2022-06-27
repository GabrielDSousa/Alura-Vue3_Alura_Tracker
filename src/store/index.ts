import { INotification } from "@/interfaces/INotification";
import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { CREATE_PROJECT, EDIT_PROJECT, DELETE_PROJECT, CREATE_TASK, DELETE_TASK, NOTIFY } from "./mutationsType";

interface State {
    projects: IProject[],
    tasks: ITask[],
    notifications: INotification[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        tasks: [],
        notifications: []
    },
    mutations: {
        [CREATE_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [CREATE_TASK] (state, task: ITask) {
            task.id = new Date().toISOString()
            state.tasks.push(task)
        },
        [DELETE_TASK] (state, id: string) {
            state.tasks = state.tasks.filter(t => t.id != id)
        },
        [NOTIFY] (state, newNotification: INotification){
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != newNotification.id)
            }, 3000)
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}