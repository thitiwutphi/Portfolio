import { Award, BadgeCheck, GraduationCap } from 'lucide-react'

import { IconTile } from '@/components/icon-tile'
import { Section } from '@/components/layout/section'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { awards, certifications, education } from '@/content/education'
import { formatPeriod } from '@/lib/date'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & recognition">
      <ul className="grid gap-4 md:grid-cols-3">
        <li>
          <Card className="h-full">
            <CardHeader className="gap-2">
              <IconTile icon={GraduationCap} className="mb-2" />
              <CardTitle className="font-semibold">
                <h3>{education.school}</h3>
              </CardTitle>
              <CardDescription>{education.degree}</CardDescription>
              <p className="font-mono text-xs text-muted-foreground">
                {formatPeriod(education.start, education.end)}
              </p>
            </CardHeader>
          </Card>
        </li>
        {certifications.map((cert) => (
          <li key={cert.name}>
            <Card className="h-full">
              <CardHeader className="gap-2">
                <IconTile icon={BadgeCheck} className="mb-2" />
                <CardTitle className="font-semibold">
                  <h3>{cert.name}</h3>
                </CardTitle>
                <CardDescription>
                  {cert.issuer} · Exam {cert.credentialId}
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
        {awards.map((award) => (
          <li key={award.name}>
            <Card className="h-full">
              <CardHeader className="gap-2">
                <IconTile icon={Award} className="mb-2" />
                <CardTitle className="font-semibold">
                  <h3>{award.name}</h3>
                </CardTitle>
                <CardDescription>{award.issuer}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
