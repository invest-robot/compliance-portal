import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpIcon } from 'lucide-react';
import {
  getBizConfig,
  flattenTocItems,
  type TBizType,
  type ITocItem,
} from '@shared/static/compliance-data';

const STORAGE_KEY = '__global_compliance_currentBiz';

function getCurrentBiz(): TBizType {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'opc' || stored === 'digital-employee' || stored === 'data-analysis') return stored;
  } catch {
    // ignore
  }
  return 'opc';
}

/* ── Content rendering helpers ── */

function TipBlock({ children, variant = 'info', className }: { children: React.ReactNode; variant?: 'info' | 'warning'; className?: string }) {
  const borderClass = variant === 'warning' ? 'border-amber-500' : 'border-primary';
  const bgClass = variant === 'warning' ? 'bg-amber-50' : 'bg-primary/5';
  return (
    <div className={`border-l-4 ${borderClass} ${bgClass} p-4 my-6 rounded-r-md ${className || ''}`}>
      {children}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="text-left font-semibold text-foreground border-b border-border px-4 py-3 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
              {row.map((cell, ci) => (
                <td key={ci} className="text-foreground/80 border-b border-border px-4 py-3 leading-relaxed whitespace-pre-line">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 my-4 text-foreground/80">
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed pl-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal list-inside space-y-2 my-4 text-foreground/80">
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed pl-2">
          {item}
        </li>
      ))}
    </ol>
  );
}

function SectionH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[22px] font-bold text-foreground mt-12 mb-4 pb-2 border-b border-border scroll-mt-20">
      {children}
    </h2>
  );
}

