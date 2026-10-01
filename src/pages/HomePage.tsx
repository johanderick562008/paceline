import { ArrivalsSection } from '../components/home/ArrivalsSection'
import { CategorySection } from '../components/home/CategorySection'
import { ExploreSection } from '../components/home/ExploreSection'
import { HeroSection } from '../components/home/HeroSection'
import { StorySection } from '../components/home/StorySection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle()
  return (
    <div className="pb-20 md:pb-24">
      <HeroSection />
      <CategorySection />
      <ArrivalsSection />
      <StorySection />
      <ExploreSection />
    </div>
  )
}
