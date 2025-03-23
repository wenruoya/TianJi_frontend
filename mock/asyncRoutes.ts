// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

// const systemManagementRouter = {
//   path: "/system",
//   meta: {
//     icon: "ri:settings-3-line",
//     title: "menus.pureSysManagement",
//     rank: 5
//   },
//   children: [
//     {
//       path: "/system/user/index",
//       name: "SystemUser",
//       meta: {
//         icon: "ri:admin-line",
//         title: "menus.pureUser",
//         roles: ["admin"]
//       }
//     },
//     {
//       path: "/system/role/index",
//       name: "SystemRole",
//       meta: {
//         icon: "ri:admin-fill",
//         title: "menus.pureRole",
//         roles: ["admin"]
//       }
//     },
//     {
//       path: "/system/menu/index",
//       name: "SystemMenu",
//       meta: {
//         icon: "ep:menu",
//         title: "menus.pureSystemMenu",
//         roles: ["admin"]
//       }
//     },
//     {
//       path: "/system/dept/index",
//       name: "SystemDept",
//       meta: {
//         icon: "ri:git-branch-line",
//         title: "menus.pureDept",
//         roles: ["admin"]
//       }
//     }
//   ]
// };

export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: []
      };
    }
  }
]);
