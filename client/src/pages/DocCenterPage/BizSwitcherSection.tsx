import React, { useState, useEffect } from 'react';
import { bizConfigs, type TBizType } from '@shared/static/compliance-data';

const STORAGE_KEY = '__global_compliance_currentBiz';

interface IBizSwitcherSectionProps {
  onBizChange?: (bizType: TBizType) => void;
}

export default function BizSwitcherSection({ onBizChange }: IBizSwitcherSectionProps) {
  const [currentBiz, setCurrentBiz] = useState<TBizType>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && bizConfigs.some((c) => c.bizType === stored)) {
        return stored as TBizType;
      }
    } catch {
      // localStorage 不可用时使用默认值
    }
    return 'opc';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currentBiz);
    } catch {
      // 静默失败
    }
    onBizChange?.(currentBiz);
  }, [currentBiz, onBizChange]);

  return (
    <section className="w-full px-4 py-3 border-b border-sidebar-border">
      <div className="flex items-center gap-1.5">
        {bizConfigs.map((biz) => (
          <button
            key={biz.bizType}
            onClick={() => setCurrentBiz(biz.bizType)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 whitespace-nowrap ${
              currentBiz === biz.bizType
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-foreground/60 hover:text-foreground hover:bg-sidebar-accent'
            }`}
          >
            {biz.name}
          </button>
        ))}
      </div>
    </section>
  );
}
