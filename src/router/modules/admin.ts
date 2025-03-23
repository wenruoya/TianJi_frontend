export default {
  path: "/admin",
  name: "Admin",
  redirect: "/admin/user",
  meta: {
    icon: "ri:settings-3-line",
    title: "通用配置",
    rank: 11
  },
  children: [
    {
      path: "/admin/user",
      name: "user",
      component: () => import("@/views/admin/user/index.vue"),
      meta: {
        title: "用户管理",
        showLink: true,
        roles: ["admin"]
      }
    },
    {
      path: "/admin/config",
      name: "config",
      component: () => import("@/views/admin/vconfig/index.vue"),
      meta: {
        title: "通知配置",
        showLink: true,
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
