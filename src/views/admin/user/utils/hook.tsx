import "./reset.css";
import dayjs from "dayjs";
import roleForm from "../form/role.vue";
import editForm from "../form/index.vue";
import { zxcvbn } from "@zxcvbn-ts/core";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
// // import userAvatar from "@/assets/user.jpg";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import ReCropperPreview from "@/components/ReCropperPreview";
import type { FormItemProps, RoleFormItemProps } from "../utils/types";
import {
  getKeyList,
  isAllEmpty,
  hideTextAtIndex,
  deviceDetection
} from "@pureadmin/utils";
import { getUser, addUser, delUser, restpassword } from "@/api/admin";
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElProgress,
  ElMessageBox
} from "element-plus";
import {
  type Ref,
  h,
  ref,
  toRaw,
  watch,
  computed,
  reactive,
  onMounted
} from "vue";
// import { number } from "echarts";

export function useUser(tableRef: Ref) {
  const form = reactive({
    page: "1",
    pageSize: "10",
    name: "",
    userNumber: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  // 上传头像信息
  // const avatarInfo = ref();
  // const switchLoadMap = ref({});
  // const { switchStyle } = usePublicHooks();
  const higherDeptOptions = ref();
  const treeData = ref([]);
  const treeLoading = ref(true);
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "用户编号",
      prop: "userId",
      width: 90
    },
    {
      label: "姓名",
      prop: "name",
      minWidth: 130
    },
    {
      label: "工号",
      prop: "userNumber",
      minWidth: 130
    },
    {
      label: "用户名",
      prop: "username",
      minWidth: 130
    },
    {
      label: "角色",
      prop: "roles",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.role === 1 ? "info" : row.role === 2 ? "danger" : "success"}
          effect="plain"
        >
          {row.role === 1
            ? "运营工程师"
            : row.role === 2
              ? "安全工程师"
              : "开发工程师"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 300,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  // 重置的新密码
  const pwdForm = reactive({
    newPwd: ""
  });
  // const pwdProgress = [
  //   { color: "#e74242", text: "非常弱" },
  //   { color: "#EFBD47", text: "弱" },
  //   { color: "#ffa500", text: "一般" },
  //   { color: "#1bbf1b", text: "强" },
  //   { color: "#008000", text: "非常强" }
  // ];
  // 当前密码强度（0-4）
  const curScore = ref();
  const roleOptions = ref([]);

  function handleUpdate(row) {
    console.log(row);
  }
  // 删除
  function handleDelete(row) {
    // message(`您删除了用户编号为${row.userId}的这条数据`, { type: "success" });
    delUser({ ids: row.userId });
    onSearch();
  }
  /**修改pageSize */
  function handleSizeChange(val: number) {
    form.pageSize = val.toString();
    onSearch();
    // console.log(`${val} items per page`);
  }
  /** 翻页 */
  function handleCurrentChange(val: number) {
    form.page = val.toString();
    onSearch();
    // console.log(`current page: ${val}`);
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    console.log(curSelected);
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    delUser({ ids: getKeyList(curSelected, "userId") });
    // message(`已删除用户编号为 ${getKeyList(curSelected, "userId")} 的数据`, {
    //   type: "success"
    // });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  async function resetForm() {
    form.name = "";
    form.userNumber = "";
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getUser(toRaw(form));
    dataList.value = data.records;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          name: row?.name ?? "",
          username: row?.username ?? "",
          userNumber: row?.userNumber ?? "",
          role: row?.roles ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了用户名称为${curData.username}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addUser(curData);
              onSearch();
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  watch(
    pwdForm,
    ({ newPwd }) =>
      (curScore.value = isAllEmpty(newPwd) ? -1 : zxcvbn(newPwd).score)
  );

  /** 重置密码 */
  function handleReset(row) {
    // console.log(row.userId);
    restpassword(row.userId);
    message(`已成功重置 ${row.username} 用户的密码`, {
      type: "success"
    });
  }

  /** 分配角色 */
  async function handleRole(row) {
    // 选中的角色列表
    const ids = (await getRoleIds({ userId: row.id })).data ?? [];
    addDialog({
      title: `分配 ${row.username} 用户的角色`,
      props: {
        formInline: {
          username: row?.username ?? "",
          nickname: row?.nickname ?? "",
          roleOptions: roleOptions.value ?? [],
          ids
        }
      },
      width: "400px",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(roleForm),
      beforeSure: (done, { options }) => {
        const curData = options.props.formInline as RoleFormItemProps;
        console.log("curIds", curData.ids);
        // 根据实际业务使用curData.ids和row里的某些字段去调用修改角色接口即可
        done(); // 关闭弹框
      }
    });
  }

  onMounted(async () => {
    treeLoading.value = true;
    onSearch();

    // 归属部门
    const { data } = await getDeptList();
    higherDeptOptions.value = handleTree(data);
    treeData.value = handleTree(data);
    treeLoading.value = false;

    // 角色列表
    roleOptions.value = (await getAllRoleList()).data;
  });

  return {
    form,
    loading,
    columns,
    dataList,
    treeData,
    treeLoading,
    selectedNum,
    pagination,
    buttonClass,
    deviceDetection,
    onSearch,
    onbatchDel,
    openDialog,
    resetForm,
    handleUpdate,
    handleDelete,
    handleReset,
    handleRole,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
