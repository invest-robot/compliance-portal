// 企业合规门户 - 三大业务手册数据配置

export type TBizType = 'opc' | 'digital-employee' | 'data-analysis';

export interface ITocItem {
  id: string;
  title: string;
  children?: ITocItem[];
  anchor: string;
}

export interface IBizConfig {
  bizType: TBizType;
  name: string;
  description: string;
  icon: string;
  toc: ITocItem[];
  content: Record<string, string>;
}

// OPC一人公司合规运营手册
const opcToc: ITocItem[] = [
  {
    id: 'opc-1',
    title: 'OPC一人公司注册',
    anchor: 'opc-chapter-1',
    children: [
      { id: 'opc-1-1', title: '什么是OPC一人股份有限公司', anchor: 'opc-1-1' },
      { id: 'opc-1-2', title: 'OPC vs 传统公司 vs 个体工商户', anchor: 'opc-1-2' },
      { id: 'opc-1-3', title: 'OPC注册条件与流程', anchor: 'opc-1-3' },
      { id: 'opc-1-4', title: 'OPC注册后的必办事项清单', anchor: 'opc-1-4' },
      { id: 'opc-1-5', title: 'OPC命名与经营范围规范', anchor: 'opc-1-5' },
    ],
  },
  {
    id: 'opc-2',
    title: 'OPC日常运营',
    anchor: 'opc-chapter-2',
    children: [
      { id: 'opc-2-1', title: 'OPC公司法定义务一览表', anchor: 'opc-2-1' },
      { id: 'opc-2-2', title: '记账报税重要节点合规', anchor: 'opc-2-2' },
      { id: 'opc-2-3', title: '发票管理规范', anchor: 'opc-2-3' },
      { id: 'opc-2-4', title: '银行账户管理规范', anchor: 'opc-2-4' },
      { id: 'opc-2-5', title: '合同管理规范', anchor: 'opc-2-5' },
      { id: 'opc-2-6', title: '知识产权保护', anchor: 'opc-2-6' },
      { id: 'opc-2-7', title: '年度工商报告与审计要求', anchor: 'opc-2-7' },
      { id: 'opc-2-8', title: '合规运营季度自查清单', anchor: 'opc-2-8' },
    ],
  },
  {
    id: 'opc-3',
    title: 'OPC劳动人事与社保',
    anchor: 'opc-chapter-3',
    children: [
      { id: 'opc-3-1', title: 'OPC能否雇佣员工', anchor: 'opc-3-1' },
      { id: 'opc-3-2', title: '员工劳动合同签订要点', anchor: 'opc-3-2' },
      { id: 'opc-3-3', title: '社保开户与缴纳规范', anchor: 'opc-3-3' },
      { id: 'opc-3-4', title: '实习、兼职、外包的合规处理', anchor: 'opc-3-4' },
      { id: 'opc-3-5', title: '老板自身社保问题', anchor: 'opc-3-5' },
    ],
  },
  {
    id: 'opc-4',
    title: '税务合规与财务风控',
    anchor: 'opc-chapter-4',
    children: [
      { id: 'opc-4-1', title: '小规模纳税人 vs 一般纳税人', anchor: 'opc-4-1' },
      { id: 'opc-4-2', title: '主要税种说明', anchor: 'opc-4-2' },
      { id: 'opc-4-3', title: '创业税收优惠汇总', anchor: 'opc-4-3' },
      { id: 'opc-4-4', title: '税务申报时间节点表', anchor: 'opc-4-4' },
      { id: 'opc-4-5', title: '常见税务风险与规避方法', anchor: 'opc-4-5' },
      { id: 'opc-4-6', title: '成本票据合规要求', anchor: 'opc-4-6' },
      { id: 'opc-4-7', title: '金税四期大数据监管合规要点', anchor: 'opc-4-7' },
    ],
  },
  {
    id: 'opc-5',
    title: 'AI工具合规指南',
    anchor: 'opc-chapter-5',
    children: [
      { id: 'opc-5-1', title: 'AI工具使用场景与合规边界', anchor: 'opc-5-1' },
      { id: 'opc-5-2', title: 'AI营销自动化的合规要求', anchor: 'opc-5-2' },
      { id: 'opc-5-3', title: 'AI财务智能体使用规范', anchor: 'opc-5-3' },
      { id: 'opc-5-4', title: '龙虾（OpenClaw）系统数据安全规范', anchor: 'opc-5-4' },
      { id: 'opc-5-5', title: 'AI生成内容（AIGC）的合规标注要求', anchor: 'opc-5-5' },
      { id: 'opc-5-6', title: '个人信息保护法对AI工具的限制', anchor: 'opc-5-6' },
      { id: 'opc-5-7', title: 'AI工具采购与供应商合规审查', anchor: 'opc-5-7' },
      { id: 'opc-5-8', title: '企业AI治理框架建议', anchor: 'opc-5-8' },
    ],
  },
  {
    id: 'opc-6',
    title: '政策补贴与政府关系',
    anchor: 'opc-chapter-6',
    children: [
      { id: 'opc-6-1', title: '深圳/龙岗OPC企业可申请的主要补贴', anchor: 'opc-6-1' },
      { id: 'opc-6-2', title: '补贴申请合规注意事项', anchor: 'opc-6-2' },
      { id: 'opc-6-3', title: '与政府监管部门的沟通规范', anchor: 'opc-6-3' },
      { id: 'opc-6-4', title: '行业资质许可办理指引', anchor: 'opc-6-4' },
      { id: 'opc-6-5', title: '合规享受政策红利的建议', anchor: 'opc-6-5' },
    ],
  },
  {
    id: 'opc-appendix',
    title: '附录',
    anchor: 'opc-appendix',
    children: [
      { id: 'opc-appendix-a', title: 'OPC企业合规运营年度日历', anchor: 'opc-appendix-a' },
      { id: 'opc-appendix-b', title: 'OPC合规自查打分表', anchor: 'opc-appendix-b' },
      { id: 'opc-appendix-c', title: '常用政府官网与政策查询渠道', anchor: 'opc-appendix-c' },
    ],
  },
];

