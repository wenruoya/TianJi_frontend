import { $t } from "@/plugins/i18n";

export default {
  path: "/error",
  redirect: "/error/403",
  meta: {
    icon: "ri:information-line",
    // showLink: false,
    title: $t("menus.pureAbnormal"),
    rank: 2
  },
  children: [
    {
      path: "/error/403",
      name: "403",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: $t("menus.pureFourZeroOne"),
        // 是否显示该菜单
        showLink: false,
        // 是否显示父级菜单
        showParent: false
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: $t("menus.pureFourZeroFour"),
        // 是否显示该菜单
        showLink: false,
        // 是否显示父级菜单
        showParent: false
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.pureFive"),
        // 是否显示该菜单
        showLink: false,
        // 是否显示父级菜单
        showParent: false
      }
    }
  ]
} satisfies RouteConfigsTable;
