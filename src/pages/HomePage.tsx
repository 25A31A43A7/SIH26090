import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ImpactSection } from '../components/home/ImpactSection';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { ArtisanCommunities } from '../components/home/ArtisanCommunities';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      <HeroSection onNavigate={onNavigate} />
      <ImpactSection />
      <FeaturesGrid onNavigate={onNavigate} />
      <ArtisanCommunities onNavigate={onNavigate} />
    </div>
  );
};