// 企业数字员工合规运营手册
const digitalEmployeeToc: ITocItem[] = [
  {
    id: 'de-1',
    title: '数字智能体概述',
    anchor: 'de-chapter-1',
    children: [
      { id: 'de-1-1', title: '什么是数字员工', anchor: 'de-1-1' },
      { id: 'de-1-2', title: '四大核心数字员工角色', anchor: 'de-1-2' },
      { id: 'de-1-3', title: '数字员工与人类员工的协作模式', anchor: 'de-1-3' },
    ],
  },
  {
    id: 'de-2',
    title: '财务数字员工合规',
    anchor: 'de-chapter-2',
    children: [
      { id: 'de-2-1', title: '适用场景与权限边界', anchor: 'de-2-1' },
      { id: 'de-2-2', title: '数据安全合规', anchor: 'de-2-2' },
      { id: 'de-2-3', title: '财务AI使用合规清单', anchor: 'de-2-3' },
      { id: 'de-2-4', title: '算法决策责任界定', anchor: 'de-2-4' },
    ],
  },
  {
    id: 'de-3',
    title: '人事数字员工合规',
    anchor: 'de-chapter-3',
    children: [
      { id: 'de-3-1', title: '招聘场景的合规要求', anchor: 'de-3-1' },
      { id: 'de-3-2', title: '员工数据保护', anchor: 'de-3-2' },
      { id: 'de-3-3', title: '考勤与排班AI合规', anchor: 'de-3-3' },
      { id: 'de-3-4', title: '人事AI合规自查清单', anchor: 'de-3-4' },
    ],
  },
  {
    id: 'de-4',
    title: '法务数字员工合规',
    anchor: 'de-chapter-4',
    children: [
      { id: 'de-4-1', title: '合同审核AI的使用规范', anchor: 'de-4-1' },
      { id: 'de-4-2', title: '法律研究AI的边界', anchor: 'de-4-2' },
      { id: 'de-4-3', title: '合规审查AI的制度保障', anchor: 'de-4-3' },
      { id: 'de-4-4', title: '法务AI输出质量评估', anchor: 'de-4-4' },
    ],
  },
  {
    id: 'de-5',
    title: '市场数字员工合规',
    anchor: 'de-chapter-5',
    children: [
      { id: 'de-5-1', title: 'AI营销内容合规红线', anchor: 'de-5-1' },
      { id: 'de-5-2', title: 'AI客户画像与数据分析合规', anchor: 'de-5-2' },
      { id: 'de-5-3', title: 'AI市场调研与竞品分析', anchor: 'de-5-3' },
      { id: 'de-5-4', title: '市场AI合规运营矩阵', anchor: 'de-5-4' },
    ],
  },
  {
    id: 'de-6',
    title: '数字员工整体治理框架',
    anchor: 'de-chapter-6',
    children: [
      { id: 'de-6-1', title: '数字员工治理架构建议', anchor: 'de-6-1' },
      { id: 'de-6-2', title: '数字员工绩效评估', anchor: 'de-6-2' },
      { id: 'de-6-3', title: '数字员工培训体系', anchor: 'de-6-3' },
    ],
  },
];

