import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  riskName: [{ required: true, message: "风险类型为必填项", trigger: "blur" }],
  repairPeriod: [
    { required: true, message: "修复期限为必填项", trigger: "blur" },
    {
      pattern: /^\d+$/,
      message: "修复期限必须为数字",
      trigger: "blur"
    }
  ]
});
