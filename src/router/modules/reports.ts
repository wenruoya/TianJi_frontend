export default {
  path: "/reports",
  name: "Reports",
  redirect: "/reports/reports",
  meta: {
    icon: "ri:settings-3-line",
    title: "风险处置",
    rank: 13
  },
  children: [
    {
      path: "/reports/reports",
      name: "deals",
      component: () => import("@/views/operation/reports/index.vue"),
      meta: {
        title: "工单池",
        showLink: true,
        roles: ["operation"]
      }
    },
    {
      path: "/reports/detail",
      name: "detail",
      component: () => import("@/views/operation/report/index.vue"),
      meta: {
        title: "工单详情",
        showLink: false,
        roles: ["operation"]
      }
    }
  ]
} satisfies RouteConfigsTable;
