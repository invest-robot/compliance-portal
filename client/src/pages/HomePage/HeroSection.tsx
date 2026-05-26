import React, { useState } from 'react';
import { SearchIcon, ShieldIcon, ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/docs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="w-full bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#f66c07] tracking-tight">九章合规手册</h1>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8">
            <div className="relative group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索合规条款、政策指引、自查清单..."
                className="w-full h-12 pl-12 pr-12 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 transition-colors"
                aria-label="搜索"
              >
                <ArrowRightIcon className="size-4" />
              </button>
            </div>
          </form>

          {/* Subtitle */}
          <p className="text-lg text-[#f3960b] max-w-2xl mx-auto leading-relaxed">三大业务合规： opc公司运营、AI数字员工、数据分析  </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
