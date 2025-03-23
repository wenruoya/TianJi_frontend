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

type ResultReportDetails = {
  success: boolean;
  data: {
    reportId?: number;
    reportName?: string;
    reportUrl?: string;
    reportApp?: string;
    reportContent?: string;
    reportSource?: string;
    status?: number;
    riskId?: number;
    riskName?: string;
    vulnId?: number;
    vulnerabilityType?: string;
    vulnerabilitySuggest?: string;
    secUserId?: number;
    secName?: string;
    devUserId?: number;
    devName?: string;
    reportPeriod?: string;
    remark?: string;
    feedback?: string;
    createTime?: string;
    createUser?: number;
  };
};

type ResultEvent = {
  success: boolean;
  data: {
    event: string;
    logTime: string;
  }[];
};

export type StatusOption = {
  success: boolean;
  data: {
    riskId: number;
    riskName: string;
  }[];
};

export type StatusOptionn = {
  success: boolean;
  data: {
    vulnId: number;
    vulnerabilityType: string;
  }[];
};

export type UserOptionn = {
  success: boolean;
  data: {
    userId: number;
    name: string;
  }[];
};

type UserResult = {
  success: boolean;
};

// 从 Cookie 中获取 authorized-token
const authorizedToken = Cookies.get("authorized-token");

export const verifyReport = (reportId: string, description: string) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("post", baseUrlApi("status/verify"), {
    data: {
      reportId,
      description
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
// 指派工单负责人
export const updateReportUser = (
  id: string | number,
  userId: number,
  reportId: string
) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("put", baseUrlApi(`report/User/${id}`), {
    data: {
      userId,
      reportId
    },
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 获取工单日志 */
export const getReportLog = (id: number) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<ResultEvent>("get", baseUrlApi("report/event"), {
    params: { id }, // 将 id 作为查询参数传递
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
/** 获取详细工单 */
export const getReportDetails = (id: number) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<ResultReportDetails>("get", baseUrlApi("report"), {
    params: { id }, // 将 id 作为查询参数传递
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
/**获取所有风险选项 */
export const getRiskStatusOptions = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<StatusOption[]>("get", baseUrlApi("report/Risk"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/**获取所有开发 */
export const getDevOptions = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserOptionn[]>("get", baseUrlApi("report/User/3"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/**获取所有安全 */
export const getSecOptions = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserOptionn[]>("get", baseUrlApi("report/User/2"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/**获取所有漏洞类型选项 */
export const getVulnStatusOptions = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<StatusOptionn[]>("get", baseUrlApi("report/Vuln"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 获取分页工单 */
export const getRoleReport = (data?: object) => {
  // 将 data 对象转换为查询参数字符串
  const queryParams = data
    ? `?${new URLSearchParams(data as Record<string, string>).toString()}`
    : "";
  return http.request<ResultTable>(
    "get",
    `${baseUrlApi("report/Opage")}${queryParams}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 获取分页工单 */
export const getReport = (data?: object) => {
  // 将 data 对象转换为查询参数字符串
  const queryParams = data
    ? `?${new URLSearchParams(data as Record<string, string>).toString()}`
    : "";
  return http.request<ResultTable>(
    "get",
    `${baseUrlApi("report/page")}${queryParams}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 新增工单 */
export const addReport = (data?: { newData?: object }) => {
  const { newData = {} } = data || {};
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("post", baseUrlApi("report"), {
    data: newData,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 删除工单 */
export const delReport = (data?: { ids: number[] | number }) => {
  let url = baseUrlApi("report");

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

/** 修改工单 */
export const reReport = (data: {
  vulnId: number;
  vulnerabilityType: string;
  vulnerabilitySuggest: string;
}) => {
  const { vulnId, ...requestData } = data;
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>(
    "put",
    baseUrlApi(`operation/vuln/${vulnId}`),
    {
      data: requestData,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 获取风险 */
export const getReportById = (data?: object) => {
  // 将 data 对象转换为查询参数字符串
  const queryParams = data
    ? `?${new URLSearchParams(data as Record<string, string>).toString()}`
    : "";
  return http.request<ResultTable>(
    "get",
    `${baseUrlApi("operation/risk/page")}${queryParams}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};
