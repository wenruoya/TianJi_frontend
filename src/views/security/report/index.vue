<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useWatermark } from "@pureadmin/utils";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";
import { addDialog, closeDialog } from "@/components/ReDialog";
import Vditor from "../../security/create/edit/Vditor.vue";
import {
  getReportDetails,
  getReportLog,
  getSecOptions,
  updateReportUser
} from "@/api/report";
import {
  verifyrepairReport,
  ToRejectReport,
  verificationReport,
  NoRepairReport,
  NoRejectReport
} from "@/api/status";
import { useDetail } from "./hooks";
import { p } from "node_modules/@faker-js/faker/dist/airline-BcEu2nRk";
import { ElMessage } from "element-plus";

defineOptions({
  name: "secdetail"
});
const local = ref();
const preventLocal = ref();
const color = ref("#409EFF");
const activeStep = ref();
const value = ref("vue-pure-admin");
const { setWatermark, clear } = useWatermark();
const { setWatermark: setLocalWatermark, clear: clearLocal } =
  useWatermark(local);
const { setWatermark: setPreventLocalWatermark } = useWatermark(preventLocal);
const { initToDetail, getParameter } = useDetail();
initToDetail("query");
const state = ref<FieldValues>({
  name: "",
  markdownContent: " " as string,
  reportName: "",
  reportUrl: "",
  reportApp: "",
  reportSource: ""
});

const userState = ref<FieldValues>({
  devName: ""
});

const devState = ref<FieldValues>({
  feedback: ""
});

onMounted(() => {
  fetchVulnOptions();
  setPreventLocalWatermark("保密", {
    forever: true,
    width: 180,
    height: 70
  });
});
const vditorRef = ref<InstanceType<typeof Vditor> | null>(null);
const secUserOptions = ref<{ userId: number; name: string }[]>([]);

const fetchVulnOptions = async () => {
  const secUseResponse = await getSecOptions();
  secUserOptions.value = secUseResponse.data.map((item: any) => ({
    label: item.name,
    value: item.userId
  }));
  const reportResponse = await getReportDetails(Number(getParameter.id));
  const eventResponse = await getReportLog(Number(getParameter.id));
  const reportData = reportResponse.data;
  state.value = {
    ...state.value,
    reportName: reportData.reportName,
    reportUrl: reportData.reportUrl,
    reportApp: reportData.reportApp,
    reportSource: reportData.reportSource,
    riskName: reportData.riskName,
    vulnerabilityType: reportData.vulnerabilityType,
    vulnerabilitySuggest: reportData.vulnerabilitySuggest,
    reportPeriod: reportData.reportPeriod,
    eventResponse: eventResponse.data,
    status: reportData.status,
    devName: reportData.devName,
    feedback: reportData.feedback
  };
  userState.value = {
    ...userState.value,
    secName: reportData.secName
  };
  vditorRef.value.setValue(reportData.reportContent);
  if (reportData.status == 100) {
    activeStep.value = 1;
  } else if (reportData.status == 101) {
    activeStep.value = 2;
  } else if (reportData.status == 102) {
    activeStep.value = 3;
  } else if (reportData.status == 103 || reportData.status == 104) {
    activeStep.value = 4;
  } else {
    activeStep.value = 5;
  }
};
const userColumns: PlusColumn[] = [
  {
    label: "转派",
    width: 120,
    hight: 10,
    prop: "secName",
    valueType: "select",
    options: secUserOptions
  }
];

const columns: PlusColumn[] = [
  {
    label: "风险名称",
    width: 120,
    hight: 10,
    prop: "reportName",
    valueType: "text"
  },
  {
    label: "涉及域名",
    width: 100,
    hight: 10,
    prop: "reportUrl",
    valueType: "text"
  },
  {
    label: "涉及应用",
    width: 100,
    prop: "reportApp",
    valueType: "text"
  },
  {
    label: "风险来源",
    width: 120,
    prop: "reportSource",
    valueType: "text"
  },
  {
    label: "风险定义",
    width: 120,
    prop: "riskName",
    valueType: "text"
  },
  {
    label: "漏洞类型",
    width: 120,
    prop: "vulnerabilityType",
    valueType: "text"
  },
  {
    label: "修复建议",
    width: 120,
    prop: "vulnerabilitySuggest",
    valueType: "text"
  },
  {
    label: "修复期限",
    width: 120,
    prop: "reportPeriod",
    valueType: "text"
  },
  {
    label: "开发工程师",
    width: 120,
    prop: "devName",
    valueType: "text"
  },
  {
    label: "反馈",
    width: 120,
    prop: "feedback",
    valueType: "text"
  }
];

