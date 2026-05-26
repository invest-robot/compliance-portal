import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2Icon, BotIcon, BarChart3Icon, ArrowRightIcon } from 'lucide-react';
import { bizConfigs, type TBizType } from '@shared/static/compliance-data';

const STORAGE_KEY = '__global_compliance_currentBiz';

const iconMap: Record<string, React.ElementType> = {
  Building2: Building2Icon,
  Bot: BotIcon,
  BarChart3: BarChart3Icon,
};

const BizCardsSection: React.FC = () => {
  const navigate = useNavigate();

  const handleBizClick = (bizType: TBizType) => {
    try {
      localStorage.setItem(STORAGE_KEY, bizType);
    } catch {
      // localStorage 不可用时静默失败
    }
    navigate(`/docs`);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bizConfigs.map((biz) => {
          const Icon = iconMap[biz.icon] || Building2Icon;

          return (
            <button
              key={biz.bizType}
              onClick={() => handleBizClick(biz.bizType)}
              className="group text-left w-full bg-card border border-border rounded-lg p-[20px_20px_20px_20px] h-[127px] transition-all duration-200 hover:border-primary/40 hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-200 shrink-0">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {biz.name}
                    </h3>
                    <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {biz.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default BizCardsSection;
