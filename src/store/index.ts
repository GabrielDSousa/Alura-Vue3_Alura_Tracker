import { INotification } from "@/interfaces/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { NOTIFY } from "./mutationsType";
import { ProjectState, project } from '@/store/modules/project'
import { TaskState, task } from "./modules/task";

export interface State {
    notifications: INotification[],
    project: ProjectState,
    task: TaskState
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        notifications: [],
        project: {
            projects: []
        },
        task: {
            tasks: []
        }
    },
    mutations: {
        [NOTIFY] (state, newNotification: INotification){
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != newNotification.id)
            }, 3000)
        }
    },
    modules: {
        project,
        task
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}