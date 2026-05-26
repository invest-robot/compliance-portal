import React from 'react';
import HeroSection from './HeroSection';
import BizCardsSection from './BizCardsSection';
import QuickLinksSection from './QuickLinksSection';

const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0">
      <section className="w-full">
        <HeroSection />
      </section>
      <section className="w-full">
        <BizCardsSection />
      </section>
      <section className="w-full">
        <QuickLinksSection />
      </section>
    </div>
  );
};

export default HomePage;
