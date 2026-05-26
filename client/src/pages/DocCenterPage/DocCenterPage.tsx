import React, { useState, useCallback, useEffect } from 'react';
import BizSwitcherSection from './BizSwitcherSection';
import TocTreeSection from './TocTreeSection';
import ContentSection from './ContentSection';
import { type TBizType } from '@shared/static/compliance-data';

const STORAGE_KEY = '__global_compliance_currentBiz';

export default function DocCenterPage() {
  const [currentBiz, setCurrentBiz] = useState<TBizType>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['opc', 'digital-employee', 'data-analysis'].includes(stored)) {
        return stored as TBizType;
      }
    } catch {
      // 静默失败
    }
    return 'opc';
  });

  const [activeAnchor, setActiveAnchor] = useState<string>('');

  // 监听业务切换
  const handleBizChange = useCallback((bizType: TBizType) => {
    setCurrentBiz(bizType);
    setActiveAnchor('');
    try {
      localStorage.setItem(STORAGE_KEY, bizType);
      sessionStorage.setItem(STORAGE_KEY, bizType);
    } catch {
      // 静默失败
    }
    // 通知 ContentSection 业务已切换
    window.dispatchEvent(new CustomEvent('compliance:bizChange', { detail: bizType }));
  }, []);

  // 监听锚点变化
  const handleAnchorChange = useCallback((anchor: string) => {
    setActiveAnchor(anchor);
    // 通知 ContentSection 导航到指定锚点
    window.dispatchEvent(new CustomEvent('compliance:navigate', { detail: anchor }));
  }, []);

  // 初始化时设置 sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, currentBiz);
    } catch {
      // 静默失败
    }
    // 禁用自动锚点跳转，让用户手动选择章节
  }, [currentBiz]);

  return (
    <div className="flex w-full h-full">
      {/* Left Sidebar */}
      <aside className="w-72 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-[calc(100vh-64px)] sticky top-16">
        <BizSwitcherSection onBizChange={handleBizChange} />
        <div className="flex-1 overflow-y-auto">
          <TocTreeSection
            bizType={currentBiz}
            activeAnchor={activeAnchor}
            onAnchorChange={handleAnchorChange}
          />
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 overflow-auto bg-background h-full">
        <ContentSection />
      </main>
    </div>
  );
}