function userSubmit(formData) {
  // 打印表单数据
  // console.log("Form Data:", formData);
  // updateReportUser(2, formData.secName, String(getParameter.id));
  updateReportUser(3, formData.devName, String(getParameter.id));
}
onBeforeUnmount(() => {
  // 在离开该页面时清除整页水印
  clear();
});
const inputValue = ref("");
const verification = () => {
  verificationReport(getParameter.id);
};

const verifyrepair = () => {
  if (inputValue.value.trim()) {
    verifyrepairReport(String(getParameter.id), inputValue.value);
  } else {
    ElMessage.warning("请输入内容");
  }
};

const toreject = () => {
  if (inputValue.value.trim()) {
    ToRejectReport(String(getParameter.id), inputValue.value);
  } else {
    ElMessage.warning("请输入内容");
  }
};
const noreject = () => {
  if (inputValue.value.trim()) {
    NoRejectReport(String(getParameter.id), inputValue.value);
  } else {
    ElMessage.warning("请输入内容");
  }
};
const norepair = () => {
  if (inputValue.value.trim()) {
    NoRepairReport(String(getParameter.id), inputValue.value);
  } else {
    ElMessage.warning("请输入内容");
  }
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="p-6 h-[80px] w-[90%] m-auto bg-[#fafafa] dark:bg-[#1d1d1d]">
        <el-steps :active="activeStep" class="custom-steps">
          <el-step title="风险录入" />
          <el-step title="待确认风险" />
          <el-step title="待处置风险" />
          <el-step v-if="state.status === 104" title="驳回验证" />
          <el-step v-else title="待确认处置结果" />
          <el-step v-if="state.status === 201" title="已驳回" />
          <el-step v-else title="已处置" />
        </el-steps>
      </div>
    </template>

    <div
      ref="preventLocal"
      class="w-7/8 h-[550px] border border-indigo-300 mt-3"
    >
      <div class="flex-container">
        <!-- 左边表单 -->
        <div class="left-container">
          <div class="form-container">
            <div v-for="column in columns" :key="column.prop" class="form-item">
              <span class="label">{{ column.label }}:</span>
              <span class="value">{{ state[column.prop] }}</span>
            </div>
          </div>
          <br />
          <PlusForm
            v-model="userState"
            :columns="userColumns"
            label-position="right"
            @submit="userSubmit"
          />
          <br />
          <el-button type="success" @click="verification">确认风险</el-button>
        </div>
        <!-- 中间 Markdown 编辑器 -->
        <div class="middle-container">
          <strong>漏洞详情: </strong>
          <Vditor
            ref="vditorRef"
            :options="{
              height: 400, // 高度
              outline: { enable: true, position: 'right' }, // 大纲
              toolbar: [] // 可选：隐藏工具栏
            }"
          />
        </div>
        <!-- 右边 日志 -->
        <div class="right-container">
          <el-card shadow="never">
            <div class="flex justify-between">
              <span class="text-md font-medium">工单日志</span>
            </div>
            <el-scrollbar max-height="504" class="mt-3">
              <el-timeline>
                <el-timeline-item
                  v-for="(item, index) in state.eventResponse"
                  :key="index"
                  center
                  placement="top"
                  :timestamp="item.logTime"
                >
                  <p class="text-text_color_regular text-sm">
                    {{ `${item.event} ` }}
                  </p>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </el-card>
        </div>
      </div>
    </div>
    <div v-if="state.status !== 101">
      备注:
      <el-input v-model="inputValue" placeholder="请输入内容" class="mb-2" />
      <el-button class="mr-2" type="danger" @click="noreject">不同意驳回</el-button>
      <el-button class="mr-2" type="success" @click="toreject">同意驳回</el-button>
      <el-button type="danger" @click="norepair">不同意修复</el-button>
      <el-button type="success" @click="verifyrepair">同意修复</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.flex-container {
  display: flex;
  gap: 20px; /* 左右容器之间的间距 */
  padding: 20px;
}

.left-container {
  flex: 1; /* 左边容器占据1份空间 */
  max-width: 30%; /* 限制左边容器宽度 */
}

.middle-container {
  flex: 2; /* 中间容器占据2份空间 */
  max-width: 50%; /* 限制中间容器宽度 */
}

.right-container {
  flex: 1; /* 右边容器占据1份空间 */
  max-width: 20%; /* 限制右边容器宽度 */
}

.custom-steps {
  transform: scale(0.8); /* 调整缩放比例 */
  transform-origin: left top; /* 设置缩放的原点 */
}

.custom-steps .el-step {
  font-size: 14px; /* 调整字体大小 */
  padding: 10px; /* 调整内边距 */
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.value {
  color: #606266;
}
</style>
