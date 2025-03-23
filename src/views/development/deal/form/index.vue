<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    secId: "",
    devId: ""
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
        <el-form-item label="安全工程师" prop="secId">
          <el-select
            v-model="newFormInline.secId"
            placeholder="请选择安全工程师"
            clearable
            class="!w-[180px]"
          >
            <el-option
              v-for="option in SecOptions"
              :key="option.userId"
              :label="option.name"
              :value="option.userId"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="开发工程师" prop="devId">
          <el-select
            v-model="newFormInline.devId"
            placeholder="请选择开发工程师"
            clearable
            class="!w-[180px]"
          >
            <el-option
              v-for="option in DevOptions"
              :key="option.userId"
              :label="option.name"
              :value="option.userId"
            />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