// 数据分析业务运营合规手册
const dataAnalysisToc: ITocItem[] = [
  {
    id: 'da-1',
    title: '数据分析业务概述',
    anchor: 'da-chapter-1',
    children: [
      { id: 'da-1-1', title: '数据分析业务定义', anchor: 'da-1-1' },
      { id: 'da-1-2', title: '常见业务模式', anchor: 'da-1-2' },
    ],
  },
  {
    id: 'da-2',
    title: '数据来源合规',
    anchor: 'da-chapter-2',
    children: [
      { id: 'da-2-1', title: '合法数据来源认定', anchor: 'da-2-1' },
      { id: 'da-2-2', title: '数据采购合规审查', anchor: 'da-2-2' },
      { id: 'da-2-3', title: '用户授权合规要求', anchor: 'da-2-3' },
    ],
  },
  {
    id: 'da-3',
    title: '数据接口服务合规',
    anchor: 'da-chapter-3',
    children: [
      { id: 'da-3-1', title: 'API接口安全合规', anchor: 'da-3-1' },
      { id: 'da-3-2', title: '接口数据合规审查清单', anchor: 'da-3-2' },
      { id: 'da-3-3', title: '第三方数据接口使用规范', anchor: 'da-3-3' },
    ],
  },
  {
    id: 'da-4',
    title: '数据训练服务合规',
    anchor: 'da-chapter-4',
    children: [
      { id: 'da-4-1', title: '训练数据来源合规', anchor: 'da-4-1' },
      { id: 'da-4-2', title: '数据标注合规要求', anchor: 'da-4-2' },
      { id: 'da-4-3', title: '数据训练合规自查清单', anchor: 'da-4-3' },
      { id: 'da-4-4', title: '个人信息保护影响评估（PIA）', anchor: 'da-4-4' },
    ],
  },
  {
    id: 'da-5',
    title: '数据安全技术合规',
    anchor: 'da-chapter-5',
    children: [
      { id: 'da-5-1', title: '数据分级分类标准', anchor: 'da-5-1' },
      { id: 'da-5-2', title: '技术安全措施要求', anchor: 'da-5-2' },
      { id: 'da-5-3', title: '数据备份与销毁规范', anchor: 'da-5-3' },
    ],
  },
  {
    id: 'da-6',
    title: '数据业务合规管理体系',
    anchor: 'da-chapter-6',
    children: [
      { id: 'da-6-1', title: '组织架构建议', anchor: 'da-6-1' },
      { id: 'da-6-2', title: '数据合规制度体系', anchor: 'da-6-2' },
      { id: 'da-6-3', title: '数据合规年度审计清单', anchor: 'da-6-3' },
      { id: 'da-6-4', title: '数据合规培训计划', anchor: 'da-6-4' },
    ],
  },
  {
    id: 'da-appendix',
    title: '合规运营工具模板',
    anchor: 'da-appendix',
    children: [
      { id: 'da-appendix-a', title: '数字员工使用申请表', anchor: 'da-appendix-a' },
      { id: 'da-appendix-b', title: '数据训练项目合规审查表', anchor: 'da-appendix-b' },
    ],
  },
];

export const bizConfigs: IBizConfig[] = [
  {
    bizType: 'opc',
    name: 'OPC公司',
    description: '一人股份有限公司合规运营全流程指南，涵盖注册、税务、人事、AI工具使用及政策补贴',
    icon: 'Building2',
    toc: opcToc,
    content: {},
  },
  {
    bizType: 'digital-employee',
    name: 'AI数字员工',
    description: '财务、人事、法务、市场四大数字员工角色的合规运营规范与治理框架',
    icon: 'Bot',
    toc: digitalEmployeeToc,
    content: {},
  },
  {
    bizType: 'data-analysis',
    name: '数据分析',
    description: '数据收集、接口服务、模型训练、安全防护等全链路数据业务合规管理体系',
    icon: 'BarChart3',
    toc: dataAnalysisToc,
    content: {},
  },
];

export function getBizConfig(bizType: TBizType): IBizConfig | undefined {
  return bizConfigs.find((config) => config.bizType === bizType);
}

export function getAllTocItems(bizType: TBizType): ITocItem[] {
  const config = getBizConfig(bizType);
  if (!config) return [];
  return config.toc;
}

export function flattenTocItems(items: ITocItem[]): ITocItem[] {
  const result: ITocItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children) {
      result.push(...flattenTocItems(item.children));
    }
  }
  return result;
}
