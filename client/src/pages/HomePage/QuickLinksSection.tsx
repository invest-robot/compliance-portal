import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, FileTextIcon, ClipboardCheckIcon, ShieldCheckIcon, BookOpenIcon, ArrowRightIcon } from 'lucide-react';

interface IQuickLinkItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  bizType: 'opc' | 'digital-employee' | 'data-analysis';
  anchor: string;
}

const quickLinks: IQuickLinkItem[] = [
  {
    title: '合规运营年度日历',
    description: '全年税务申报、工商年报、社保缴纳等关键时间节点一览',
    icon: <CalendarIcon className="size-5" />,
    bizType: 'opc',
    anchor: 'opc-appendix-a',
  },
  {
    title: '合规自查打分表',
    description: '100分制合规自检清单，快速评估企业合规健康度',
    icon: <ClipboardCheckIcon className="size-5" />,
    bizType: 'opc',
    anchor: 'opc-appendix-b',
  },
  {
    title: '政策补贴申请指南',
    description: '深圳/龙岗地区创业补贴、场租补贴、社保补贴申请条件与流程',
    icon: <FileTextIcon className="size-5" />,
    bizType: 'opc',
    anchor: 'opc-6-1',
  },
  {
    title: '数字员工合规审查表',
    description: '财务、人事、法务、市场数字员工使用前的合规审查清单',
    icon: <ShieldCheckIcon className="size-5" />,
    bizType: 'digital-employee',
    anchor: 'de-2-3',
  },
  {
    title: '数据训练合规审查表',
    description: '模型训练数据来源合法性、授权链完整性、脱敏处理确认',
    icon: <BookOpenIcon className="size-5" />,
    bizType: 'data-analysis',
    anchor: 'da-4-3',
  },
  {
    title: '常用政府官网查询渠道',
    description: '税务、市场监管、人社、中小企业服务等官方政策查询入口',
    icon: <FileTextIcon className="size-5" />,
    bizType: 'opc',
    anchor: 'opc-appendix-c',
  },
];

export default function QuickLinksSection() {
  const navigate = useNavigate();

  const handleLinkClick = (bizType: string, anchor: string) => {
    sessionStorage.setItem('__global_compliance_currentBiz', bizType);
    sessionStorage.setItem('__global_compliance_anchor', anchor);
    navigate('/docs');
  };

  return (
    <section className="w-full py-12 md:py-16 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-medium text-[#f67905] mb-2">
            快速指引
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(link.bizType, link.anchor)}
              className="group flex items-start gap-4 p-5 rounded-lg border border-border bg-card text-left transition-all duration-200 hover:border-primary/40 hover:bg-accent active:scale-[0.99]"
            >
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-200">
                {link.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                  {link.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {link.description}
                </p>
              </div>

              <ArrowRightIcon className="shrink-0 size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
