import { AboutIntro } from '../components/about/AboutIntro'
import { CtaSection } from '../components/about/CtaSection'
import { FoundersSection } from '../components/about/FoundersSection'
import { MissionSection } from '../components/about/MissionSection'
import { TimelineSection } from '../components/about/TimelineSection'
import { ValuesSection } from '../components/about/ValuesSection'
import { VisitUsSection } from '../components/about/VisitUsSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function AboutPage() {
  useDocumentTitle('Our Story')
  return (
    <>
      <AboutIntro />
      <MissionSection />
      <ValuesSection />
      <TimelineSection />
      <VisitUsSection />
      <FoundersSection />
      <CtaSection />
    </>
  )
}
