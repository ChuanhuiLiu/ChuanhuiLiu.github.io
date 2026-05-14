import HeroSection from '@/sections/HeroSection';
import VideoShowcaseSection from '@/sections/VideoShowcaseSection';
import FeaturedSection from '@/sections/FeaturedSection';
import CollectionGridSection from '@/sections/CollectionGridSection';
import BrandStatementSection from '@/sections/BrandStatementSection';
import InstagramCTASection from '@/sections/InstagramCTASection';
import { metalPartsPage } from '@/data/pages';

export default function MetalPartsPage() {
  return (
    <>
      <HeroSection {...metalPartsPage.hero} />
      <VideoShowcaseSection {...metalPartsPage.showcase} />
      <FeaturedSection {...metalPartsPage.featured} />
      <CollectionGridSection {...metalPartsPage.collection} />
      <BrandStatementSection {...metalPartsPage.brand} />
      <InstagramCTASection {...metalPartsPage.instagram} />
    </>
  );
}
