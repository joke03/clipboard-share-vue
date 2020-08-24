import Vue from 'vue'
import Router from 'vue-router'
import ClipTable from "../view/ClipTable";

Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/',
            name: 'ClipTable',
            redirect: '/home',
            component: ClipTable,
        },
        {
            path:'/home',
            component: ClipTable,
            name: 'ClipTable',
        },

    ]
})
