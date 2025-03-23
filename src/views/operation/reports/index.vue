<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useDetail } from "../report/hooks";
import Upload from "@iconify-icons/ri/upload-line";
import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
const { toDetail, router } = useDetail();
const treeRef = ref();
const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  selectedNum,
  pagination,
  statusOptions,
  buttonClass,
  deviceDetection,
  onSearch,
  resetForm,
  onbatchDel,
  handleUpdate,
  handleDelete,
  handleReset,
  handleRole,
  handleSizeChange,
  onSelectionCancel,
  handleCurrentChange,
  handleSelectionChange
} = useUser(tableRef);
</script>

<template>
  <div :class="['flex', 'justify-between', deviceDetection() && 'flex-wrap']">
    <div
      :class="[deviceDetection() ? ['w-full', 'mt-2'] : 'w-[calc(100%-10px)]']"
    >
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="search-form bg-bg_color w-[10/100] pl-8 pt-[12px] overflow-auto"
      >
        <el-form-item label="工单名" prop="reportName">
          <el-input
            v-model="form.reportName"
            placeholder="请输入工单名"
            clearable
            class="!w-[200px]"
          />
        </el-form-item>
        <el-form-item label="工单状态" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择工单状态"
            clearable
            class="!w-[180px]"
          >
            <el-option label="待确认风险" value="100" />
            <el-option label="已确认风险" value="101" />
            <el-option label="待处理风险" value="102" />
            <el-option label="待确认处理结果" value="103" />
            <el-option label="驳回风险" value="104" />
            <el-option label="已处理" value="200" />
            <el-option label="已驳回" value="201" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险" prop="riskId">
          <el-select
            v-model="form.riskId"
            placeholder="请选择工单风险"
            clearable
            class="!w-[180px]"
          >
            <el-option
              v-for="option in statusOptions.data"
              :key="option.riskId"
              :label="option.riskName"
              :value="option.riskId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="修复期限" prop="period">
          <el-select
            v-model="form.period"
            placeholder="请选择状态"
            clearable
            class="!w-[180px]"
          >
            <el-option label="已超期" value="2" />
            <el-option label="即将超期" value="1" />
            <el-option label="未超期" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon('ri:search-line')"
            :loading="loading"
            @click="onSearch"
          >
            搜索
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm">
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <PureTableBar title="工单池" :columns="columns" @refresh="onSearch">
        <template v-slot="{ size, dynamicColumns }">
          <div
            v-if="selectedNum > 0"
            v-motion-fade
            class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center"
          >
            <div class="flex-auto">
              <span
                style="font-size: var(--el-font-size-base)"
                class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
              >
                已选 {{ selectedNum }} 项
              </span>
              <el-button type="primary" text @click="onSelectionCancel">
                取消选择
              </el-button>
            </div>
            <el-popconfirm title="是否确认删除?" @confirm="onbatchDel">
              <template #reference>
                <el-button type="danger" text class="mr-1">
                  批量删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
          <pure-table
            ref="tableRef"
            row-key="reportId"
            adaptive
            :adaptiveConfig="{ offsetBottom: 108 }"
            align-whole="center"
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataList"
            :columns="dynamicColumns"
            :pagination="{ ...pagination, size }"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="toDetail({ id: row.reportId }, 'query')"
              >
                查看详情
              </el-button>
              <el-popconfirm
                :title="`是否确认删除工单为${row.reportId}的这条数据`"
                @confirm="handleDelete(row)"
              >
                <!-- <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template> -->
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

:deep(.el-button:focus-visible) {
  outline: none;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
