import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import Cookies from "js-cookie";

// 从 Cookie 中获取 authorized-token
const authorizedToken = Cookies.get("authorized-token");
// 不同意驳回
export const NoRejectReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("post", baseUrlApi("status/noreject"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 不同意风险已被处置
export const NoRepairReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("post", baseUrlApi("status/norepair"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 同意驳回
export const ToRejectReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("post", baseUrlApi("status/toreject"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 确认风险已被处置
export const verifyrepairReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("post", baseUrlApi("status/repair"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 确认风险存在
export const verificationReport = (reportId: number) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("get", baseUrlApi(`status/confirmation?id=${reportId}`), {
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 驳回
export const rejectReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("post", baseUrlApi("status/reject"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 确认修复
export const verifyReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request("post", baseUrlApi("status/verify"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
