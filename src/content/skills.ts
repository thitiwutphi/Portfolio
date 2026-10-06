import type { Localized } from '@/i18n/locales'

/*
 * Based on LinkedIn: the profile's Skills section (Web Development, Robotics), the skills tagged on
 * each position (ROS, Navigation, Python, SQL, STM32, C#, Modbus, MQTT) and the technologies named in
 * the experience descriptions and posts. C++, Docker, Git, Problem Solving and Teamwork are from the
 * site design and confirmed by Thitiwut.
 *
 * Technology names stay the same in every language; give a { en, th } pair only for skills that are
 * translated.
 */
export type Skill = string | Localized

/** Always shown in the Top Skills panel — keep this to about 14 so the panel stays compact. */
export const topSkills: Skill[] = [
  'Robotics',
  'ROS',
  'ROS 2',
  'SLAM',
  'Navigation',
  'Computer Vision',
  { en: 'Drones', th: 'โดรน' },
  'C++',
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'Linux',
  { en: 'Web Development', th: 'การพัฒนาเว็บ' },
]

/** Revealed with the "+N more" button. */
export const moreSkills: Skill[] = [
  'MAVLink',
  'Rust',
  'Kotlin',
  'React Native',
  'C#',
  'SQL',
  'STM32',
  'MQTT',
  'Modbus',
  'Docker',
  'Git',
  { en: 'Problem Solving', th: 'การแก้ปัญหา' },
  { en: 'Teamwork', th: 'การทำงานเป็นทีม' },
]

export function skillLabel(skill: Skill, locale: keyof Localized): string {
  return typeof skill === 'string' ? skill : skill[locale]
}
