import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import Cookies from "js-cookie";

export type UserResult = {
  success: boolean;
  data: {
    /** 昵称 */
    name: string;
    username: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
  };
};

// export type RefreshTokenResult = {
//   success: boolean;
//   data: {
//     /** `token` */
//     accessToken: string;
//     /** 用于调用刷新`accessToken`的接口时所需的`token` */
//     refreshToken: string;
//     /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
//     expires: Date;
//   };
// };

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("auth/login"), { data });
};
const authorizedToken = Cookies.get("authorized-token");
/** 修改密码 */
export const changePassword = (
  username: string,
  oldPassword: string,
  newPassword: string
) => {
  // 构造请求体
  const data = {
    username,
    oldPassword,
    newPassword
  };

  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("post", baseUrlApi("auth/change-password"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
