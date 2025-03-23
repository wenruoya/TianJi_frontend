<script setup lang="ts">
import { onMounted, ref } from "vue";
// https://plus-pro-components.com/components/form.html
import "plus-pro-components/es/components/form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";
import { getNotification, addNotification } from "@/api/admin";
import { string } from "vue-types";
const state = ref<FieldValues>({
  status: "1",
  name: "",
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  endTime: []
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
    label: "名称",
    width: 120,
    prop: "name",
    valueType: "copy"
  },
  {
    label: "配置",
    prop: "desc",
    valueType: "textarea",
    fieldProps: {
      maxlength: 500,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 }
    }
  }
];

onMounted(async () => {
  const response = await getNotification();
  state.value = {
    ...state.value, // 保留原有字段
    name: response.data.notificationName, // 动态赋值
    desc: response.data.notificationContent
  };
});
const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, "change");
};
const handleSubmit = (values: FieldValues) => {
  addNotification(values.name, values.desc);
  console.log(values, "Submit");
};
const handleSubmitError = (err: any) => {
  console.log(err, "err");
};
const handleReset = () => {
  console.log("handleReset");
};
</script>

<template>
  <PlusForm
    v-model="state"
    class="w-[450px] m-auto"
    :columns="columns"
    :rules="rules"
    label-position="right"
    @change="handleChange"
    @submit="handleSubmit"
    @submit-error="handleSubmitError"
    @reset="handleReset"
  />
</template>
