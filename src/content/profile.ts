import type { Localized } from '../i18n/locales.ts'

export interface Profile {
  name: string
  role: Localized
  location: Localized
  phone: string
  /** E.164 form of `phone`, used for tel: links. */
  phoneHref: string
  email: string
  photo: string
  summary: Localized
  banner: {
    image: string
    imageAlt: Localized
    /** Headline over the photo, one entry per line. */
    headline: Localized<string[]>
    tagline: Localized
  }
  footerTagline: Localized
  links: { linkedin: string; linkedinLabel: string; github: string }
}

export const profile: Profile = {
  name: 'Thitiwut Phimpisai',
  role: { en: 'Robotics Software Engineer', th: 'วิศวกรซอฟต์แวร์ด้านหุ่นยนต์' },
  location: { en: 'Bangkok Metropolitan Area', th: 'เขตปริมณฑลกรุงเทพมหานคร' },
  phone: '0637300458',
  phoneHref: 'tel:+66637300458',
  email: 'thitiwutphi@gmail.com',
  photo: 'images/profile.webp',
  summary: {
    en: 'Driven by a deep passion for programming and robotics, my academic background and professional career have been dedicated entirely to this field. My expertise encompasses web and mobile application development, as well as indoor and outdoor mobile robotic systems. Confident in my technical capabilities and efficiency, I am committed to continuous learning and keeping pace with modern technological advancements.',
    th: 'ด้วยความหลงใหลในการเขียนโปรแกรมและหุ่นยนต์ ผมจึงทุ่มเททั้งการศึกษาและการทำงานให้กับสายงานนี้มาโดยตลอด ความเชี่ยวชาญของผมครอบคลุมการพัฒนาเว็บและแอปพลิเคชันมือถือ รวมถึงระบบหุ่นยนต์เคลื่อนที่ทั้งในอาคารและกลางแจ้ง ผมมั่นใจในความสามารถทางเทคนิคและการทำงานอย่างมีประสิทธิภาพ และมุ่งมั่นเรียนรู้อย่างต่อเนื่องเพื่อก้าวทันเทคโนโลยีสมัยใหม่',
  },
  banner: {
    image: 'images/hero-robot.webp',
    imageAlt: {
      en: 'ARV quadruped inspection robot standing outdoors',
      th: 'หุ่นยนต์ตรวจสอบสี่ขาของ ARV ยืนอยู่กลางแจ้ง',
    },
    headline: { en: ['Robotics', 'Software', 'Engineer'], th: ['วิศวกรซอฟต์แวร์', 'ด้านหุ่นยนต์'] },
    tagline: {
      en: 'Build Smarter Robots for a Better Tomorrow',
      th: 'สร้างหุ่นยนต์ที่ฉลาดขึ้น เพื่ออนาคตที่ดีกว่า',
    },
  },
  footerTagline: { en: 'Build Smarter Robots', th: 'สร้างหุ่นยนต์ที่ฉลาดขึ้น' },
  links: {
    linkedin: 'https://www.linkedin.com/in/thitiwut-phimpisai-02bb00299',
    linkedinLabel: 'www.linkedin.com/in/thitiwut-phimpisai-02bb00299',
    github: 'https://github.com/thitiwutphi',
  },
}
