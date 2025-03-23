export default {
  path: "/development",
  name: "Dev_deal",
  redirect: "/development/deal",
  meta: {
    icon: "ri:settings-3-line",
    title: "风险处置",
    rank: 14
  },
  children: [
    {
      path: "/development/deal",
      name: "development",
      component: () => import("@/views/development/deal/index.vue"),
      meta: {
        title: "工单处置",
        showLink: true,
        roles: ["development"]
      }
    },
    {
      path: "/development/devdetail",
      name: "devdetail",
      component: () => import("@/views/development/report/index.vue"),
      meta: {
        title: "工单详情",
        showLink: false,
        roles: ["development"]
      }
    }
  ]
} satisfies RouteConfigsTable;
