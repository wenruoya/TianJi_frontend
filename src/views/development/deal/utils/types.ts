interface FormItemProps {
  reportId: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  reportName: string;
  status: number;
  riskId: number;
  period: number;
}
interface FormProps {
  formInline: FormItemProps;
}

interface RoleFormItemProps {
  riskName: string;
  repairPeriod: number;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  ids: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps };
