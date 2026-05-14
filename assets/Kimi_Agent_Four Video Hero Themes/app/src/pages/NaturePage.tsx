import HeroSection from '@/sections/HeroSection';
import VideoShowcaseSection from '@/sections/VideoShowcaseSection';
import FeaturedSection from '@/sections/FeaturedSection';
import CollectionGridSection from '@/sections/CollectionGridSection';
import BrandStatementSection from '@/sections/BrandStatementSection';
import InstagramCTASection from '@/sections/InstagramCTASection';
import { naturePage } from '@/data/pages';

export default function NaturePage() {
  return (
    <>
      <HeroSection {...naturePage.hero} />
      <VideoShowcaseSection {...naturePage.showcase} />
      <FeaturedSection {...naturePage.featured} />
      <CollectionGridSection {...naturePage.collection} />
      <BrandStatementSection {...naturePage.brand} />
      <InstagramCTASection {...naturePage.instagram} />
    </>
  );
}
