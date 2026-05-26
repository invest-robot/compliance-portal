import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
import {
  getAllTocItems,
  type ITocItem,
  type TBizType,
} from '@shared/static/compliance-data';

interface ITocTreeSectionProps {
  bizType: TBizType;
  activeAnchor: string;
  onAnchorChange: (anchor: string) => void;
}

function stripNumbering(title: string): string {
  return title
    .replace(/^[第]?[一二三四五六七八九十]+[章节]?\s*/, '')
    .replace(/^[一二三四五六七八九十]+[、.]\s*/, '')
    .replace(/^\d+\.\d+\s*/, '')
    .replace(/^\d+\s*[、.]\s*/, '')
    .replace(/^附录[：:A-Z]*\s*/, '附录')
    .trim();
}

export default function TocTreeSection({
  bizType,
  activeAnchor,
  onAnchorChange,
}: ITocTreeSectionProps) {
  const tocItems = getAllTocItems(bizType);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const treeRef = useRef<HTMLDivElement>(null);

  // 当锚点变化时，自动展开包含该锚点的父章节
  useEffect(() => {
    if (activeAnchor) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        tocItems.forEach((item) => {
          if (item.children?.some((child) => child.anchor === activeAnchor)) {
            next.add(item.id);
          }
        });
        return next;
      });
    }
  }, [activeAnchor, tocItems]);

  const toggleExpand = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  const handleItemClick = useCallback(
    (item: ITocItem) => {
      onAnchorChange(item.anchor);
      const targetElement = document.getElementById(item.anchor);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [onAnchorChange]
  );

  const renderTocItem = (item: ITocItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.has(item.id);
    const isActive = activeAnchor === item.anchor;
    const isChildActive =
      hasChildren &&
      item.children?.some(
        (child) =>
          child.anchor === activeAnchor ||
          (child.children?.some((grandchild) => grandchild.anchor === activeAnchor))
      );

    const cleanTitle = stripNumbering(item.title);

    return (
      <div key={item.id}>
        {depth === 0 ? (
          <>
            {/* 一级分组标题 - 只负责展开/折叠，不触发锚点跳转 */}
            <button
              onClick={(e) => {
                if (hasChildren) {
                  toggleExpand(item.id, e);
                }
              }}
              className={`group flex items-center w-full text-left py-2 px-3 transition-colors duration-150 rounded-md ${
                isChildActive
                  ? 'text-foreground font-semibold'
                  : 'text-foreground/70 hover:bg-sidebar-accent hover:text-foreground font-semibold'
              }`}
            >
              {hasChildren && (
                <span className="shrink-0 mr-2 text-muted-foreground">
                  {isExpanded ? (
                    <ChevronDownIcon className="size-3.5" />
                  ) : (
                    <ChevronRightIcon className="size-3.5" />
                  )}
                </span>
              )}
              <span className="flex-1 min-w-0 truncate text-[14px]">{cleanTitle}</span>
            </button>

            {hasChildren && isExpanded && (
              <div className="mt-1 ml-3 space-y-px">
                {item.children!.map((child) => renderTocItem(child, depth + 1))}
              </div>
            )}
          </>
        ) : (
          /* 二级子项 - MiniMax 风格：text-sm, font-normal, 激活态蓝色 */
          <button
            onClick={() => handleItemClick(item)}
            className={`group flex items-center w-full text-left py-1.5 pl-5 pr-3 transition-colors duration-150 text-[13px] rounded-md ${
              isActive
                ? 'text-primary font-medium bg-primary/5'
                : 'text-foreground/60 hover:text-foreground hover:bg-sidebar-accent font-normal'
            }`}
          >
            <span className="flex-1 min-w-0 truncate">{cleanTitle}</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <section
      ref={treeRef}
      className="w-full"
    >
      <div className="py-4 space-y-1">
        {tocItems.map((item) => renderTocItem(item, 0))}
      </div>
    </section>
  );
}
