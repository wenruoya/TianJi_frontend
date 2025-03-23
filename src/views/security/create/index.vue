<script setup lang="ts">
import { onMounted, ref } from "vue";
import "plus-pro-components/es/components/form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";
import {
  getRiskStatusOptions,
  getVulnStatusOptions,
  addReport
} from "@/api/report";
import Vditor from "./edit/Vditor.vue";

const vulnOptions = ref<{ label: string; value: string }[]>([]);
const riskOptions = ref<{ label: string; value: string }[]>([]);

const state = ref<FieldValues>({
  name: "",
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  endTime: [],
  markdownContent: ""
});

const rules = {
  name: [
    {
      required: true,
      message: "请输入名称"
    }
  ]
};

const columns: PlusColumn[] = [
  {
    label: "风险名称",
    width: 120,
    prop: "reportName",
    valueType: "copy"
  },
  {
    label: "涉及域名",
    width: 120,
    prop: "reportUrl",
    valueType: "copy"
  },
  {
    label: "涉及应用",
    width: 120,
    prop: "reportApp",
    valueType: "copy"
  },
  {
    label: "风险来源",
    width: 120,
    prop: "reportSource",
    valueType: "copy"
  },
  {
    label: "风险定义",
    width: 120,
    prop: "riskId",
    valueType: "select",
    options: riskOptions
  },
  {
    label: "漏洞类型",
    width: 120,
    prop: "vulnId",
    valueType: "select",
    options: vulnOptions
  }
];

const fetchVulnOptions = async () => {
  try {
    const riskResponse = await getRiskStatusOptions();
    const vulnResponse = await getVulnStatusOptions();
    vulnOptions.value = vulnResponse.data.map((item: any) => ({
      label: item.vulnerabilityType,
      value: item.vulnId
    }));
    riskOptions.value = riskResponse.data.map((item: any) => ({
      label: item.riskName,
      value: item.riskId
    }));
  } catch (error) {
    console.error("获取漏洞类型选项失败:", error);
  }
};

onMounted(async () => {
  await fetchVulnOptions();
  state.value.markdownContent = "风险详情写这里";
});

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, "change");
};

// 获取 Vditor 实例
const vditorRef = ref<InstanceType<typeof Vditor> | null>(null);

const handleSubmit = (values: FieldValues) => {
  if (!vditorRef.value) {
    console.error("Vditor 实例未初始化");
    return;
  }

  // 获取 Vditor 中的值
  const markdownContent = vditorRef.value.getValue();
  // console.log("Markdown 内容:", markdownContent);

  const newData = {
    reportName: "",
    reportUrl: "",
    reportApp: "",
    reportSource: "",
    riskId: 0,
    vulnId: 0,
    reportContent: ""
  };
  newData.reportName = values.reportName;
  newData.reportUrl = values.reportUrl;
  newData.reportApp = values.reportApp;
  newData.reportSource = values.reportSource;
  newData.riskId = values.riskId;
  newData.vulnId = values.vulnId;
  newData.reportContent = markdownContent;
  // 提交表单数据
  addReport({
    newData
  });
  console.log(values, "Submit");
  handleReset();
};

const handleSubmitError = (err: any) => {
  console.log(err, "err");
};

const handleReset = () => {
  console.log("handleReset");
};
</script>

<template>
  <el-card shadow="never" :body-style="{ height: 'calc(100vh - 170px)' }">
    <div class="flex-container">
      <!-- 左边表单 -->
      <div class="form-container">
        <PlusForm
          v-model="state"
          :columns="columns"
          :rules="rules"
          label-position="right"
          @change="handleChange"
          @submit="handleSubmit"
          @submit-error="handleSubmitError"
          @reset="handleReset"
        />
      </div>

      <!-- 右边 Markdown 编辑器 -->
      <div class="rich-text-container">
        漏洞详情
        <Vditor
          ref="vditorRef"
          v-model="state.markdownContent"
          :options="{
            height: 500, // 高度
            outline: { enable: true, position: 'right' } // 大纲
          }"
        />
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.flex-container {
  display: flex;
  gap: 100px; /* 左右容器之间的间距 */
  padding: 20px;
}

.form-container {
  flex: 1; /* 表单占据左边空间 */
  max-width: 450px; /* 限制表单宽度 */
  max-height: 500px;
}

.rich-text-container {
  flex: 1;
  max-width: 700px;
  max-height: 500px;
}
</style>
