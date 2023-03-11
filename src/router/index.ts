import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/Layout/index.vue");

// 公共菜单
const routesList: RouteRecordRaw[] = [
  // 根路由
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
    meta: {
      title: "root",
    },
  },
  // 登录路由
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/public/login.vue"),
    meta: {
      title: "login",
    },
  },
];

// Layout  404
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PAGE_NOT_FOUND",
  component: Layout,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PAGE_NOT_FOUND_NAME",
      component: () => import("@/views/public/404.vue"),
      meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};
// Layout redirect
export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: "/redirect",
  component: Layout,
  name: "Redirect",
  meta: {
    title: "REDIRECT_NAME",
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: "REDIRECT_NAME",
      component: () => import("@/views/public/auth-redirect.vue"),
      meta: {
        title: "REDIRECT_NAME",
        hideBreadcrumb: true,
      },
    },
  ],
};

const routes = [...routesList, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE];

// app router
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, right: 0 }),
  routes,
});

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(routes);

/**
 * @description: 重置路由
 */
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
