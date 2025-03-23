import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  secId: [{ required: true, message: "安全工程师为必填项", trigger: "blur" }],
  devId: [{ required: true, message: "开发工程师为必填项", trigger: "blur" }]
});
