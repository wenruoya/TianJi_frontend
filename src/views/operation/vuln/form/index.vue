<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    vulnerabilityType: "",
    vulnerabilitySuggest: ""
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="漏洞类型" prop="vulnerabilityType">
          <el-input
            v-model="newFormInline.vulnerabilityType"
            clearable
            placeholder="请输入漏洞类型"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="修复方案" prop="vulnerabilitySuggest">
          <el-input
            v-model="newFormInline.vulnerabilitySuggest"
            clearable
            placeholder="请输入修复方案"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
