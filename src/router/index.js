import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/myHome'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: '/myHome',
                name: 'myHome',
                meta: {
                    title: '我的首页'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/myhome.vue')
            },
           {
                path: "/booksTable",
                name: "basetable",
                meta: {
                    title: '图书列表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            },
            {
                path: "/userTable",
                name: "userTable",
                meta: {
                    title: '用户列表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/userTable.vue")
            },
            {
                path: "/classifyTable",
                name: "classifyTable",
                meta: {
                    title: '图书分类'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/classifyTable.vue")
            },
            {
                path: "/borrowingTable",
                name: "borrowingTable",
                meta: {
                    title: '借阅记录'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/borrowingTable.vue")
            },{
                path: "/adminTable",
                name: "adminTable",
                meta: {
                    title: '管理员列表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/adminTable.vue")
            },{
                path: "/authoritySetting",
                name: "authoritySetting",
                meta: {
                    title: '权限设置'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/authoritySetting.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/admin_login.vue")
    },{
        path: "/register",
        name: "Register",
        meta: {
            title: '注册'
        },
        component: () => import ( /* webpackChunkName: "register" */ "../views/register.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('user_name');
    // let token = sessionStorage.getItem('token')
    console.log(role)
    if (!role && to.path !== '/login' && to.path !== '/register') {
        next('/login');
    }else {
        next();
    }
});

export default router;