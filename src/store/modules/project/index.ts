import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { CREATE_PROJECT, DELETE_PROJECT, EDIT_PROJECT, GET_PROJECTS } from "@/store/actionsType";
import { LIST_PROJECTS, ADD_PROJECT, MODIFY_PROJECT, REMOVE_PROJECT } from "@/store/mutationsType";
import { Module } from "vuex";

export interface ProjectState {
    projects: IProject[]
}

export const project: Module<ProjectState, State> = {
    mutations: {
        [LIST_PROJECTS] (state, projects: IProject[]) {
            state.projects = projects
        },
        [ADD_PROJECT] (state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        },
        [MODIFY_PROJECT] (state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [REMOVE_PROJECT] (state, id: string) {
            state.projects = state.projects.filter(p => p.id != id)
        },
    },
    actions: {
        [GET_PROJECTS] ({ commit }) {
            http.get('projects').then(answer => commit(LIST_PROJECTS,answer.data))
        },
        [CREATE_PROJECT] (context, projectName: string) {
            return http.post('/projects', {
                name: projectName
            })
        },
        [EDIT_PROJECT] (context, project: IProject) {
            return http.put(`/projects/${project.id}`, project)
        },
        async [DELETE_PROJECT] (context, id: string) {
            await http.delete(`/projects/${id}`);
            this.commit(REMOVE_PROJECT, id);
        },
    },
}