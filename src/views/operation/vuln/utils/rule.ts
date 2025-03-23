import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  vulnerabilityType: [
    { required: true, message: "漏洞类型为必填项", trigger: "blur" }
  ],
  vulnerabilitySuggest: [
    { required: true, message: "修复方案为必填项", trigger: "blur" }
  ]
});