function SectionH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-[17px] font-semibold text-foreground mt-8 mb-3 scroll-mt-20">
      {children}
    </h3>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[15px] leading-[1.7] text-foreground/80 mb-4 ${className || ''}`}>{children}</p>;
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

/* ── OPC Content ── */

function OpcContent({ anchor }: { anchor: string }) {
  switch (anchor) {
    case 'opc-1-1':
      return (
        <>
          <SectionH2 id="opc-1-1">什么是OPC一人股份有限公司</SectionH2>
          <P>OPC（One Person Company，意为一人股份有限公司）是指只有一名股东（自然人或法人）设立的股份有限公司。2013年我国修订《公司法》正式引入一人公司制度，2024年《公司法》进一步明确一人股份有限公司的法律地位，为创业者提供了更灵活的组织形式。</P>
          <P><Bold>OPC的核心特征：</Bold></P>
          <BulletList items={[
            '单一股东承担全部出资责任',
            '股东以出资额为限对公司债务承担责任',
            '可设董事会、监事会（或仅设一名董事/监事）',
            '股份可自由转让（相比个体工商户更具灵活性）',
          ]} />
        </>
      );
    case 'opc-1-2':
      return (
        <>
          <SectionH2 id="opc-1-2">OPC vs 传统公司 vs 个体工商户</SectionH2>
          <DataTable
            headers={['对比维度', 'OPC一人股份有限公司', '传统多人有限公司', '个体工商户']}
            rows={[
              ['股东人数', '1人', '2人以上', '无（自然人经营）'],
              ['法律责任', '有限责任', '有限责任', '无限连带责任'],
              ['主体资格', '法人', '法人', '非法人'],
              ['股权流动性', '可转让股权', '股权转让需其他股东同意', '不可转让'],
              ['融资能力', '可引入投资人', '较容易', '困难'],
              ['税务成本', '需做账报税，成本较高', '需做账报税', '可核定征收'],
              ['品牌信任度', '较高', '高', '较低'],
              ['适用场景', '创业初期、控股架构', '多人合伙创业', '小规模经营'],
            ]}
          />
        </>
      );
    case 'opc-1-3':
      return (
        <>
          <SectionH2 id="opc-1-3">OPC注册条件与流程</SectionH2>
          <P><Bold>注册基本条件：</Bold></P>
          <BulletList items={[
            '股东为1名自然人或1家法人',
            '注册资本不限，实行认缴制',
            '有固定住所（注册地址）',
            '有公司章程',
            '设立董事会或仅设一名执行董事',
          ]} />
          <P><Bold>所需材料清单：</Bold></P>
          <DataTable
            headers={['序号', '材料名称', '说明']}
            rows={[
              ['1', '股东身份证原件', '法人股东提供营业执照'],
              ['2', '公司章程', '全体股东签字'],
              ['3', '注册地址证明', '租赁合同+房产证复印件'],
              ['4', '执行董事/董事长任职文件', ''],
              ['5', '监事任职文件（如设监事）', ''],
              ['6', '企业名称预先核准申请书', ''],
              ['7', '指定代表委托代理人证明', ''],
            ]}
          />
          <P><Bold>注册流程（深圳为例）：</Bold></P>
          <NumberedList items={[
            '企业名称预先核准（1-3个工作日）',
            '提交注册材料至市场监督管理局（1-3个工作日）',
            '领取营业执照',
            '刻制公章、财务章、法人章（取决于快递）',
            '银行开户（3-7个工作日）',
            '税务登记（拿到执照后30日内）',
            '社保、公积金开户（按需）',
          ]} />
        </>
      );
    case 'opc-1-4':
      return (
        <>
          <SectionH2 id="opc-1-4">OPC注册后的必办事项清单</SectionH2>
          <DataTable
            headers={['序号', '事项', '期限要求', '注意事项']}
            rows={[
              ['1', '税务登记', '领取执照后30日内', '未按时报税将产生罚款'],
              ['2', '银行基本户开户', '领取执照后尽快', '基本户只能有一个'],
              ['3', '记账报税', '参考2.1', '小规模季报，一般纳税人月报'],
              ['4', '社保账户开通', '30日内', '有员工时必须办理'],
              ['5', '公积金账户开通', '30日内', '有员工时必须办理'],
            ]}
          />
        </>
      );
    case 'opc-1-5':
      return (
        <>
          <SectionH2 id="opc-1-5">OPC命名与经营范围规范</SectionH2>
          <BulletList items={[
            '公司名称格式：深圳市 + 字号 + 行业描述 + 股份有限公司',
            '经营范围：参考《国民经济行业分类》，可参考同行公司',
            '注册资本：认缴制，无需实际出资，建议适中（建议10-100万）',
            '注册地址：必须为实际地址，虚拟地址需挂靠正规孵化器',
          ]} />
        </>
      );
    case 'opc-2-1':
      return (
        <>
          <SectionH2 id="opc-2-1">OPC公司法定义务一览表</SectionH2>
          <DataTable
            headers={['义务类型', '具体内容', '备注']}
            rows={[
              ['工商年报', '每年6月30日 → 工商年报（深圳市场监管局网站）\n每年5月31日 → 企业所得税年度汇算清缴', '年度报告'],
              ['税务申报', '每季度末15日 → 增值税 + 企业所得税 + 财务报表（★最重要）', '季度申报（小规模纳税人）'],
              ['', '个人所得税（有工资分红才报）', '月度'],
              ['社保缴纳', '为员工缴纳五险', '如有按实申报'],
              ['公积金缴存', '为员工缴存公积金', '如有按实申报'],
              ['会计核算', '建立账册，进行会计核算', 'OPC年度审计报告'],
              ['章程备案', '修改章程需备案', ''],
            ]}
          />
        </>
      );
    case 'opc-2-2':
      return (
        <>
          <SectionH2 id="opc-2-2">记账报税重要节点合规</SectionH2>
          <P><Bold>税务申报周期：</Bold></P>
          <DataTable
            headers={['纳税人类型', '增值税申报', '企业所得税/财务报表', '个人所得税']}
            rows={[
              ['小规模纳税人', '季报（1/4/7/10月）', '季报', '月报（工资薪金）'],
              ['一般纳税人', '月报', '季报', '月报'],
            ]}
          />
          <P><Bold>重要申报节点：</Bold></P>
          <BulletList items={[
            '每月15日前：增值税及附加税申报（一般纳税人）',
            '每季度次月15日前：增值税申报（小规模）、企业所得税预缴',
            '每年5月31日前：企业所得税年度汇算清缴',
            '每年3月1日-6月30日：个人所得税综合所得年度汇算',
          ]} />
        </>
      );
    case 'opc-2-3':
      return (
        <>
          <SectionH2 id="opc-2-3">发票管理规范</SectionH2>
          <P><Bold>开票基本要求：</Bold></P>
          <BulletList items={[
            '购买方信息必须完整（名称、纳税人识别号、地址电话、开户行及账号）',
            '商品或服务名称必须与实际经营相符',
            '金额、税率、税额必须正确',
            '发票必须在规定期限内认证/勾选',
          ]} />
          <P><Bold>红冲规定：</Bold></P>
          <BulletList items={[
            '增值税专用发票：需对方开具《开具红字增值税专用发票信息表》',
            '增值税普通发票：可直接作废或红冲',
            '跨月发票只能红冲，不能作废',
          ]} />
          <P><Bold>丢失处理：</Bold></P>
          <BulletList items={[
            '丢失记账联：可使用发票联复印件入账',
            '丢失发票联：需向开票方索取发票联复印件',
            '丢失抵扣联：可凭发票联复印件认证',
          ]} />
        </>
      );
    case 'opc-2-4':
      return (
        <>
          <SectionH2 id="opc-2-4">银行账户管理规范</SectionH2>
          <P><Bold>公私分开原则：</Bold></P>
          <BulletList items={[
            '公司账户（基本户/一般户）用于经营收支',
            '严禁公私账户混用',
            '股东借款需签订借款合同，约定利率和还款期限',
            '大额资金往来需留存完整凭证',
          ]} />
          <P><Bold>基本户使用规范：</Bold></P>
          <BulletList items={[
            '基本户可办理现金提取、银行汇兑',
            '一般户不可办理现金提取',
            '所有账户需在人民银行备案',
          ]} />
        </>
      );
    case 'opc-2-5':
      return (
        <>
          <SectionH2 id="opc-2-5">合同管理规范</SectionH2>
          <P><Bold>合同起草要点：</Bold></P>
          <BulletList items={[
            '明确合同双方主体信息',
            '标的、数量、质量标准清晰',
            '价款支付方式和期限明确',
            '违约责任约定清楚',
            '争议解决方式（诉讼/仲裁）',
          ]} />
          <P><Bold>签章规范：</Bold></P>
          <BulletList items={[
            '公司合同须加盖公章',
            '公章使用需登记备案',
            '法定代表人签字与公章具有同等效力',
            '骑缝章确保合同完整',
          ]} />
          <P><Bold>存档要求：</Bold></P>
          <BulletList items={[
            '合同原件至少保存15年（部分合同需保存30年）',
            '电子合同需备份存储',
            '建立合同台账，便于检索',
          ]} />
        </>
      );
    case 'opc-2-6':
      return (
        <>
          <SectionH2 id="opc-2-6">知识产权保护</SectionH2>
          <P><Bold>商标保护建议：</Bold></P>
          <BulletList items={[
            '公司名称、Logo及时申请商标注册',
            '注册商标分类：核心类别+防御类别',
            '商标有效期10年，到期及时续展',
          ]} />
          <P><Bold>专利保护：</Bold></P>
          <BulletList items={[
            '发明专利：保护期20年',
            '实用新型专利：保护期10年',
            '外观设计专利：保护期15年',
          ]} />
          <P><Bold>著作权：</Bold></P>
          <BulletList items={[
            '软件著作权登记建议',
            '作品著作权自创作完成之日起享有',
          ]} />
        </>
      );
    case 'opc-2-7':
      return (
        <>
          <SectionH2 id="opc-2-7">年度工商报告与审计要求</SectionH2>
          <P><Bold>工商年报内容：</Bold></P>
          <BulletList items={[
            '企业基本信息（名称、住所、注册资本等）',
            '股东及出资信息',
            '资产状况信息（资产总额、负债总额、所有者权益）',
            '党建信息（党组织情况）',
            '从业人数',
          ]} />
          <P><Bold>审计要求：</Bold></P>
          <BulletList items={[
            '上市公司：必须审计',
            '其他企业：非强制，但以下情况需审计：',
            '外商投资企业',
            '国有企业',
            '法律/法规要求审计的情形',
          ]} />
        </>
      );
    case 'opc-2-8':
      return (
        <>
          <SectionH2 id="opc-2-8">合规运营季度自查清单</SectionH2>
          <DataTable
            headers={['检查项目', '季度自查内容', '是否完成']}
            rows={[
              ['税务申报', '增值税/所得税是否按期申报', '□是 □否'],
              ['银行对账', '银行对账单是否与账面核对', '□是 □否'],
              ['发票管理', '发票是否合规开具、妥善保管', '□是 □否'],
              ['合同存档', '新签合同是否及时归档', '□是 □否'],
              ['社保公积金', '员工社保公积金是否按期缴纳', '□是 □否'],
              ['工商年报', '年报是否在期内完成公示', '□是 □否'],
              ['知识产权', '商标/专利是否在有效期内', '□是 □否'],
              ['档案管理', '财务凭证是否装订归档', '□是 □否'],
            ]}
          />
        </>
      );
    case 'opc-3-1':
      return (
        <>
          <SectionH2 id="opc-3-1">OPC能否雇佣员工</SectionH2>
          <P>OPC作为独立的法人主体，依法可以雇佣员工。2024年新《公司法》进一步明确一人股份有限公司可以设董事会、监事会，雇佣员工不受公司股东人数限制。</P>
          <P><Bold>雇佣员工的法理依据：</Bold></P>
          <BulletList items={[
            '《公司法》赋予公司用工自主权',
            '《劳动合同法》保障劳动者的合法权益',
            'OPC与员工建立劳动关系适用一般劳动法规',
          ]} />
        </>
      );
    case 'opc-3-2':
      return (
        <>
          <SectionH2 id="opc-3-2">员工劳动合同签订要点</SectionH2>
          <P><Bold>必备条款：</Bold></P>
          <BulletList items={[
            '用人单位名称、住所和法定代表人',
            '劳动者姓名、住址和身份证号码',
            '劳动合同期限',
            '工作内容和工作地点',
            '工作时间和休息休假',
            '劳动报酬',
            '社会保险',
            '劳动保护和劳动条件',
          ]} />
          <P><Bold>合同类型选择：</Bold></P>
          <BulletList items={[
            '固定期限劳动合同：约定明确起止时间',
            '无固定期限劳动合同：无约定终止时间',
            '以完成一定工作任务为期限的劳动合同：项目制用工',
          ]} />
        </>
      );
    case 'opc-3-3':
      return (
        <>
          <SectionH2 id="opc-3-3">社保开户与缴纳规范</SectionH2>
          <P><Bold>开户流程：</Bold></P>
          <NumberedList items={[
            '在社保局办理社保登记',
            '在公积金中心办理公积金登记',
            '开通网上申报功能',
            '每月按时申报和缴费',
          ]} />
          <P><Bold>缴纳基数：</Bold></P>
          <BulletList items={[
            '缴费基数：员工上年度月平均工资（新入职按首月工资）',
            '上限：当地社平工资的300%',
            '下限：当地社平工资的60%',
          ]} />
          <P><Bold>深圳社保缴纳比例（参考）：</Bold></P>
          <DataTable
            headers={['险种', '单位缴纳', '个人缴纳']}
            rows={[
              ['养老保险', '14%', '8%'],
              ['医疗保险', '5.2%-8.2%', '2%'],
              ['失业保险', '0.7%', '0.3%'],
              ['工伤保险', '0.21%-1.14%', '不缴'],
              ['生育保险', '0.45%（并入医疗）', '不缴'],
            ]}
          />
        </>
      );
    case 'opc-3-4':
      return (
        <>
          <SectionH2 id="opc-3-4">实习、兼职、外包的合规处理</SectionH2>
          <P><Bold>实习生：</Bold></P>
          <BulletList items={[
            '在校学生实习，签订实习协议（非劳动合同）',
            '实习补贴需代扣代缴个人所得税',
            '不强制缴纳社保',
          ]} />
          <P><Bold>兼职：</Bold></P>
          <BulletList items={[
            '非全日制用工可与多个用人单位建立劳动关系',
            '每天工作时间不超过4小时',
            '工资结算周期不超过15日',
          ]} />
          <P><Bold>外包：</Bold></P>
          <BulletList items={[
            '业务外包给第三方公司',
            '外包员工与外包公司建立劳动关系',
            'OPC与外包公司签订服务协议',
          ]} />
        </>
      );
    case 'opc-3-5':
      return (
        <>
          <SectionH2 id="opc-3-5">老板自身社保问题</SectionH2>
          <DataTable
            headers={['缴纳方式', '说明', '优缺点']}
            rows={[
              ['灵活就业缴纳', '以个人身份在社保局缴纳', '需全额自付，无工伤/失业保险'],
              ['公司名义缴纳', '将老板列为公司员工，由公司缴纳', '可享受工伤/失业保险，成本较高'],
            ]}
          />
          <TipBlock>
            <P className="mb-0"><Bold>建议：</Bold></P>
            <BulletList items={[
              '无员工时：优先选择灵活就业缴纳（节省成本）',
              '有员工时：建议以公司名义缴纳（规范且保障更全）',
            ]} />
          </TipBlock>
        </>
      );
    case 'opc-4-1':
      return (
        <>
          <SectionH2 id="opc-4-1">小规模纳税人 vs 一般纳税人选择</SectionH2>
          <DataTable
            headers={['对比项', '小规模纳税人', '一般纳税人']}
            rows={[
              ['认定标准', '年应税销售额≤500万元', '年应税销售额>500万元'],
              ['增值税税率', '3%（减按1%）', '13%/9%/6%'],
              ['进项税额抵扣', '不可抵扣', '可抵扣'],
              ['发票类型', '增值税普通发票为主', '可开专票'],
              ['申报周期', '季报', '月报'],
              ['适用场景', '初创企业、小规模经营', '客户需专票、上规模经营'],
            ]}
          />
          <TipBlock>
            <P className="mb-0"><Bold>选择建议：</Bold></P>
            <BulletList items={[
              '创业初期：建议小规模纳税人（税率低，报税简单）',
              '客户需要专票：需升级为一般纳税人',
              '进项税额多：一般纳税人更划算',
            ]} />
          </TipBlock>
        </>
      );
    case 'opc-4-2':
      return (
        <>
          <SectionH2 id="opc-4-2">主要税种说明</SectionH2>
          <DataTable
            headers={['税种', '纳税人', '税率/计算方式', '优惠']}
            rows={[
              ['增值税', '销售货物/提供劳务', '小规模3%（减1%），一般纳税人13%/9%/6%', '小规模月销售≤10万免征'],
              ['企业所得税', '企业法人', '基本25%，高新企业15%，小微20%', '小微再减半征收'],
              ['个人所得税', '自然人', '工资薪金3%-45%累进，股息红利20%', '专项附加扣除'],
              ['城市维护建设税', '增值税、消费税纳税人', '增值税×7%/5%/1%', '月销售≤10万免征'],
              ['教育费附加', '增值税、消费税纳税人', '增值税×3%', '月销售≤10万免征'],
              ['印花税', '签订合同的双方', '合同金额×0.03%-0.1%', '小额借款等免征'],
              ['房产税', '产权所有人', '房产原值×70%×1.2%或租金×12%', '优惠政策多'],
            ]}
          />
        </>
      );
    case 'opc-4-3':
      return (
        <>
          <SectionH2 id="opc-4-3">创业税收优惠汇总</SectionH2>
          <P><Bold>小型微利企业优惠：</Bold></P>
          <BulletList items={[
            '年应纳税所得额≤300万元',
            '税率：20%（实际税负约5%以内）',
            '条件：从业人数≤300人，资产总额≤5000万元',
          ]} />
          <P><Bold>增值税优惠：</Bold></P>
          <BulletList items={[
            '小规模纳税人：月销售≤10万免征增值税',
            '小规模纳税人：3%征收率减按1%执行',
            '税收优惠至2027年12月31日',
          ]} />
          <P><Bold>六税两费减半：</Bold></P>
          <BulletList items={[
            '资源税、城建税、房产税、城镇土地使用税、印花税、耕地占用税',
            '教育费附加、地方教育附加',
            '优惠至2027年12月31日',
          ]} />
          <P><Bold>创业担保贷款贴息：</Bold></P>
          <BulletList items={[
            '最高额度20万元/笔',
            '贴息标准：LPR-150BP以内',
          ]} />
        </>
      );
    case 'opc-4-4':
      return (
        <>
          <SectionH2 id="opc-4-4">税务申报时间节点表</SectionH2>
          <DataTable
            headers={['月份', '申报事项']}
            rows={[
              ['每月1-15日', '增值税及附加税申报（一般纳税人）'],
              ['每月1-15日', '个人所得税申报'],
              ['1/4/7/10月1-15日', '增值税季报（小规模纳税人）'],
              ['1/4/7/10月1-15日', '企业所得税季报'],
              ['3月1日-5月31日', '个人所得税综合所得年度汇算'],
              ['5月31日前', '企业所得税年度汇算清缴'],
              ['6月30日前', '工商年报截止'],
              ['12月31日前', '企税预缴、个税12万元申报（如需）'],
            ]}
          />
        </>
      );
    case 'opc-4-5':
      return (
        <>
          <SectionH2 id="opc-4-5">常见税务风险与规避方法</SectionH2>
          <P><Bold>风险一：隐匿收入</Bold></P>
          <BulletList items={[
            '表现：通过私人账户收取货款、坐支现金',
            '后果：补税+滞纳金+罚款，严重者构成逃税罪',
            '规避：所有收入必须入公账，开具正规发票',
          ]} />
          <P><Bold>风险二：虚列成本费用</Bold></P>
          <BulletList items={[
            '表现：购买发票、虚增人员工资、白条入账',
            '后果：不得税前扣除，补缴企业所得税+滞纳金',
            '规避：保证成本票据真实、合法、完整',
          ]} />
          <P><Bold>风险三：关联交易定价不合理</Bold></P>
          <BulletList items={[
            '表现：与关联方交易价格明显偏离市场价',
            '后果：税务机关有权调整应纳税所得额',
            '规避：关联交易需有合理的商业目的和定价依据',
          ]} />
        </>
      );
    case 'opc-4-6':
      return (
        <>
          <SectionH2 id="opc-4-6">成本票据合规要求</SectionH2>
          <P><Bold>合规票据类型：</Bold></P>
          <BulletList items={[
            '增值税专用发票（最高合规效力）',
            '增值税普通发票',
            '海关进口增值税专用缴款书',
            '完税凭证',
            '财政票据（行政事业单位）',
          ]} />
          <P><Bold>不合规票据示例：</Bold></P>
          <BulletList items={[
            '假发票、伪造发票',
            '项目不完整或信息错误的发票',
            '抬头为个人而非公司的发票',
            '白条（收据）',
          ]} />
          <P><Bold>票据保管要求：</Bold></P>
          <BulletList items={[
            '原始凭证保存期限：30年',
            '账簿保存期限：30年',
            '会计档案销毁需经审批',
          ]} />
        </>
      );
    case 'opc-4-7':
      return (
        <>
          <SectionH2 id="opc-4-7">金税四期大数据监管下的OPC合规要点</SectionH2>
          <P><Bold>金税四期的核心变化：</Bold></P>
          <BulletList items={[
            '从"以票管税"升级为"以数治税"',
            '打通税务、银行、社保、海关、市场监管等多部门数据',
            '实现企业全生命周期数据的比对分析',
          ]} />
          <P><Bold>OPC企业合规要点：</Bold></P>
          <NumberedList items={[
            '资金流水与申报收入一致',
            '库存与销售、采购数据匹配',
            '员工工资与社保缴纳人数一致',
            '发票品目与经营范围匹配',
            '税负率处于合理区间（偏离过大触发预警）',
            '商贸企业进销项匹配',
          ]} />
        </>
      );
    case 'opc-5-1':
      return (
        <>
          <SectionH2 id="opc-5-1">AI工具使用场景与合规边界</SectionH2>
          <DataTable
            headers={['应用场景', 'AI工具类型', '合规关注点']}
            rows={[
              ['智能客服/营销', '对话式AI', '数据隐私、内容合规'],
              ['财务管理', 'AI财务智能体', '数据安全、算法决策责任'],
              ['内容创作', 'AIGC（文字/图片/视频）', '版权、标注义务'],
              ['数据分析', '大模型数据分析', '数据来源合规'],
              ['自动化运营', 'OpenClaw系统', '系统安全、数据隔离'],
            ]}
          />
          <P><Bold>合规使用原则：</Bold></P>
          <BulletList items={[
            '明确AI工具的使用范围和局限性',
            '对AI生成内容进行人工审核',
            '保留AI决策的记录和依据',
            '定期评估AI工具的安全性和合规性',
          ]} />
        </>
      );
    case 'opc-5-2':
      return (
        <>
          <SectionH2 id="opc-5-2">AI营销自动化的合规要求</SectionH2>
          <P><Bold>广告法核心红线：</Bold></P>
          <BulletList items={[
            '绝对化用语：最、第一、顶级等（已无安全词）',
            '虚假宣传：虚构资质、夸大功能',
            '违禁词：投资回报承诺、保证收益等金融类',
            '价格比较：不得虚构原价',
          ]} />
          <P><Bold>消费者权益保护：</Bold></P>
          <BulletList items={[
            '自动化营销信息需提供退订方式',
            '不得通过AI自动拨打营销电话（需用户明确同意）',
            '个性化推荐需告知用户并提供关闭选项',
          ]} />
        </>
      );
    case 'opc-5-3':
      return (
        <>
          <SectionH2 id="opc-5-3">AI财务智能体使用规范</SectionH2>
          <P><Bold>数据安全要求：</Bold></P>
          <BulletList items={[
            '财务数据属于敏感数据，需加密存储',
            'AI处理财务数据需签订数据处理协议',
            '禁止将财务数据用于模型训练（除非脱敏）',
          ]} />
          <P><Bold>算法决策责任：</Bold></P>
          <BulletList items={[
            'AI生成的财务建议仅供参考，最终决策权在人',
            '重要财务决策（如税务筹划）需专业人员复核',
            '保留AI辅助决策的完整记录',
          ]} />
        </>
      );
    case 'opc-5-4':
      return (
        <>
          <SectionH2 id="opc-5-4">OpenClaw系统数据安全规范</SectionH2>
          <DataTable
            headers={['数据级别', '示例', '保护措施']}
            rows={[
              ['核心数据', '财务报表、客户名单', '加密存储、访问审批'],
              ['重要数据', '运营数据、业务数据', '访问控制、日志审计'],
              ['一般数据', '公开信息', '基础防护'],
            ]}
          />
          <P><Bold>系统安全措施：</Bold></P>
          <BulletList items={[
            '定期更换密码，使用强密码策略',
            '开启双因素认证',
            '定期备份数据',
            '监控系统访问日志',
          ]} />
        </>
      );
    case 'opc-5-5':
      return (
        <>
          <SectionH2 id="opc-5-5">AI生成内容（AIGC）的合规标注要求</SectionH2>
          <P><Bold>强制标注义务：</Bold></P>
          <BulletList items={[
            '根据《生成式人工智能服务管理暂行办法》',
            'AI生成的内容应显著标注"AI生成"或类似标识',
            '不得利用AI生成内容进行虚假宣传',
          ]} />
          <P><Bold>版权说明：</Bold></P>
          <BulletList items={[
            'AI生成内容的版权归属尚存争议',
            '建议在使用条款中明确约定',
            '商业使用前确认AI服务商的版权政策',
          ]} />
        </>
      );
    case 'opc-5-6':
      return (
        <>
          <SectionH2 id="opc-5-6">个人信息保护法对AI工具的限制</SectionH2>
          <P><Bold>核心要求：</Bold></P>
          <BulletList items={[
            '处理个人信息需取得个人同意',
            '敏感个人信息（财务、健康等）需单独同意',
            '用户有权要求删除其个人信息',
            '数据跨境需通过安全评估',
          ]} />
          <P><Bold>AI工具采购合规审查清单：</Bold></P>
          <DataTable
            headers={['审查项目', '要求']}
            rows={[
              ['数据处理协议', '是否有书面协议明确数据处理规则'],
              ['数据存储地点', '数据是否在境内存储'],
              ['安全保障措施', '是否有加密、访问控制等措施'],
              ['数据删除机制', '停止服务后是否删除用户数据'],
              ['应急响应机制', '是否有数据泄露应急方案'],
            ]}
          />
        </>
      );
    case 'opc-5-7':
      return (
        <>
          <SectionH2 id="opc-5-7">AI工具采购与供应商合规审查清单</SectionH2>
          <DataTable
            headers={['审查项', '审查内容', '合格标准']}
            rows={[
              ['服务商资质', '是否具备相关资质证书', '营业执照、ICP许可证等'],
              ['数据安全认证', 'ISO27001/等保认证', '证书在有效期内'],
              ['隐私政策', '是否明确告知数据处理方式', '隐私政策完整且易读'],
              ['服务协议', 'SLA、服务等级', '响应时间、赔偿条款'],
              ['合规培训', '是否提供合规使用培训', '有培训记录'],
            ]}
          />
        </>
      );
    case 'opc-5-8':
      return (
        <>
          <SectionH2 id="opc-5-8">企业AI治理框架建议</SectionH2>
          <P><Bold>建议架构：</Bold></P>
          <P><Bold>第一步：建立AI使用政策</Bold></P>
          <BulletList items={[
            '明确哪些场景可以使用AI',
            '明确哪些场景禁止使用AI',
            '制定AI使用审批流程',
          ]} />
          <P><Bold>第二步：设立AI审核机制</Bold></P>
          <BulletList items={[
            '重要内容输出需经人工审核',
            '建立AI错误的纠正流程',
            '定期审计AI使用情况',
          ]} />
          <P><Bold>第三步：培训与意识提升</Bold></P>
          <BulletList items={[
            '全员AI合规使用培训',
            '定期更新合规知识',
          ]} />
          <P><Bold>第四步：持续监控与改进</Bold></P>
          <BulletList items={[
            '建立AI使用效果评估机制',
            '及时调整AI使用策略',
          ]} />
        </>
      );
    case 'opc-6-1':
      return (
        <>
          <SectionH2 id="opc-6-1">深圳/龙岗OPC企业可申请的主要补贴</SectionH2>
          <P><Bold>深圳市级补贴（参考2024-2026年政策）：</Bold></P>
          <DataTable
            headers={['补贴类型', '补贴标准', '申请条件']}
            rows={[
              ['创业补贴', '1万元/笔', '深圳户籍创业者'],
              ['场租补贴', '每月500-1560元', '在深创业并租用经营场所'],
              ['社保补贴', '实际缴纳社保费×2/3', '招用深圳户籍人员'],
              ['带动就业补贴', '每人2000-3000元', '招用深圳户籍人员'],
              ['创业担保贷款', '最高60万元（合伙经营）', '符合贷款条件'],
            ]}
          />
          <P><Bold>龙岗区专项补贴：</Bold></P>
          <DataTable
            headers={['补贴类型', '补贴标准', '申请条件']}
            rows={[
              ['龙岗区创业补贴', '按项目投资额补贴', '龙岗区注册经营'],
              ['高新企业认定奖励', '最高30万元', '首次认定高新企业'],
              ['科技研发资助', '按研发投入比例', '有研发项目的企业'],
              ['人才引进补贴', '按人才等级', '引进高层次人才'],
            ]}
          />
        </>
      );
    case 'opc-6-2':
      return (
        <>
          <SectionH2 id="opc-6-2">补贴申请合规注意事项</SectionH2>
          <P><Bold>材料真实性：</Bold></P>
          <BulletList items={[
            '所有申报材料必须真实、完整',
            '不得伪造、变造材料',
            '专款专用，不得挪作他用',
          ]} />
          <P><Bold>合规享受政策红利建议：</Bold></P>
          <NumberedList items={[
            '及时关注政策动态，避免错过申报期',
            '建立政策台账，记录已申请和可申请的补贴',
            '聘请专业机构协助申报，提高成功率',
            '保留完整的申报档案备查',
          ]} />
        </>
      );
    case 'opc-6-3':
      return (
        <>
          <SectionH2 id="opc-6-3">与政府监管部门的沟通规范</SectionH2>
          <P><Bold>主动合规优于被动应对：</Bold></P>
          <BulletList items={[
            '定期进行合规自查',
            '主动与主管部门保持沟通',
            '建立良好的政企关系',
          ]} />
          <P><Bold>应对检查的注意事项：</Bold></P>
          <BulletList items={[
            '积极配合，如实提供材料',
            '不隐瞒、不销毁相关资料',
            '重大事项及时报告',
          ]} />
        </>
      );
    case 'opc-6-4':
      return (
        <>
          <SectionH2 id="opc-6-4">行业资质许可办理指引</SectionH2>
          <DataTable
            headers={['资质类型', '适用场景', '主管部门']}
            rows={[
              ['食品经营许可证', '食品销售/餐饮', '市场监管局'],
              ['出版物经营许可证', '图书/音像制品', '宣传部'],
              ['网络文化经营许可证', '互联网文化产品', '文旅局'],
              ['ICP许可证', '信息发布/在线服务', '工信部'],
              ['增值电信业务经营许可证', '电信业务', '工信部'],
            ]}
          />
        </>
      );
    case 'opc-6-5':
      return (
        <>
          <SectionH2 id="opc-6-5">合规享受政策红利的建议</SectionH2>
          <NumberedList items={[
            '建立政策跟踪机制：订阅政府官网公告，关注行业政策动态',
            '建立补贴台账：梳理可申请的补贴清单，设置申报提醒',
            '规范使用补贴资金：专款专用，保留完整的资金使用凭证',
            '寻求专业支持：委托专业机构申报，提高成功率',
            '合规是第一前提：补贴申请必须材料真实，不得弄虚作假',
          ]} />
        </>
      );
    case 'opc-appendix-a':
      return (
        <>
          <SectionH2 id="opc-appendix-a">OPC企业合规运营年度日历</SectionH2>
          <DataTable
            headers={['时间节点', '事项', '备注']}
            rows={[
              ['每月1日', '月度税务申报开始', '一般纳税人月报'],
              ['每月15日', '月度税务申报截止', '节假日顺延'],
              ['1/4/7/10月15日', '季度税务申报截止', '增值税/企税季报'],
              ['3月1日-5月31日', '个人所得税年度汇算', '综合所得'],
              ['5月31日', '企业所得税年度汇算清缴截止', ''],
              ['6月30日', '工商年报截止', '逾期列入经营异常'],
              ['每年', '工商年报、税务审计', '按需'],
              ['每年', '社保公积金年度调整', '7月前后'],
            ]}
          />
        </>
      );
    case 'opc-appendix-b':
      return (
        <>
          <SectionH2 id="opc-appendix-b">OPC合规自查打分表</SectionH2>
          <DataTable
            headers={['检查维度', '检查项目', '分值', '自查结果']}
            rows={[
              ['税务合规', '税务按期申报，无欠税', '20分', '____'],
              ['财务规范', '账册完整，票据合规', '15分', '____'],
              ['社保合规', '员工社保按期缴纳', '15分', '____'],
              ['工商合规', '年报按期公示', '10分', '____'],
              ['合同管理', '合同管理规范', '10分', '____'],
              ['数据安全', 'AI工具使用合规', '15分', '____'],
              ['知识产权', '知识产权保护到位', '10分', '____'],
              ['应急能力', '有应急处理机制', '5分', '____'],
              ['合计', '', '100分', '____'],
            ]}
          />
          <TipBlock>
            <P className="mb-0"><Bold>评分标准：</Bold></P>
            <BulletList items={[
              '90-100分：优秀，继续保持',
              '70-89分：良好，存在小问题需改进',
              '60-69分：一般，存在较多合规风险',
              '60分以下：紧急，需立即整改',
            ]} />
          </TipBlock>
        </>
      );
    case 'opc-appendix-c':
      return (
        <>
          <SectionH2 id="opc-appendix-c">常用政府官网与政策查询渠道</SectionH2>
          <DataTable
            headers={['机构/网站', '网址/渠道', '主要功能']}
            rows={[
              ['国家税务总局', 'https://www.chinatax.gov.cn', '税收政策法规'],
              ['深圳市市场监督管理局', 'http://amr.sz.gov.cn', '企业登记、年报'],
              ['深圳人社局', 'http://hrss.sz.gov.cn', '社保、就业政策'],
              ['龙岗区政府', 'http://www.lg.gov.cn', '区域优惠政策'],
              ['国家企业信用信息公示系统', 'http://www.gsxt.gov.cn', '企业信用查询'],
              ['深圳市中小企业服务局', 'http://zxqyj.sz.gov.cn', '中小企业补贴'],
            ]}
          />
        </>
      );
    default:
      return <P className="text-muted-foreground">请选择左侧目录中的章节查看内容。</P>;
  }
}

/* ── Digital Employee Content ── */

function DigitalEmployeeContent({ anchor }: { anchor: string }) {
  switch (anchor) {
    case 'de-1-1':
      return (
        <>
          <SectionH2 id="de-1-1">什么是数字员工</SectionH2>
          <P>数字员工（Digital Employee）是指基于大语言模型（LLM）和AI Agent技术打造的虚拟员工，可替代或辅助人类完成特定领域的重复性、规则性工作。</P>
        </>
      );
    case 'de-1-2':
      return (
        <>
          <SectionH2 id="de-1-2">四大核心数字员工角色</SectionH2>
          <DataTable
            headers={['数字员工', '核心职责', '典型任务']}
            rows={[
              ['财务数字员工', '账务处理、报表生成、税务合规', '报销审核、发票识别、财务数据分析'],
              ['人事数字员工', '招聘辅助、员工服务、考勤管理', 'JD生成、简历筛选、排班优化'],
              ['法务数字员工', '合同审核、法律研究、风险预警', '条款比对、风险识别、法律检索'],
              ['市场数字员工', '营销内容创作、客户分析、市场洞察', '文案生成、竞品分析、投放优化'],
            ]}
          />
        </>
      );
    case 'de-1-3':
      return (
        <>
          <SectionH2 id="de-1-3">数字员工与人类员工的协作模式</SectionH2>
          <BulletList items={[
            '数字员工负责标准化、重复性工作',
            '人类员工负责需要判断力、创造力和人际沟通的工作',
            '建立"数字员工建议+人类员工决策"的工作流',
          ]} />
        </>
      );
    case 'de-2-1':
      return (
        <>
          <SectionH2 id="de-2-1">适用场景与权限边界</SectionH2>
          <DataTable
            headers={['可授权场景', '需人工复核场景', '禁止使用场景']}
            rows={[
              ['发票信息提取与录入', '税务申报最终确认', '代替法人签字'],
              ['费用报销规则校验', '银行对账最终审核', '开具发票'],
              ['财务报表自动生成', '税务筹划方案确定', '大额资金审批'],
              ['往来账核对', '财务档案销毁审批', '财务档案删除'],
            ]}
          />
        </>
      );
    case 'de-2-2':
      return (
        <>
          <SectionH2 id="de-2-2">数据安全合规</SectionH2>
          <BulletList items={[
            '财务数据属于商业秘密，需加密存储',
            '数字员工处理财务数据时需开启数据脱敏',
            '禁止将财务数据用于模型训练',
            '财务系统访问需记录完整日志',
          ]} />
        </>
      );
    case 'de-2-3':
      return (
        <>
          <SectionH2 id="de-2-3">财务AI使用合规清单</SectionH2>
          <DataTable
            headers={['检查项', '要求']}
            rows={[
              ['数据访问权限', '仅获取最小必要数据'],
              ['操作留痕', '所有操作记录可追溯'],
              ['复核机制', '重要操作需人工复核'],
              ['应急预案', '数据泄露时立即停用并上报'],
              ['服务商资质', 'AI服务商具备数据安全资质'],
            ]}
          />
        </>
      );
    case 'de-2-4':
      return (
        <>
          <SectionH2 id="de-2-4">算法决策责任界定</SectionH2>
          <BulletList items={[
            '数字员工生成的财务建议仅供参考',
            '最终财务决策权属于持证财务人员',
            '因AI建议导致的财务损失，责任由决策者承担',
            '建议在AI使用协议中明确责任边界',
          ]} />
        </>
      );
    case 'de-3-1':
      return (
        <>
          <SectionH2 id="de-3-1">招聘场景的合规要求</SectionH2>
          <BulletList items={[
            '简历筛选：不得基于种族、性别、年龄、宗教等歧视性条件筛选',
            'AI面试评估：需告知候选人使用了AI辅助评估',
            'JD生成：避免使用歧视性语言和绝对化承诺',
            '背景调查：需获得候选人书面授权',
          ]} />
        </>
      );
    case 'de-3-2':
      return (
        <>
          <SectionH2 id="de-3-2">员工数据保护</SectionH2>
          <BulletList items={[
            '人事数据属于敏感个人信息，处理需遵循最小必要原则',
            '考勤数据、绩效数据等需分级授权',
            '员工离职后及时清理或归档其数字员工系统账号',
            '员工数据不得跨境传输（除非满足个保法规定条件）',
          ]} />
        </>
      );
    case 'de-3-3':
      return (
        <>
          <SectionH2 id="de-3-3">考勤与排班AI合规</SectionH2>
          <BulletList items={[
            'AI排班算法需考虑员工法定休息权',
            '不得以AI算法为由侵犯员工合法权益',
            '排班调整需提前告知员工',
            '加班安排需符合劳动法规定',
          ]} />
        </>
      );
    case 'de-3-4':
      return (
        <>
          <SectionH2 id="de-3-4">人事AI合规自查清单</SectionH2>
          <DataTable
            headers={['检查项', '要求', '频率']}
            rows={[
              ['算法公平性检测', '检测是否存在歧视性偏见', '每季度'],
              ['数据访问审计', '检查是否有超权限访问', '每月'],
              ['操作日志审查', '复核高风险操作记录', '每周'],
              ['合规培训更新', '更新AI使用合规要求', '每半年'],
            ]}
          />
        </>
      );
    case 'de-4-1':
      return (
        <>
          <SectionH2 id="de-4-1">合同审核AI的使用规范</SectionH2>
          <BulletList items={[
            '可使用场景：合同条款比对、风险点识别、格式合同生成',
            '需人工介入场景：重大商务合同审核、法律关系复杂的情形',
            '禁止使用场景：出具正式法律意见书、代理诉讼',
          ]} />
        </>
      );
    case 'de-4-2':
      return (
        <>
          <SectionH2 id="de-4-2">法律研究AI的边界</SectionH2>
          <BulletList items={[
            '可用于：法规检索、判例分析、合规风险识别',
            '不能替代：律师出具的法律意见、诉讼策略制定',
            '需注明：AI分析结果仅供参考，不构成正式法律建议',
          ]} />
        </>
      );
    case 'de-4-3':
      return (
        <>
          <SectionH2 id="de-4-3">合规审查AI的制度保障</SectionH2>
          <P>建议企业建立以下制度：</P>
          <NumberedList items={[
            'AI法务使用管理办法：明确使用范围、权限、审批流程',
            '重大合同双人审核制：AI审核+人工复核',
            '敏感信息脱敏规则：合同中的商业秘密需脱敏后交AI处理',
            '知识产权归属确认：明确AI生成合同模板的版权归属',
          ]} />
        </>
      );
    case 'de-4-4':
      return (
        <>
          <SectionH2 id="de-4-4">法务AI输出质量评估</SectionH2>
          <DataTable
            headers={['评估维度', '评估指标', '达标标准']}
            rows={[
              ['准确性', '风险点识别准确率', '≥85%'],
              ['完整性', '关键条款覆盖度', '≥90%'],
              ['时效性', '法规更新同步速度', '≤7个工作日'],
              ['安全性', '数据泄露事件', '0次'],
            ]}
          />
        </>
      );
    case 'de-5-1':
      return (
        <>
          <SectionH2 id="de-5-1">AI营销内容合规红线</SectionH2>
          <BulletList items={[
            '广告法红线：绝对化用语（最/第一/顶级）、虚假宣传、违禁承诺',
            '个保法要求：精准营销需用户同意，不得过度采集用户数据',
            'AI标注义务：AI生成的营销内容需显著标注',
          ]} />
        </>
      );
    case 'de-5-2':
      return (
        <>
          <SectionH2 id="de-5-2">AI客户画像与数据分析合规</SectionH2>
          <BulletList items={[
            '用户画像需经用户同意方可生成',
            '不得基于敏感属性（健康、种族、宗教）进行差异化营销',
            '用户画像数据需提供删除机制',
            '画像结果不得用于非法用途',
          ]} />
        </>
      );
    case 'de-5-3':
      return (
        <>
          <SectionH2 id="de-5-3">AI市场调研与竞品分析</SectionH2>
          <BulletList items={[
            '公开数据抓取需遵守robots协议',
            '不得窃取竞争对手商业秘密',
            'AI分析结果需人工核实，避免传播不实信息',
          ]} />
        </>
      );
    case 'de-5-4':
      return (
        <>
          <SectionH2 id="de-5-4">市场AI合规运营矩阵</SectionH2>
          <DataTable
            headers={['场景', '合规要求', '责任部门']}
            rows={[
              ['内容创作', 'AI生成内容需人工审核后发布', '市场部'],
              ['精准投放', '用户数据使用需授权', '数据团队'],
              ['舆情监控', '不得侵犯隐私或传播虚假信息', '公关部'],
              ['客服对话', '禁止误导性回复，重要问题转人工', '客服部'],
            ]}
          />
        </>
      );
    case 'de-6-1':
      return (
        <>
          <SectionH2 id="de-6-1">数字员工治理架构建议</SectionH2>
          <P>建议企业建立三级治理架构：</P>
          <P><Bold>第一级：决策委员会</Bold></P>
          <BulletList items={[
            '负责制定数字员工使用政策',
            '审批高风险AI应用',
            '定期听取数字员工运行汇报',
          ]} />
          <P><Bold>第二级：合规运营团队</Bold></P>
          <BulletList items={[
            '日常合规监督',
            '定期审计AI使用情况',
            '处理合规投诉和事件',
          ]} />
          <P><Bold>第三级：各业务线</Bold></P>
          <BulletList items={[
            '落实本业务线数字员工合规使用',
            '定期培训与意识提升',
            '问题上报与反馈',
          ]} />
        </>
      );
    case 'de-6-2':
      return (
        <>
          <SectionH2 id="de-6-2">数字员工绩效评估</SectionH2>
          <DataTable
            headers={['评估指标', '计算方式', '权重']}
            rows={[
              ['任务完成率', '完成任务数/总任务数', '30%'],
              ['错误率', '错误任务数/总任务数', '25%'],
              ['效率提升', '节省时间/原用时', '25%'],
              ['合规达标率', '合规操作数/总操作数', '20%'],
            ]}
          />
        </>
      );
    case 'de-6-3':
      return (
        <>
          <SectionH2 id="de-6-3">数字员工培训体系</SectionH2>
          <DataTable
            headers={['培训类型', '培训对象', '频率', '内容']}
            rows={[
              ['入职培训', '新员工', '入职时', '数字员工使用规范、合规要求'],
              ['进阶培训', 'AI使用者', '每季度', '新功能、新合规要求'],
              ['管理培训', '管理人员', '每半年', '治理框架、风险识别'],
              ['合规专项', '法务/合规', '按需', '法规更新、典型案例'],
            ]}
          />
        </>
      );
    default:
      return <P className="text-muted-foreground">请选择左侧目录中的章节查看内容。</P>;
  }
}

/* ── Data Analysis Content ── */

function DataAnalysisContent({ anchor }: { anchor: string }) {
  switch (anchor) {
    case 'da-1-1':
      return (
        <>
          <SectionH2 id="da-1-1">数据分析业务定义</SectionH2>
          <P>数据分析业务是指通过技术手段对数据进行收集、整理、分析和可视化，产出业务洞察和决策支持的服务。</P>
        </>
      );
    case 'da-1-2':
      return (
        <>
          <SectionH2 id="da-1-2">常见业务模式</SectionH2>
          <DataTable
            headers={['业务类型', '说明', '合规重点']}
            rows={[
              ['数据接口服务', '提供标准化数据API接口', '数据来源合法、接口安全'],
              ['数据训练服务', '提供模型训练数据和数据标注', '数据授权、知情同意'],
              ['数据洞察报告', '交付数据分析报告', '数据脱敏、客户授权'],
              ['数据平台服务', 'SaaS化数据分析平台', '隐私保护、安全防护'],
            ]}
          />
        </>
      );
    case 'da-2-1':
      return (
        <>
          <SectionH2 id="da-2-1">合法数据来源认定</SectionH2>
          <DataTable
            headers={['数据类型', '合规要求', '禁止行为']}
            rows={[
              ['第一方数据（自有）', '获得用户知情同意', '未告知用户收集目的'],
              ['第二方数据（合作伙伴）', '签订数据合作协议', '无协议使用、数据超范围使用'],
              ['第三方数据（采购/抓取）', '核实数据来源合法性', '爬虫抓取、购买来源不明数据'],
              ['公开数据', '遵守平台规则', '违反robots.txt'],
            ]}
          />
        </>
      );
    case 'da-2-2':
      return (
        <>
          <SectionH2 id="da-2-2">数据采购合规审查</SectionH2>
          <DataTable
            headers={['审查项', '审查内容', '判断标准']}
            rows={[
              ['数据来源证明', '是否有明确的数据来源说明', '来源清晰可追溯'],
              ['授权链完整性', '数据是否经过完整授权', '有授权链条证明'],
              ['授权时效性', '授权是否在有效期内', '在有效期内'],
              ['使用范围限制', '授权使用范围是否包含业务场景', '包含目标使用场景'],
              ['数据质量', '数据是否准确、完整', '质量符合业务需求'],
            ]}
          />
        </>
      );
    case 'da-2-3':
      return (
        <>
          <SectionH2 id="da-2-3">用户授权合规要求</SectionH2>
          <BulletList items={[
            '收集用户数据需告知收集目的、使用方式和范围',
            '敏感数据（位置、通讯录、健康、金融等）需单独明示同意',
            '授权应当是自愿、明确、有意义的',
            '用户有权撤回同意并要求删除数据',
          ]} />
        </>
      );
    case 'da-3-1':
      return (
        <>
          <SectionH2 id="da-3-1">API接口安全合规</SectionH2>
          <DataTable
            headers={['安全维度', '要求', '实现方式']}
            rows={[
              ['身份认证', 'API调用方身份验证', 'API Key/OAuth2.0/JWT'],
              ['传输加密', '数据传输过程加密', 'HTTPS/TLS'],
              ['访问控制', '最小权限原则', 'IP白名单/访问频率限制'],
              ['日志审计', '记录完整调用日志', '日志留存≥6个月'],
              ['数据脱敏', '返回数据脱敏处理', '按业务场景脱敏'],
            ]}
          />
        </>
      );
    case 'da-3-2':
      return (
        <>
          <SectionH2 id="da-3-2">接口数据合规审查清单</SectionH2>
          <DataTable
            headers={['检查项', '要求', '检查频率']}
            rows={[
              ['数据范围合规', '接口返回数据在授权范围内', '上线前+每季度'],
              ['敏感信息过滤', '禁止返回未经授权的敏感信息', '上线前+每次变更'],
              ['接口速率限制', '防止数据批量泄露', '上线前'],
              ['服务商资质', '数据处理方具备相关资质', '合作前'],
              ['SLA合规', '服务商承诺满足合规要求', '合作前'],
            ]}
          />
        </>
      );
    case 'da-3-3':
      return (
        <>
          <SectionH2 id="da-3-3">第三方数据接口使用规范</SectionH2>
          <BulletList items={[
            '使用前审查服务商的数据合规资质',
            '签订数据处理协议（包含安全责任、保密义务）',
            '监控接口调用情况，发现异常及时处置',
            '定期评估服务商合规状况',
          ]} />
        </>
      );
    case 'da-4-1':
      return (
        <>
          <SectionH2 id="da-4-1">训练数据来源合规</SectionH2>
          <P><Bold>合法来源途径：</Bold></P>
          <BulletList items={[
            '自有数据：经用户同意收集的业务数据',
            '合成数据：通过算法生成的不包含真实个人信息的数据',
            '授权数据：从合规数据供应商采购的数据',
            '公开数据集：符合CC0等开放许可的公开数据集',
          ]} />
          <P><Bold>禁止使用的数据：</Bold></P>
          <BulletList items={[
            '未经授权的个人信息',
            '涉及国家安全、军事的数据',
            '侵犯知识产权的数据',
            '来源不明或黑市购买的数据',
          ]} />
        </>
      );
    case 'da-4-2':
      return (
        <>
          <SectionH2 id="da-4-2">数据标注合规要求</SectionH2>
          <BulletList items={[
            '标注人员需了解标注数据的用途和合规要求',
            '涉及个人信息的标注需在安全环境下进行',
            '标注数据不得留存原始个人信息',
            '建立标注质量审核机制',
          ]} />
        </>
      );
    case 'da-4-3':
      return (
        <>
          <SectionH2 id="da-4-3">数据训练合规自查清单</SectionH2>
          <DataTable
            headers={['检查项', '要求', '责任人']}
            rows={[
              ['数据来源登记', '建立训练数据来源台账', '数据负责人'],
              ['授权文件存档', '保存完整的数据授权证明', '法务'],
              ['脱敏处理确认', '确认用于训练的数据已脱敏', '技术负责人'],
              ['隐私影响评估', '涉及个人信息需做PIA', '合规负责人'],
              ['模型输出测试', '测试模型是否泄露训练数据', '测试工程师'],
            ]}
          />
        </>
      );
    case 'da-4-4':
      return (
        <>
          <SectionH2 id="da-4-4">个人信息保护影响评估（PIA）</SectionH2>
          <P>建议在以下场景开展PIA：</P>
          <BulletList items={[
            '首次使用新数据源进行模型训练',
            '数据训练涉及敏感个人信息',
            '数据训练结果用于自动化决策',
          ]} />
          <P><Bold>PIA主要内容：</Bold></P>
          <NumberedList items={[
            '数据处理的合法依据',
            '数据处理的必要性分析',
            '对个人权益的影响评估',
            '风险识别和保护措施',
          ]} />
        </>
      );
    case 'da-5-1':
      return (
        <>
          <SectionH2 id="da-5-1">数据分级分类标准</SectionH2>
          <DataTable
            headers={['数据级别', '定义', '示例', '保护要求']}
            rows={[
              ['绝密级', '泄露会造成严重损害', '核心商业数据、用户生物信息', '加密+严格访问控制+审计'],
              ['机密级', '泄露会造成较大损害', '财务数据、员工信息', '加密+访问控制+审计'],
              ['秘密级', '泄露会造成一定损害', '业务数据、运营数据', '基础加密+访问控制'],
              ['公开级', '泄露影响较小', '公开信息、新闻资讯', '基础防护'],
            ]}
          />
        </>
      );
    case 'da-5-2':
      return (
        <>
          <SectionH2 id="da-5-2">技术安全措施要求</SectionH2>
          <DataTable
            headers={['措施类型', '具体要求']}
            rows={[
              ['访问控制', '基于角色的访问控制（RBAC），最小权限原则'],
              ['数据加密', '传输加密（HTTPS/TLS）+存储加密（AES-256）'],
              ['脱敏处理', '展示层脱敏+分析层脱敏'],
              ['数据水印', '重要数据添加数字水印便于溯源'],
              ['日志审计', '记录所有数据访问操作，留存≥6个月'],
              ['应急响应', '制定数据泄露应急预案，定期演练'],
            ]}
          />
        </>
      );
    case 'da-5-3':
      return (
        <>
          <SectionH2 id="da-5-3">数据备份与销毁规范</SectionH2>
          <BulletList items={[
            '备份：重要数据每日备份，异地存储',
            '恢复测试：每季度测试数据恢复能力',
            '销毁：不再需要的数据应及时销毁，保留销毁记录',
            '介质销毁：物理介质销毁需确保数据不可恢复',
          ]} />
        </>
      );
    case 'da-6-1':
      return (
        <>
          <SectionH2 id="da-6-1">组织架构建议</SectionH2>
          <P>建议设立数据合规委员会，成员包括：</P>
          <BulletList items={[
            '数据保护官（DPO）：统筹数据合规工作',
            '法务代表：提供法律合规意见',
            '技术代表：落实技术合规措施',
            '业务代表：协调业务与合规的平衡',
          ]} />
        </>
      );
    case 'da-6-2':
      return (
        <>
          <SectionH2 id="da-6-2">数据合规制度体系</SectionH2>
          <DataTable
            headers={['制度名称', '主要内容', '适用对象']}
            rows={[
              ['数据安全管理办法', '数据分类分级、安全措施', '全员'],
              ['数据授权管理制度', '数据收集、使用、共享授权流程', '业务部门'],
              ['数据接口安全规范', 'API设计、安全、审计要求', '技术团队'],
              ['数据训练合规规范', '训练数据来源、脱敏、质量要求', '数据团队'],
              ['数据泄露应急响应预案', '泄露发现、报告、处置流程', '全员'],
              ['第三方数据服务商管理', '服务商资质审查、协议要求', '采购/合规'],
            ]}
          />
        </>
      );
    case 'da-6-3':
      return (
        <>
          <SectionH2 id="da-6-3">数据合规年度审计清单</SectionH2>
          <DataTable
            headers={['审计项', '频率', '负责人']}
            rows={[
              ['数据来源合法性审查', '每季度', '数据合规委员会'],
              ['授权链完整性检查', '每季度', '法务'],
              ['技术安全措施有效性', '每半年', '技术安全团队'],
              ['制度执行情况审计', '每半年', '内部审计'],
              ['第三方服务商合规评估', '每年', '采购+合规'],
              ['数据保护影响评估', '每年或重大变更时', 'DPO'],
            ]}
          />
        </>
      );
    case 'da-6-4':
      return (
        <>
          <SectionH2 id="da-6-4">数据合规培训计划</SectionH2>
          <DataTable
            headers={['培训类型', '内容', '对象', '频率']}
            rows={[
              ['全员培训', '数据合规基础、个保法要点', '全体员工', '入职+每年'],
              ['专业培训', '数据分类、接口安全、训练合规', '数据/技术岗', '每季度'],
              ['管理培训', '合规体系、风险管理、监管对接', '管理层', '每半年'],
              ['专项培训', '新法规解读、典型案例分析', '相关岗位', '按需'],
            ]}
          />
        </>
      );
    case 'da-appendix-a':
      return (
        <>
          <SectionH2 id="da-appendix-a">数字员工使用申请表</SectionH2>
          <DataTable
            headers={['申请项', '内容']}
            rows={[
              ['申请人', ''],
              ['部门', ''],
              ['申请数字员工类型', '□财务 □人事 □法务 □市场'],
              ['使用场景描述', ''],
              ['数据使用范围', ''],
              ['预期效果', ''],
              ['申请人签字', ''],
              ['部门负责人审批', ''],
              ['合规负责人审批', ''],
            ]}
          />
        </>
      );
    case 'da-appendix-b':
      return (
        <>
          <SectionH2 id="da-appendix-b">数据训练项目合规审查表</SectionH2>
          <DataTable
            headers={['审查项', '内容', '是否合规']}
            rows={[
              ['数据来源', '', '□是 □否'],
              ['授权链完整性', '', '□是 □否'],
              ['数据脱敏确认', '', '□是 □否'],
              ['个人信息影响评估', '', '□是 □否'],
              ['训练结果测试', '', '□是 □否'],
              ['合规负责人签字', '', ''],
            ]}
          />
        </>
      );
    default:
      return <P className="text-muted-foreground">请选择左侧目录中的章节查看内容。</P>;
  }
}

/* ── Main ContentSection ── */

export default function ContentSection() {
  const [currentBiz, setCurrentBiz] = useState<TBizType>(getCurrentBiz);
  const [currentAnchor, setCurrentAnchor] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Read biz from sessionStorage on mount and when storage changes
  useEffect(() => {
    const biz = getCurrentBiz();
    setCurrentBiz(biz);
    // 不自动设置锚点，让用户手动选择章节
  }, []);

  // Listen for storage changes (cross-tab or same-window via another page)
  useEffect(() => {
    const handler = () => {
      const biz = getCurrentBiz();
      setCurrentBiz(biz);
      // 不自动设置锚点，让用户手动选择章节
    };
    window.addEventListener('storage', handler);
    // Also poll sessionStorage for same-window changes
    const interval = setInterval(handler, 500);
    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, []);

  // Expose setCurrentAnchor for sibling components via custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      if (detail) setCurrentAnchor(detail);
    };
    window.addEventListener('compliance:navigate', handler);
    return () => window.removeEventListener('compliance:navigate', handler);
  }, []);

  // Scroll to top when anchor changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentAnchor, currentBiz]);

  const config = getBizConfig(currentBiz);
  const allItems = config ? flattenTocItems(config.toc) : [];
  const currentIndex = allItems.findIndex((item) => item.anchor === currentAnchor);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const navigateTo = useCallback((anchor: string) => {
    setCurrentAnchor(anchor);
  }, []);

  const renderContent = () => {
    switch (currentBiz) {
      case 'opc':
        return <OpcContent anchor={currentAnchor} />;
      case 'digital-employee':
        return <DigitalEmployeeContent anchor={currentAnchor} />;
      case 'data-analysis':
        return <DataAnalysisContent anchor={currentAnchor} />;
      default:
        return <P className="text-muted-foreground">请选择业务类型和章节。</P>;
    }
  };

  return (
    <section className="w-full flex-1 min-w-0">
      {/* Content scroll area */}
      <div
        ref={contentRef}
        className="h-full overflow-y-auto"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">
          {/* Biz badge */}
          {config && (
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/50 text-accent-foreground text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {config.name}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">
            {renderContent()}
          </div>

          {/* Prev / Next navigation */}
          {(prevItem || nextItem) && (
            <div className="mt-16 pt-6 border-t border-border grid grid-cols-2 gap-4">
              {prevItem ? (
                <button
                  onClick={() => navigateTo(prevItem.anchor)}
                  className="flex flex-col items-start gap-1.5 p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/50 hover:border-primary/30 transition-colors text-left group"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent-foreground">
                    <ChevronLeftIcon className="size-3.5" />
                    上一篇
                  </span>
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-primary line-clamp-1">
                    {prevItem.title}
                  </span>
                </button>
              ) : (
                <div />
              )}
              {nextItem ? (
                <button
                  onClick={() => navigateTo(nextItem.anchor)}
                  className="flex flex-col items-end gap-1.5 p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/50 hover:border-primary/30 transition-colors text-right group"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent-foreground">
                    下一篇
                    <ChevronRightIcon className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-primary line-clamp-1">
                    {nextItem.title}
                  </span>
                </button>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-12 pt-6 border-t border-border">
            <TipBlock variant="info">
              <p className="text-sm text-muted-foreground mb-0 leading-relaxed">
                <Bold>免责声明：</Bold>本手册仅供参考，不构成法律意见。企业在使用相关业务时，应结合自身实际情况，并咨询专业法律顾问的意见。
              </p>
            </TipBlock>
          </div>

          {/* Bottom spacer */}
          <div className="h-20" />
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => {
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border shadow-md text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-lg transition-all active:scale-95"
        aria-label="返回顶部"
      >
        <ArrowUpIcon className="size-4" />
      </button>
    </section>
  );
}
