import { createRouter, createWebHistory } from 'vue-router'
import DashBoardComponent from './components/DashBoardComponent.vue'
import EmployeeComponent from './components/EmployeeComponent.vue'
import DepartmentComponent from './components/DepartmentComponent.vue'
import CustomFieldForm from './components/CustomFieldForm.vue'

const routes = [{
        path: '/',
        name: 'DashBoardComponent',
        component: DashBoardComponent
    },
    {
        path: '/Departments',
        name: 'Departments',
        component: DepartmentComponent
    },
    {
        path: '/Employees',
        name: 'Employees',
        component: EmployeeComponent
    },
    {
        path: '/CustomFieldForm',
        name: 'CustomFieldForm',
        component: CustomFieldForm
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router