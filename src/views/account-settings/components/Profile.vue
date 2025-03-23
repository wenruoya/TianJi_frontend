<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
// import { formUpload } from "@/api/mock";
import { message } from "@/utils/message";
// import { type UserInfo, getMine } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import ReCropperPreview from "@/components/ReCropperPreview";
import { createFormData, deviceDetection } from "@pureadmin/utils";
import uploadLine from "@iconify-icons/ri/upload-line";
import { changePassword } from "@/api/user";

defineOptions({
  name: "Profile"
});

const cropperBlob = ref();
const cropRef = ref();
const uploadRef = ref();
const isShow = ref(false);
const userInfoFormRef = ref<FormInstance>();

const userInfos = reactive({
  name: "",
  newpassword: "",
  oldpassword: ""
});

const rules = reactive<FormRules<UserInfo>>({
  newpassword: [{ required: true, message: "密码必填", trigger: "blur" }],
  oldpassword: [{ required: true, message: "密码必填", trigger: "blur" }]
});

const handleClose = () => {
  cropRef.value.hidePopover();
  uploadRef.value.clearFiles();
  isShow.value = false;
};

const onCropper = ({ blob }) => (cropperBlob.value = blob);

// 更新信息
const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(userInfos);
      changePassword(
        userInfos["name"],
        userInfos["oldpassword"],
        userInfos["newpassword"]
      );
      message("更新信息成功", { type: "success" });
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 在组件挂载时解析 cookie
onMounted(() => {
  parseAuthorizedToken();
});
const parseAuthorizedToken = () => {
  const cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("authorized-token="));
  if (cookie) {
    const token = cookie.split("=")[1];
    try {
      const decodedToken = decodeURIComponent(token);
      const tokenData = JSON.parse(decodedToken);
      userInfos.name = tokenData.username;
      console.log(userInfos.name);
    } catch (error) {
      console.error("Failed to parse authorized-token", error);
    }
  }
};
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">个人信息</h3>
    <el-form
      ref="userInfoFormRef"
      label-position="top"
      :rules="rules"
      :model="userInfos"
    >
      <el-form-item v-show="false" label="用户名" prop="name">
        <el-tag v-model="userInfos.name" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input
          v-model="userInfos.newpassword"
          type="password"
          show-password
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input
          v-model="userInfos.oldpassword"
          type="password"
          show-password
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-button type="primary" @click="onSubmit(userInfoFormRef)">
        修改密码
      </el-button>
    </el-form>
  </div>
</template>
