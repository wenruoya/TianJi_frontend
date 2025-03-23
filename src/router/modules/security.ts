export default {
  path: "/report",
  name: "Risk_deal",
  redirect: "/report/create",
  meta: {
    icon: "ri:settings-3-line",
    title: "风险处置",
    rank: 13
  },
  children: [
    {
      path: "/report/create",
      name: "create",
      component: () => import("@/views/security/create/index.vue"),
      meta: {
        title: "创建工单",
        showLink: true,
        roles: ["security"]
      }
    },
    {
      path: "/report/deal",
      name: "deal",
      component: () => import("@/views/security/deal/index.vue"),
      meta: {
        title: "工单处置",
        showLink: true,
        roles: ["security"]
      }
    },
    {
      path: "/report/secdetail",
      name: "secdetail",
      component: () => import("@/views/security/report/index.vue"),
      meta: {
        title: "工单详情",
        showLink: false,
        roles: ["security"]
      }
    }
  ]
} satisfies RouteConfigsTable;
