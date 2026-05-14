import HeroSection from '@/sections/HeroSection';
import VideoShowcaseSection from '@/sections/VideoShowcaseSection';
import FeaturedSection from '@/sections/FeaturedSection';
import CollectionGridSection from '@/sections/CollectionGridSection';
import BrandStatementSection from '@/sections/BrandStatementSection';
import InstagramCTASection from '@/sections/InstagramCTASection';
import { stillLifePage } from '@/data/pages';

export default function StillLifePage() {
  return (
    <>
      <HeroSection {...stillLifePage.hero} />
      <VideoShowcaseSection {...stillLifePage.showcase} />
      <FeaturedSection {...stillLifePage.featured} />
      <CollectionGridSection {...stillLifePage.collection} />
      <BrandStatementSection {...stillLifePage.brand} />
      <InstagramCTASection {...stillLifePage.instagram} />
    </>
  );
}
