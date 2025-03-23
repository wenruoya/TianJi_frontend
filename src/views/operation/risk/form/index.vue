<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    riskName: "",
    repairPeriod: ""
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
        <el-form-item label="风险定义" prop="riskName">
          <el-input
            v-model="newFormInline.riskName"
            clearable
            placeholder="请输入风险名"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="修复期限(小时)" prop="repairPeriod">
          <el-input
            v-model="newFormInline.repairPeriod"
            clearable
            placeholder="请输入修复期限"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
