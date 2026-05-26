import React from 'react';
import { ShieldIcon, MailIcon } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <section className="w-full border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Brand & Version */}
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
              <ShieldIcon className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">企业合规门户</h3>
              <p className="text-xs text-muted-foreground mt-1">
                版本号：V1.0 · 发布日期：2026年5月
              </p>
            </div>
          </div>

          {/* Center: Disclaimer */}
          <div className="flex-1 max-w-md">
            <p className="text-xs text-muted-foreground leading-relaxed">
              本手册仅供参考，不构成法律意见。企业在使用相关业务时，应结合自身实际情况，并咨询专业法律顾问的意见。
            </p>
          </div>

          {/* Right: Contact */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MailIcon className="size-4 shrink-0" />
            <span>compliance@example.com</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 企业合规门户. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
