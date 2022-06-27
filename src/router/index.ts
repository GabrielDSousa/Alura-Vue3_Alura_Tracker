import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectForm from '../views/Projects/ProjectForm.vue'
import ProjectList from '../views/Projects/ProjectList.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: TasksView,
        children:[
            {
                path: '',
                name: 'Tasks',
                component: TasksView
            },
        ]
    },
    {
        path: '/projects',
        component: ProjectsView,
        children:[
            {
                path: '',
                name: 'Projects',
                component: ProjectList
            },
            {
                path: 'new',
                name: 'New Project',
                component: ProjectForm
            },
            {
                path: ':id',
                name: 'Edit Project',
                component: ProjectForm,
                props: true
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;