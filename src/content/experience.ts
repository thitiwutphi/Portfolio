import type { Localized } from '@/i18n/locales'
import type { YearMonth } from '@/lib/date'

import type { CompanyId } from './companies'

export interface Experience {
  company: CompanyId
  role: Localized
  /** As on LinkedIn. Internships are labelled on the site. */
  employmentType: 'Full-time' | 'Internship'
  start: YearMonth
  /** Omit for a current position. */
  end?: YearMonth
  location: Localized
  highlights: Localized[]
}

export const experience: Experience[] = [
  {
    company: 'arv',
    role: { en: 'Robotics Software Engineer', th: 'วิศวกรซอฟต์แวร์ด้านหุ่นยนต์' },
    employmentType: 'Full-time',
    start: { year: 2024, month: 4 },
    end: { year: 2026, month: 9 },
    location: { en: 'Bangkok City, Thailand', th: 'กรุงเทพมหานคร, ประเทศไทย' },
    highlights: [
      {
        en: 'Architected end-to-end software stack and web monitoring platforms for autonomous quadruped inspection robots.',
        th: 'ออกแบบสถาปัตยกรรมซอฟต์แวร์แบบครบวงจรและแพลตฟอร์มเว็บสำหรับมอนิเตอร์หุ่นยนต์ตรวจสอบสี่ขาอัตโนมัติ',
      },
      {
        en: 'Integrated enterprise drone fleets (Autel Drones) using MAVLink protocols for telemetry and automated flight control.',
        th: 'เชื่อมต่อฝูงโดรนระดับองค์กร (Autel Drones) ผ่านโปรโตคอล MAVLink สำหรับรับส่งข้อมูลเทเลเมทรีและควบคุมการบินอัตโนมัติ',
      },
      {
        en: 'Developed full-stack web and mobile applications using React.js, Node.js, Rust, React Native, and Kotlin for real-time asset management and remote operation.',
        th: 'พัฒนาเว็บและแอปพลิเคชันมือถือแบบ full-stack ด้วย React.js, Node.js, Rust, React Native และ Kotlin สำหรับจัดการทรัพย์สินและควบคุมระยะไกลแบบเรียลไทม์',
      },
      {
        en: 'Engineered ROS-based mobile robot navigation, SLAM, and localization pipelines.',
        th: 'พัฒนาระบบนำทาง SLAM และการระบุตำแหน่งของหุ่นยนต์เคลื่อนที่บน ROS',
      },
    ],
  },
  {
    company: 'pim',
    role: {
      en: 'Senior Technical Officer of Innovation and Invention Excellence Center (IIEC)',
      th: 'เจ้าหน้าที่เทคนิคอาวุโส Innovation and Invention Excellence Center (IIEC)',
    },
    employmentType: 'Full-time',
    start: { year: 2021, month: 4 },
    end: { year: 2024, month: 3 },
    location: { en: 'Nonthaburi, Thailand', th: 'นนทบุรี, ประเทศไทย' },
    highlights: [
      {
        en: 'Designed and deployed indoor/outdoor mobile robots using 2D/3D LiDAR sensors, RTAB-Map, SLAM Toolbox, and Google Cartographer.',
        th: 'ออกแบบและติดตั้งหุ่นยนต์เคลื่อนที่ทั้งในอาคารและกลางแจ้ง โดยใช้เซนเซอร์ LiDAR แบบ 2D/3D ร่วมกับ RTAB-Map, SLAM Toolbox และ Google Cartographer',
      },
      {
        en: 'Integrated depth cameras with IMU sensors for Visual-Inertial Odometry (VIO) and computer vision pipelines.',
        th: 'ผสานกล้องวัดความลึกเข้ากับเซนเซอร์ IMU เพื่อทำ Visual-Inertial Odometry (VIO) และระบบประมวลผลภาพ',
      },
      {
        en: 'Developed embedded Linux boards and custom ROS nodes for robot control.',
        th: 'พัฒนาบอร์ด Embedded Linux และ ROS node เฉพาะทางสำหรับควบคุมหุ่นยนต์',
      },
      {
        en: 'Executed autonomous path planning and navigation using Move Base and Autoware.',
        th: 'พัฒนาการวางแผนเส้นทางและการนำทางอัตโนมัติด้วย Move Base และ Autoware',
      },
    ],
  },
  {
    company: 'rma',
    role: { en: 'Engineer', th: 'วิศวกร' },
    employmentType: 'Internship',
    start: { year: 2020, month: 8 },
    end: { year: 2021, month: 2 },
    location: { en: 'Si Racha', th: 'ศรีราชา, ชลบุรี' },
    highlights: [
      {
        en: 'Developed in-car embedded devices for Ford vehicles (RTOS and CAN bus).',
        th: 'พัฒนาอุปกรณ์ฝังตัวในรถยนต์ Ford (RTOS และ CAN bus)',
      },
      {
        en: 'Designed and built desktop dashboard applications using WPF (C#) for real-time diagnostics.',
        th: 'ออกแบบและพัฒนาแอปพลิเคชันแดชบอร์ดบนเดสก์ท็อปด้วย WPF (C#) สำหรับวินิจฉัยระบบแบบเรียลไทม์',
      },
    ],
  },
  {
    company: 'gosoft',
    role: { en: 'Software Developer', th: 'นักพัฒนาซอฟต์แวร์' },
    employmentType: 'Internship',
    start: { year: 2018, month: 10 },
    end: { year: 2019, month: 5 },
    location: { en: 'Silom, Bangkok', th: 'สีลม' },
    highlights: [
      {
        en: 'Developed an IoT system and devices to connect with other devices through the Modbus protocol.',
        th: 'พัฒนาระบบและอุปกรณ์ IoT ที่เชื่อมต่อกับอุปกรณ์อื่นผ่านโปรโตคอล Modbus',
      },
    ],
  },
]
