import type { YearMonth } from '@/lib/date'

export const education = {
  school: 'Panyapiwat Institute of Management',
  degree: "Bachelor's degree, Robotics and Automation Engineering",
  start: { year: 2017, month: 5 } satisfies YearMonth,
  end: { year: 2021, month: 2 } satisfies YearMonth,
} as const

export const certifications = [
  {
    name: 'Microsoft Technology Associate: Introduction to Programming using Java',
    issuer: 'Microsoft',
    credentialId: '98-388',
  },
] as const

export const awards = [
  { name: 'PIM All Star', issuer: 'Panyapiwat Institute of Management' },
] as const
