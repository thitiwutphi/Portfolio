import type { Localized } from '@/i18n/locales'
import type { YearMonth } from '@/lib/date'

import type { CompanyId } from './companies'
import { logos } from './logos'

/** A photo or document shown when a certification / award is expanded. */
export interface ProofImage {
  /** Paths inside public/, without a leading slash. */
  thumb: string
  full: string
  width: number
  height: number
  alt: Localized
  caption: Localized
}

export const education = {
  school: { en: 'Panyapiwat Institute of Management', th: 'สถาบันการจัดการปัญญาภิวัฒน์' },
  degree: {
    en: "Bachelor's Degree, Robotics and Automation Engineering",
    th: 'ปริญญาตรี สาขาวิศวกรรมหุ่นยนต์และระบบอัตโนมัติ',
  },
  start: { year: 2017, month: 5 } satisfies YearMonth,
  end: { year: 2021, month: 2 } satisfies YearMonth,
  /** Projects done while studying are linked from the Education card. */
  company: 'pim' as CompanyId,
  logo: logos.pim,
}

export const certifications = [
  {
    name: {
      en: 'Introduction to Programming using Java',
      th: 'Introduction to Programming using Java',
    },
    issuer: { en: 'Microsoft', th: 'Microsoft' },
    detail: {
      en: 'Microsoft Technology Associate (MTA) · Exam 98-388 · Passed December 16, 2019',
      th: 'Microsoft Technology Associate (MTA) · ข้อสอบ 98-388 · สอบผ่านเมื่อ 16 ธันวาคม 2019',
    },
    logo: logos.java,
    image: {
      thumb: 'images/achievements/mta-java-certificate-thumb.webp',
      full: 'images/achievements/mta-java-certificate.webp',
      width: 945,
      height: 604,
      alt: {
        en: 'Certiport transcript showing the Microsoft Technology Associate certification Introduction to Programming using Java as granted, exam 98-388 passed on 12/16/2019',
        th: 'ใบรับรองผลจาก Certiport แสดงว่าได้รับใบรับรอง Microsoft Technology Associate วิชา Introduction to Programming using Java สอบผ่านข้อสอบ 98-388 เมื่อ 16/12/2019',
      },
      caption: {
        en: 'Certiport digital transcript of the Microsoft Technology Associate certification',
        th: 'ใบรับรองผลดิจิทัลจาก Certiport ของใบรับรอง Microsoft Technology Associate',
      },
    } satisfies ProofImage,
  },
]

export const awards = [
  {
    name: { en: 'PIM All Star', th: 'PIM All Star' },
    issuer: { en: 'Panyapiwat Institute of Management', th: 'สถาบันการจัดการปัญญาภิวัฒน์' },
    image: {
      thumb: 'images/achievements/pim-all-star-thumb.webp',
      full: 'images/achievements/pim-all-star.webp',
      width: 1280,
      height: 853,
      alt: {
        en: 'Thitiwut receiving the PIM All Star award certificate on stage',
        th: 'Thitiwut รับใบประกาศรางวัล PIM All Star บนเวที',
      },
      caption: { en: 'Receiving the PIM All Star award', th: 'ขณะรับรางวัล PIM All Star' },
    } satisfies ProofImage,
  },
]
