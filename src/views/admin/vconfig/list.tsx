import Base from "./base/base.vue";

const rendContent = (val: string) =>
  `代码位置: src/views/schema-form/form/${val}.vue`;

export const list = [
  {
    key: "base",
    content: rendContent("base"),
    title: "通知配置",
    component: Base
  }
];
