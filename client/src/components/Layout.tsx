import { ActiveLink } from '@lark-apaas/client-toolkit/components/ActiveLink';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomeIcon, BookOpenIcon, MenuIcon, XIcon } from 'lucide-react';

const navItems = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '/docs', label: '合规文档', icon: BookOpenIcon },
];

const Layout = () => {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80 border-b border-sidebar-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo & Title */}
          <ActiveLink to="/" className="flex items-center gap-2.5 no-underline">
          </ActiveLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <ActiveLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/60 hover:text-foreground hover:bg-accent/50'
                  }`
                }
              >
                <item.icon className="size-4" />
                <span className="font-semibold">{item.label}</span>
              </ActiveLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {mobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-sidebar-border bg-sidebar">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <ActiveLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-md text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground/60 hover:text-foreground hover:bg-accent/50'
                    }`
                  }
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </ActiveLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
