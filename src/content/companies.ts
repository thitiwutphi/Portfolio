import type { Localized } from '../i18n/locales.ts'
import { logos, type Logo } from './logos.ts'

export interface Company {
  name: Localized
  /** Used where space is tight, e.g. filter chips. */
  shortName: string
  logo: Logo
}

/** Every organisation in Experience and Projects. Projects refer to these by id. */
export const companies = {
  arv: {
    name: { en: 'AI and Robotics Ventures', th: 'AI and Robotics Ventures' },
    shortName: 'ARV',
    logo: logos.arv,
  },
  pim: {
    name: { en: 'Panyapiwat Institute of Management', th: 'สถาบันการจัดการปัญญาภิวัฒน์' },
    shortName: 'PIM',
    logo: logos.pim,
  },
  rma: {
    name: { en: 'RMA Group Company Limited', th: 'RMA Group Company Limited' },
    shortName: 'RMA Group',
    logo: logos.rma,
  },
  gosoft: {
    name: { en: 'Gosoft (Thailand)', th: 'Gosoft (Thailand)' },
    shortName: 'Gosoft',
    logo: logos.gosoft,
  },
} satisfies Record<string, Company>

export type CompanyId = keyof typeof companies

export const companyIds = Object.keys(companies) as CompanyId[]

export function isCompanyId(value: unknown): value is CompanyId {
  return typeof value === 'string' && Object.hasOwn(companies, value)
}
