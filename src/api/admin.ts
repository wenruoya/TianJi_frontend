import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import Cookies from "js-cookie";

type ResultTable = {
  success: boolean;
  data: {
    /** 列表数据 */
    records: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

type UserResult = {
  success: boolean;
};

type NotificationResult = {
  success: boolean;
  data: {
    notificationName: string;
    notificationContent: string;
  };
};

// 从 Cookie 中获取 authorized-token
const authorizedToken = Cookies.get("authorized-token");

/** 获取所有用户 */
export const getUser = (data?: object) => {
  // 将 data 对象转换为查询参数字符串
  const queryParams = data
    ? `?${new URLSearchParams(data as Record<string, string>).toString()}`
    : "";
  return http.request<ResultTable>(
    "get",
    `${baseUrlApi("admin/user/page")}${queryParams}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 新增用户 */
export const addUser = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("post", baseUrlApi("admin/user"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 删除用户 */
export const delUser = (data?: { ids: number[] | number }) => {
  let url = baseUrlApi("admin/user");

  // 处理查询参数
  if (data) {
    const ids = Array.isArray(data.ids) ? data.ids.join(",") : data.ids;
    url += `?ids=${ids}`;
  }

  return http.request<UserResult>("delete", url, {
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 重置密码 */
export const restpassword = (userId: number) => {
  let url = baseUrlApi("admin/user");
  url += `/${userId}`;
  // 处理查询参数
  return http.request<UserResult>("get", url, {
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 查询通知配置 */
export const getNotification = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<NotificationResult>(
    "get",
    baseUrlApi("admin/notification"),
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 修改通知配置 */
export const addNotification = (
  notificationName: string,
  notificationContent: string
) => {
  // 构造请求数据
  const data = {
    notificationName,
    notificationContent
  };
  // 发起请求，将 token 添加到请求头中
  return http.request<NotificationResult>(
    "post",
    baseUrlApi("admin/notification"),
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};
