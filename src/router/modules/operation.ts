export default {
  path: "/operation",
  name: "Operation",
  redirect: "/operation/user",
  meta: {
    icon: "ri:settings-3-line",
    title: "运营配置",
    rank: 12
  },
  children: [
    {
      path: "/operation/risk",
      name: "risk",
      component: () => import("@/views/operation/risk/index.vue"),
      meta: {
        title: "风险定义",
        showLink: true,
        roles: ["operation"]
      }
    },
    {
      path: "/operation/vuln",
      name: "vuln",
      component: () => import("@/views/operation/vuln/index.vue"),
      meta: {
        title: "漏洞类型",
        showLink: true,
        roles: ["operation"]
      }
    }
  ]
} satisfies RouteConfigsTable;
