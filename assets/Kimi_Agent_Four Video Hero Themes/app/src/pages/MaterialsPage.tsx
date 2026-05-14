import HeroSection from '@/sections/HeroSection';
import VideoShowcaseSection from '@/sections/VideoShowcaseSection';
import FeaturedSection from '@/sections/FeaturedSection';
import CollectionGridSection from '@/sections/CollectionGridSection';
import BrandStatementSection from '@/sections/BrandStatementSection';
import InstagramCTASection from '@/sections/InstagramCTASection';
import { materialsPage } from '@/data/pages';

export default function MaterialsPage() {
  return (
    <>
      <HeroSection {...materialsPage.hero} />
      <VideoShowcaseSection {...materialsPage.showcase} />
      <FeaturedSection {...materialsPage.featured} />
      <CollectionGridSection {...materialsPage.collection} />
      <BrandStatementSection {...materialsPage.brand} />
      <InstagramCTASection {...materialsPage.instagram} />
    </>
  );
}
