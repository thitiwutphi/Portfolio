import type { Localized } from '../i18n/locales.ts'
import type { CompanyId } from './companies.ts'

/** A photo. Paths are inside public/, without a leading slash. */
export interface ProjectImage {
  type: 'image'
  /** Full size, long edge about 1600px. */
  src: string
  /** About 640px wide, for cards. Falls back to `src`. */
  thumb?: string
  width: number
  height: number
  alt: Localized
  caption?: Localized
}

/** A video file in public/ (keep it short and small — GitHub Pages has a 100 MB file limit). */
export interface ProjectVideo {
  type: 'video'
  /** .mp4 (H.264) plays everywhere. */
  src: string
  /** Still image shown before playing and on cards. */
  poster?: string
  width: number
  height: number
  title: Localized
  caption?: Localized
  /** WebVTT subtitles (.vtt) for videos with speech. */
  captions?: string
}

/** A YouTube video, embedded from youtube-nocookie.com only when the visitor presses play. */
export interface ProjectYouTube {
  type: 'youtube'
  /** The id from youtube.com/watch?v=<id> */
  id: string
  title: Localized
  caption?: Localized
}

export type ProjectMedia = ProjectImage | ProjectVideo | ProjectYouTube

export interface ProjectLink {
  label: Localized
  url: string
}

export interface Project {
  /** Used in the URL: /projects/<slug> */
  slug: string
  title: Localized
  summary: Localized
  /** Where the project was done — required for every project. */
  company: CompanyId
  /** e.g. '2024 – 2026' */
  period?: string
  /** Shown in Featured Projects on the home page. */
  featured?: boolean
  /** Photos and videos. The first one is the cover on cards. */
  media?: ProjectMedia[]
  highlights?: Localized[]
  tech?: string[]
  learned?: Localized
  /** Press coverage, demos, repositories… */
  links?: ProjectLink[]
}

/**
 * Projects, newest first. Example:
 *
 *   {
 *     slug: 'laika-s',
 *     title: { en: 'LAIKA-S', th: 'LAIKA-S' },
 *     summary: { en: '…', th: '…' },
 *     company: 'arv',
 *     period: '2024 – 2026',
 *     featured: true,
 *     media: [
 *       { type: 'image', src: 'images/projects/laika-s/1.webp', thumb: 'images/projects/laika-s/1-thumb.webp',
 *         width: 1600, height: 1067, alt: { en: '…', th: '…' } },
 *       { type: 'youtube', id: 'dQw4w9WgXcQ', title: { en: '…', th: '…' } },
 *     ],
 *   }
 */
export const projects: Project[] = [
  {
    slug: 'industrial-inspection-robots',
    title: {
      en: 'Industrial Inspection Robot & Robot Dog',
      th: 'หุ่นยนต์ตรวจสอบในโรงงานอุตสาหกรรมและหุ่นยนต์สุนัข',
    },
    summary: {
      en: 'Wheeled mobile robots and quadruped robot dogs, including ARV’s LAIKA-S, that inspect dangerous areas in industrial facilities — from offshore platforms to power plants — so people don’t have to go there. They carry PTZ, thermal, OGI and acoustic cameras and gas sensors, and run inspection missions autonomously or by remote control.',
      th: 'หุ่นยนต์เคลื่อนที่แบบล้อและหุ่นยนต์สุนัขสี่ขา รวมถึง LAIKA-S ของ ARV ที่ตรวจสอบพื้นที่อันตรายในโรงงานอุตสาหกรรม ตั้งแต่แท่นผลิตนอกชายฝั่งจนถึงโรงไฟฟ้า เพื่อไม่ให้คนต้องเข้าไปในพื้นที่เหล่านั้น ติดตั้งกล้อง PTZ กล้องถ่ายภาพความร้อน กล้อง OGI กล้องอะคูสติก และเซนเซอร์ตรวจจับแก๊ส ทำภารกิจตรวจสอบได้ทั้งแบบอัตโนมัติและควบคุมระยะไกล',
    },
    company: 'arv',
    featured: true,
    // Videos and photos from June 2025 to June 2026.
    period: '2025 – 2026',
    media: [
      {
        type: 'image',
        src: 'images/projects/inspection-robots/robot-dog-switchgear-hall.webp',
        thumb: 'images/projects/inspection-robots/robot-dog-switchgear-hall-thumb.webp',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Thitiwut in orange coveralls giving a thumbs up behind a quadruped robot with a PTZ camera, in a power plant switchgear hall',
          th: 'Thitiwut ในชุดหมีสีส้มชูนิ้วโป้งอยู่หลังหุ่นยนต์สี่ขาที่ติดกล้อง PTZ ในห้องสวิตช์เกียร์ของโรงไฟฟ้า',
        },
        caption: {
          en: 'With the robot dog in a 230 kV switchgear hall at a power plant',
          th: 'กับหุ่นยนต์สุนัขในห้องสวิตช์เกียร์ 230 kV ของโรงไฟฟ้า',
        },
      },
      {
        type: 'video',
        src: 'videos/inspection-robots/offshore-mission.mp4',
        poster: 'images/projects/inspection-robots/offshore-mission-poster.webp',
        width: 1280,
        height: 720,
        title: {
          en: 'A quadruped robot climbing stairs and inspecting equipment on an offshore platform',
          th: 'หุ่นยนต์สี่ขาเดินขึ้นบันไดและตรวจสอบอุปกรณ์บนแท่นผลิตนอกชายฝั่ง',
        },
        caption: {
          en: 'Autonomous inspection mission on an offshore platform (6× speed)',
          th: 'ภารกิจตรวจสอบอัตโนมัติบนแท่นผลิตนอกชายฝั่ง (เร่งความเร็ว 6 เท่า)',
        },
      },
      {
        type: 'video',
        src: 'videos/inspection-robots/power-plant-patrol.mp4',
        poster: 'images/projects/inspection-robots/power-plant-patrol-poster.webp',
        width: 720,
        height: 1280,
        title: {
          en: 'A robot dog walking through the 230 kV switchgear hall of a combined-cycle power plant',
          th: 'หุ่นยนต์สุนัขเดินผ่านห้องสวิตช์เกียร์ 230 kV ของโรงไฟฟ้าพลังความร้อนร่วม',
        },
        caption: {
          en: 'Patrolling a combined-cycle power plant',
          th: 'ลาดตระเวนในโรงไฟฟ้าพลังความร้อนร่วม',
        },
      },
      {
        type: 'video',
        src: 'videos/inspection-robots/inspection-platform.mp4',
        poster: 'images/projects/inspection-robots/inspection-platform-poster.webp',
        width: 1280,
        height: 720,
        title: {
          en: 'The inspection web platform showing a robot’s live camera feeds during a mission, and gauge detection results',
          th: 'แพลตฟอร์มเว็บสำหรับงานตรวจสอบ แสดงภาพสดจากกล้องของหุ่นยนต์ระหว่างภารกิจ และผลการตรวจจับเกจวัด',
        },
        caption: {
          en: 'The inspection platform: live 360° camera feeds and gauge detection',
          th: 'แพลตฟอร์มงานตรวจสอบ: ภาพสดจากกล้อง 360° และการตรวจจับเกจวัด',
        },
      },
      {
        type: 'video',
        src: 'videos/inspection-robots/hydrogen-fat.mp4',
        poster: 'images/projects/inspection-robots/hydrogen-fat-poster.webp',
        width: 1280,
        height: 720,
        title: {
          en: 'Mission control during the LAIKA hydrogen factory acceptance test, with live camera feeds and gauge readings',
          th: 'ระบบควบคุมภารกิจระหว่างการทดสอบรับรองระบบ (FAT) ของ LAIKA สำหรับงานไฮโดรเจน พร้อมภาพสดจากกล้องและค่าที่อ่านได้จากเกจวัด',
        },
        caption: {
          en: 'LAIKA hydrogen factory acceptance test (FAT): mission control with live camera feeds (4× speed)',
          th: 'การทดสอบรับรองระบบ (FAT) ของ LAIKA สำหรับงานไฮโดรเจน: ระบบควบคุมภารกิจพร้อมภาพสดจากกล้อง (เร่งความเร็ว 4 เท่า)',
        },
      },
      {
        type: 'image',
        src: 'images/projects/inspection-robots/robot-dog-ptz-payload.webp',
        thumb: 'images/projects/inspection-robots/robot-dog-ptz-payload-thumb.webp',
        width: 900,
        height: 1600,
        alt: {
          en: 'Close-up of a quadruped robot with a PTZ camera mounted on its back',
          th: 'ภาพระยะใกล้ของหุ่นยนต์สี่ขาที่ติดกล้อง PTZ ไว้ด้านบน',
        },
        caption: {
          en: 'The PTZ camera payload on the robot dog',
          th: 'กล้อง PTZ ที่ติดตั้งบนหุ่นยนต์สุนัข',
        },
      },
      {
        type: 'image',
        src: 'images/projects/inspection-robots/outdoor-patrol-selfie.webp',
        thumb: 'images/projects/inspection-robots/outdoor-patrol-selfie-thumb.webp',
        width: 1600,
        height: 900,
        alt: {
          en: 'Selfie of Thitiwut in a hard hat, with a quadruped robot walking along a path outdoors behind him',
          th: 'เซลฟีของ Thitiwut สวมหมวกนิรภัย โดยมีหุ่นยนต์สี่ขาเดินอยู่บนทางเดินกลางแจ้งด้านหลัง',
        },
        caption: { en: 'Outdoor patrol at the power plant', th: 'ลาดตระเวนกลางแจ้งในโรงไฟฟ้า' },
      },
    ],
    highlights: [
      {
        en: 'Upgraded the robot systems to ROS 2.',
        th: 'อัปเกรดระบบของหุ่นยนต์ไปใช้ ROS 2',
      },
      {
        en: 'Integrated specialized inspection sensors: PTZ, thermal, OGI and acoustic cameras, and gas sensors.',
        th: 'เชื่อมต่อเซนเซอร์สำหรับงานตรวจสอบโดยเฉพาะ ได้แก่ กล้อง PTZ กล้องถ่ายภาพความร้อน กล้อง OGI กล้องอะคูสติก และเซนเซอร์ตรวจจับแก๊ส',
      },
      {
        en: 'Developed the mission control logic for inspection missions.',
        th: 'พัฒนาลอจิกระบบควบคุมภารกิจ (Mission Control) สำหรับงานตรวจสอบ',
      },
    ],
    tech: [
      'ROS 2',
      '2D/3D SLAM',
      '2D/3D Navigation',
      'Mission Control',
      'PTZ Camera',
      'Thermal Camera',
      'Gas Sensor',
      'OGI Camera',
      'Acoustic Camera',
    ],
    links: [
      {
        label: {
          en: 'ARV: Quadrupedal Inspection Robot LAIKA-S',
          th: 'ARV: หุ่นยนต์ตรวจสอบสี่ขา LAIKA-S',
        },
        url: 'https://arv.co.th/en/product-areas/product/8',
      },
    ],
  },
  {
    slug: 'drone-fleet-control-center',
    title: {
      en: 'Drone Fleet Control Center',
      th: 'ศูนย์ควบคุมฝูงโดรน',
    },
    summary: {
      en: 'A control center that receives data from many Autel drones at once and sends them commands, with a map dashboard, a device list and AI-detected events (such as people) to review. A mobile app installed on each drone’s remote controller connects the drone to the platform.',
      th: 'ศูนย์ควบคุมที่รับข้อมูลและสั่งงานโดรน Autel ได้หลายลำพร้อมกัน มีแดชบอร์ดแผนที่ รายการอุปกรณ์ และเหตุการณ์ที่ AI ตรวจพบ (เช่น บุคคล) ให้ตรวจสอบ พร้อมแอปมือถือที่ติดตั้งบนรีโมตคอนโทรลของโดรนแต่ละลำ เพื่อเชื่อมต่อโดรนเข้ากับแพลตฟอร์ม',
    },
    company: 'arv',
    // Screenshots show events from March 2026; the video was recorded in June 2026.
    period: '2026',
    media: [
      {
        type: 'image',
        src: 'images/projects/drone-fleet-control-center/event-detection.webp',
        thumb: 'images/projects/drone-fleet-control-center/event-detection-thumb.webp',
        width: 1721,
        height: 1235,
        alt: {
          en: 'Event view: a drone camera image of a city street with a detected person highlighted, with verification status, detection summary and tracker details',
          th: 'หน้ารายละเอียดเหตุการณ์: ภาพจากกล้องโดรนของถนนในเมือง มีกรอบระบุบุคคลที่ตรวจพบ พร้อมสถานะการตรวจสอบ สรุปการตรวจจับ และข้อมูลการติดตาม',
        },
        caption: {
          en: 'An event detected by a drone, ready for review',
          th: 'เหตุการณ์ที่โดรนตรวจพบ รอการตรวจสอบ',
        },
      },
      {
        type: 'video',
        src: 'videos/drone-fleet-control-center/remote-and-platform.mp4',
        poster: 'images/projects/drone-fleet-control-center/remote-and-platform-poster.webp',
        width: 1280,
        height: 720,
        title: {
          en: 'The platform on a laptop next to an Autel remote controller running the mobile app',
          th: 'แพลตฟอร์มบนแล็ปท็อป ข้างรีโมตคอนโทรลของโดรน Autel ที่รันแอปมือถือ',
        },
        caption: {
          en: 'The mobile app on the drone’s remote controller, connected to the platform',
          th: 'แอปมือถือบนรีโมตคอนโทรลของโดรน ที่เชื่อมต่อกับแพลตฟอร์ม',
        },
      },
      {
        type: 'image',
        src: 'images/projects/drone-fleet-control-center/dashboard-map.webp',
        thumb: 'images/projects/drone-fleet-control-center/dashboard-map-thumb.webp',
        width: 1722,
        height: 1232,
        alt: {
          en: 'Dashboard: a map of Southeast Asia with detected events on the left and 29 devices operating',
          th: 'แดชบอร์ด: แผนที่เอเชียตะวันออกเฉียงใต้ พร้อมรายการเหตุการณ์ที่ตรวจพบด้านซ้าย และอุปกรณ์ที่กำลังทำงาน 29 เครื่อง',
        },
        caption: {
          en: 'Dashboard with the map, detected events and devices in operation',
          th: 'แดชบอร์ดพร้อมแผนที่ เหตุการณ์ที่ตรวจพบ และอุปกรณ์ที่กำลังทำงาน',
        },
      },
      {
        type: 'image',
        src: 'images/projects/drone-fleet-control-center/device-list.webp',
        thumb: 'images/projects/drone-fleet-control-center/device-list-thumb.webp',
        width: 1722,
        height: 1231,
        alt: {
          en: 'Device list showing Autel EVO Max drones',
          th: 'รายการอุปกรณ์ แสดงโดรน Autel EVO Max',
        },
        caption: {
          en: 'The fleet: Autel EVO Max drones registered on the platform',
          th: 'ฝูงโดรน: โดรน Autel EVO Max ที่ลงทะเบียนในแพลตฟอร์ม',
        },
      },
    ],
    highlights: [
      {
        en: 'Built a control center that receives data from and sends commands to many drones at the same time.',
        th: 'พัฒนาศูนย์ควบคุมที่รับข้อมูลและสั่งงานโดรนหลายลำได้พร้อมกัน',
      },
      {
        en: 'Integrated Autel drones into the platform.',
        th: 'เชื่อมต่อโดรน Autel เข้ากับแพลตฟอร์ม',
      },
      {
        en: 'Developed a mobile app that runs on the drone’s remote controller and connects it to the platform.',
        th: 'พัฒนาแอปมือถือที่ติดตั้งบนรีโมตคอนโทรลของโดรน เพื่อเชื่อมต่อเข้ากับแพลตฟอร์ม',
      },
    ],
    tech: ['Autel Drones', 'Mobile App', 'Fleet Management'],
  },
  {
    slug: 'autonomous-mobile-manipulator',
    title: {
      en: 'Autonomous Mobile Manipulator Robot',
      th: 'หุ่นยนต์ Autonomous Mobile Manipulator',
    },
    summary: {
      en: 'OURANOS, ARV’s second-generation autonomous mobile manipulator for offshore wellhead platforms. It carries out routine surveys and inspections, collects samples, services equipment and helps restart the platform — teleoperated or on autonomous missions, using AI to understand its surroundings — so people need to travel offshore less often.',
      th: 'OURANOS หุ่นยนต์ Autonomous Mobile Manipulator รุ่นที่ 2 ของ ARV สำหรับแท่นหลุมผลิตปิโตรเลียมนอกชายฝั่ง ทำงานสำรวจและตรวจสอบประจำวัน เก็บตัวอย่าง บำรุงรักษาอุปกรณ์ และช่วยเริ่มการทำงานของแท่น ได้ทั้งแบบควบคุมระยะไกลและแบบภารกิจอัตโนมัติ โดยใช้ AI รับรู้สภาพแวดล้อม ช่วยลดความจำเป็นที่คนต้องเดินทางไปยังแท่นนอกชายฝั่ง',
    },
    company: 'arv',
    // The video was recorded in January 2025.
    period: '2025',
    media: [
      {
        type: 'image',
        src: 'images/projects/autonomous-mobile-manipulator/ouranos.webp',
        thumb: 'images/projects/autonomous-mobile-manipulator/ouranos-thumb.webp',
        width: 1080,
        height: 1350,
        alt: {
          en: 'OURANOS: a blue mobile robot with a vertical lift and a robotic arm with a gripper on a steel base',
          th: 'OURANOS: หุ่นยนต์เคลื่อนที่สีน้ำเงิน มีแกนยกแนวตั้งและแขนกลพร้อมมือจับ บนฐานเหล็ก',
        },
        caption: { en: 'OURANOS (product image: ARV)', th: 'OURANOS (ภาพผลิตภัณฑ์: ARV)' },
      },
      {
        type: 'video',
        src: 'videos/autonomous-mobile-manipulator/autonomous-run.mp4',
        poster: 'images/projects/autonomous-mobile-manipulator/autonomous-run-poster.webp',
        width: 720,
        height: 1280,
        title: {
          en: 'The robot driving autonomously around the lab, with its map and logs on screen',
          th: 'หุ่นยนต์เคลื่อนที่อัตโนมัติรอบห้องแล็บ พร้อมแผนที่และ log บนหน้าจอ',
        },
        caption: {
          en: 'Autonomous run in the lab (2× speed)',
          th: 'การเคลื่อนที่อัตโนมัติในห้องแล็บ (เร่งความเร็ว 2 เท่า)',
        },
      },
    ],
    links: [
      {
        label: { en: 'ARV: OURANOS product page', th: 'ARV: หน้าผลิตภัณฑ์ OURANOS' },
        url: 'https://arv.co.th/en/product-areas/product/4',
      },
    ],
  },
  {
    slug: '3d-lidar-slam',
    title: { en: '3D LiDAR SLAM', th: 'ระบบ 3D LiDAR SLAM' },
    summary: {
      en: 'My own 3D SLAM package for ROS 2 that maps an area and localizes a mobile robot using a 3D LiDAR and an IMU. It corrects scan distortion with the IMU, aligns scans with a choice of NDT, GICP, VGICP or small_gicp, and optimizes the map as a pose graph with g2o.',
      th: 'แพ็กเกจ 3D SLAM บน ROS 2 ที่ผมพัฒนาเอง ใช้สร้างแผนที่และระบุตำแหน่งของหุ่นยนต์เคลื่อนที่ด้วย 3D LiDAR และ IMU แก้ความบิดเบี้ยวของสแกนด้วยข้อมูล IMU จับคู่สแกนด้วย NDT, GICP, VGICP หรือ small_gicp ตามที่ตั้งค่า และปรับแผนที่ให้แม่นยำด้วย pose graph บน g2o',
    },
    company: 'arv',
    // Repository history: November 2024 – January 2025; the demo was recorded in December 2024.
    period: '2024 – 2025',
    media: [
      {
        type: 'video',
        src: 'videos/3d-slam/mapping-synced.mp4',
        poster: 'images/projects/3d-slam/mapping-synced-poster.webp',
        width: 1558,
        height: 720,
        title: {
          en: 'Mapping a room in real time: the sensor rig being moved around on the left, the point-cloud map and trajectory being built in RViz on the right',
          th: 'สร้างแผนที่ห้องแบบเรียลไทม์: ด้านซ้ายคือชุดเซนเซอร์ที่ถูกเคลื่อนไปรอบห้อง ด้านขวาคือแผนที่ point cloud และเส้นทางที่ถูกสร้างขึ้นใน RViz',
        },
        caption: {
          en: 'Live mapping — camera and RViz recorded at the same time and played side by side',
          th: 'การสร้างแผนที่แบบเรียลไทม์ — ภาพจากกล้องและหน้าจอ RViz ที่บันทึกพร้อมกัน แสดงคู่กัน',
        },
      },
    ],
    highlights: [
      {
        en: 'Built a LiDAR-inertial SLAM package in C++ for ROS 2, with separate nodes for mapping and for localizing in a saved map.',
        th: 'พัฒนาแพ็กเกจ LiDAR-inertial SLAM ด้วย C++ บน ROS 2 แยกโหนดสำหรับการสร้างแผนที่ และการระบุตำแหน่งบนแผนที่ที่บันทึกไว้',
      },
      {
        en: 'Removed motion distortion from LiDAR scans using IMU data.',
        th: 'แก้ความบิดเบี้ยวของสแกน LiDAR ที่เกิดจากการเคลื่อนที่ ด้วยข้อมูลจาก IMU',
      },
      {
        en: 'Made the scan-matching backend configurable: NDT (OpenMP), Fast GICP, VGICP or small_gicp.',
        th: 'ออกแบบให้เลือกอัลกอริทึมจับคู่สแกนได้ ได้แก่ NDT (OpenMP), Fast GICP, VGICP หรือ small_gicp',
      },
      {
        en: 'Built the map from submaps and optimized it as a pose graph with g2o.',
        th: 'สร้างแผนที่จาก submap และปรับให้แม่นยำด้วย pose graph บน g2o',
      },
      {
        en: 'Supported Ouster, Velodyne and Livox LiDARs.',
        th: 'รองรับ LiDAR ของ Ouster, Velodyne และ Livox',
      },
    ],
    tech: ['ROS 2', 'C++', 'PCL', 'Eigen', 'g2o', 'NDT', 'Fast GICP', '3D LiDAR', 'IMU'],
  },
  {
    slug: 'rfid-mobile-robot',
    title: { en: 'RFID Mobile Robot', th: 'หุ่นยนต์เคลื่อนที่ RFID' },
    summary: {
      en: 'A mobile robot with an RFID reader that uses radio waves to detect tags, helping with indoor navigation, position tracking and automated inventory counting.',
      th: 'หุ่นยนต์เคลื่อนที่ที่ติดตั้งเครื่องอ่าน RFID ใช้คลื่นวิทยุตรวจจับแท็ก ช่วยในการนำทางภายในอาคาร การติดตามตำแหน่ง และการนับสินค้าคงคลังอัตโนมัติ',
    },
    company: 'arv',
    // Photos and video from August 2024.
    period: '2024',
    media: [
      {
        type: 'video',
        src: 'videos/rfid-robot/robot-test.mp4',
        poster: 'images/projects/rfid-robot/robot-test-poster.webp',
        width: 720,
        height: 1280,
        title: {
          en: 'Testing the RFID robot, with its web dashboard showing camera feeds, status and the map',
          th: 'ทดสอบหุ่นยนต์ RFID พร้อมแดชบอร์ดบนเว็บที่แสดงภาพจากกล้อง สถานะ และแผนที่',
        },
        caption: {
          en: 'Test run with the web dashboard (2× speed)',
          th: 'การทดสอบพร้อมแดชบอร์ดบนเว็บ (เร่งความเร็ว 2 เท่า)',
        },
      },
      {
        type: 'image',
        src: 'images/projects/rfid-robot/lab-test-area.webp',
        thumb: 'images/projects/rfid-robot/lab-test-area-thumb.webp',
        width: 1600,
        height: 900,
        alt: {
          en: 'Lab tables with sample bottles; the RFID robot with its antennas stands by the window on the right',
          th: 'โต๊ะในห้องแล็บที่มีขวดตัวอย่าง หุ่นยนต์ RFID พร้อมเสาอากาศตั้งอยู่ริมหน้าต่างทางขวา',
        },
        caption: {
          en: 'The test area: sample bottles on the tables, the robot by the window',
          th: 'พื้นที่ทดสอบ: ขวดตัวอย่างบนโต๊ะ และหุ่นยนต์ริมหน้าต่าง',
        },
      },
      {
        type: 'image',
        src: 'images/projects/rfid-robot/sample-bottles.webp',
        thumb: 'images/projects/rfid-robot/sample-bottles-thumb.webp',
        width: 1600,
        height: 900,
        alt: {
          en: 'Sample bottles spread across long lab tables',
          th: 'ขวดตัวอย่างวางกระจายอยู่บนโต๊ะยาวในห้องแล็บ',
        },
      },
    ],
    tech: ['ROS 2', 'Zebra RFID', 'Python', 'MQTT', 'Robot Platform'],
  },
  {
    slug: 'mobile-manipulator-robot',
    title: {
      en: 'Mobile Manipulator Robot',
      th: 'หุ่นยนต์ Mobile Manipulator',
    },
    summary: {
      en: 'A mobile robot with a robotic arm that assists scientists in the lab: it takes voice commands, finds sample bottles with a wrist-mounted depth camera, delivers them to the workbench and tidies them away afterwards. Built for ASSIST, a lab assistant robot project by ARV, VISTEC, VISAI and PTTEP, with ARV providing the mobile robot platform.',
      th: 'หุ่นยนต์เคลื่อนที่พร้อมแขนกลที่ช่วยงานนักวิทยาศาสตร์ในห้องปฏิบัติการ รับคำสั่งด้วยเสียง ค้นหาขวดตัวอย่างด้วยกล้องวัดความลึกที่ข้อมือของแขนกล นำไปส่งที่โต๊ะทำงาน และจัดเก็บคืนเมื่อใช้เสร็จ พัฒนาให้โครงการ ASSIST หุ่นยนต์ผู้ช่วยในห้องปฏิบัติการ ซึ่งเป็นความร่วมมือระหว่าง ARV, VISTEC, VISAI และ ปตท.สผ. โดย ARV รับผิดชอบแพลตฟอร์มหุ่นยนต์เคลื่อนที่',
    },
    company: 'arv',
    // Photos taken in May 2024, the month after joining ARV.
    period: '2024',
    media: [
      {
        type: 'image',
        src: 'images/projects/mobile-manipulator-robot/robot-with-sample-bottles.webp',
        thumb: 'images/projects/mobile-manipulator-robot/robot-with-sample-bottles-thumb.webp',
        width: 900,
        height: 1600,
        alt: {
          en: 'The mobile manipulator robot: a blue mobile base carrying sample bottles, with a robotic arm, next to a lab workstation',
          th: 'หุ่นยนต์ Mobile Manipulator: ฐานเคลื่อนที่สีน้ำเงินบรรทุกขวดตัวอย่าง พร้อมแขนกล อยู่ข้างโต๊ะทำงานในห้องแล็บ',
        },
        caption: {
          en: 'Carrying sample bottles in the lab',
          th: 'บรรทุกขวดตัวอย่างในห้องปฏิบัติการ',
        },
      },
      {
        type: 'image',
        src: 'images/projects/mobile-manipulator-robot/workflow.webp',
        width: 600,
        height: 400,
        alt: {
          en: 'Workflow diagram: 1 voice command to the SCIM system, 2 object detection at the shelf, 3 delivery to the empty zone on the scientist’s bench, 4 tidying the objects away',
          th: 'แผนภาพการทำงาน: 1 สั่งงานด้วยเสียงผ่านระบบ SCIM, 2 ตรวจจับวัตถุที่ชั้นวาง, 3 นำไปส่งที่พื้นที่ว่างบนโต๊ะของนักวิทยาศาสตร์, 4 จัดเก็บวัตถุคืนที่',
        },
        caption: {
          en: 'How it works: voice command → object detection → delivery → tidy up',
          th: 'ขั้นตอนการทำงาน: สั่งงานด้วยเสียง → ตรวจจับวัตถุ → นำส่ง → จัดเก็บคืน',
        },
      },
      {
        type: 'image',
        src: 'images/projects/mobile-manipulator-robot/arm-at-workbench.webp',
        thumb: 'images/projects/mobile-manipulator-robot/arm-at-workbench-thumb.webp',
        width: 900,
        height: 1600,
        alt: {
          en: 'The robotic arm reaching over a lab workstation with a sample bottle',
          th: 'แขนกลยื่นไปเหนือโต๊ะทำงานในห้องแล็บพร้อมขวดตัวอย่าง',
        },
        caption: {
          en: 'The arm working at the lab workstation',
          th: 'แขนกลทำงานที่โต๊ะในห้องปฏิบัติการ',
        },
      },
      {
        type: 'image',
        src: 'images/projects/mobile-manipulator-robot/robot-in-meeting-space.webp',
        thumb: 'images/projects/mobile-manipulator-robot/robot-in-meeting-space-thumb.webp',
        width: 1600,
        height: 900,
        alt: {
          en: 'A meeting space with long tables; the mobile manipulator robot stands at the back on the right',
          th: 'พื้นที่ประชุมที่มีโต๊ะยาว หุ่นยนต์ Mobile Manipulator ตั้งอยู่ด้านหลังทางขวา',
        },
      },
    ],
    tech: ['ROS 2', 'Python', 'MoveIt 2'],
    links: [
      {
        label: {
          en: 'VISTEC BRAIN Lab: ASSIST project',
          th: 'VISTEC BRAIN Lab: โครงการ ASSIST',
        },
        url: 'https://brain.vistec.ac.th/research/projects/trl-4-6/assist-project/',
      },
    ],
  },
  {
    slug: 'outdoor-delivery-robot',
    title: { en: 'Outdoor Delivery Robot', th: 'หุ่นยนต์ส่งของกลางแจ้ง' },
    summary: {
      en: 'An autonomous outdoor robot that delivers goods from 7-Eleven convenience stores, developed with CP ALL. It maps its surroundings in 3D with LiDAR and drives itself, carrying two orders per trip.',
      th: 'หุ่นยนต์อัตโนมัติกลางแจ้งที่ส่งสินค้าจากร้านสะดวกซื้อ 7-Eleven พัฒนาร่วมกับ CP ALL สร้างแผนที่ 3 มิติด้วย LiDAR และขับเคลื่อนได้เอง บรรทุกได้ครั้งละ 2 ออเดอร์',
    },
    company: 'pim',
    featured: true,
    // Videos from May 2022, photos from Sep–Nov 2022, Brand Inside article from 22 Aug 2022.
    period: '2022',
    media: [
      {
        type: 'image',
        src: 'images/projects/outdoor-delivery-robot/robot-front.webp',
        thumb: 'images/projects/outdoor-delivery-robot/robot-front-thumb.webp',
        width: 1600,
        height: 1066,
        alt: {
          en: 'The white, green and orange 7-Eleven delivery robot with a 3D LiDAR on top and depth cameras on the front',
          th: 'หุ่นยนต์ส่งของ 7-Eleven สีขาว เขียว และส้ม มี 3D LiDAR อยู่ด้านบนและกล้องวัดความลึกอยู่ด้านหน้า',
        },
        caption: {
          en: 'The robot: 3D LiDAR on top, depth cameras at the front',
          th: 'ตัวหุ่นยนต์: 3D LiDAR ด้านบน กล้องวัดความลึกด้านหน้า',
        },
      },
      {
        type: 'video',
        src: 'videos/outdoor-delivery-robot/night-delivery.mp4',
        poster: 'images/projects/outdoor-delivery-robot/night-delivery-poster.webp',
        width: 720,
        height: 1280,
        title: {
          en: 'A night delivery: the robot arrives and the customer opens it with the app',
          th: 'ส่งของตอนกลางคืน: หุ่นยนต์มาถึงและลูกค้าเปิดรับของผ่านแอป',
        },
        caption: {
          en: 'A full delivery at night — the robot arrives and the order is collected through the app',
          th: 'การส่งของครบทั้งรอบตอนกลางคืน หุ่นยนต์มาถึงและลูกค้ารับของผ่านแอป',
        },
      },
      {
        type: 'video',
        src: 'videos/outdoor-delivery-robot/3d-mapping.mp4',
        poster: 'images/projects/outdoor-delivery-robot/3d-mapping-poster.webp',
        width: 1280,
        height: 720,
        title: {
          en: 'Building a 3D point-cloud map of the area with the LiDAR',
          th: 'สร้างแผนที่ point cloud 3 มิติของพื้นที่ด้วย LiDAR',
        },
        caption: {
          en: '3D mapping of the route from LiDAR point clouds',
          th: 'การสร้างแผนที่ 3 มิติของเส้นทางจาก point cloud ของ LiDAR',
        },
      },
      {
        type: 'video',
        src: 'videos/outdoor-delivery-robot/night-drive.mp4',
        poster: 'images/projects/outdoor-delivery-robot/night-drive-poster.webp',
        width: 720,
        height: 1280,
        title: {
          en: 'The robot driving itself past the gate barrier at night',
          th: 'หุ่นยนต์ขับเคลื่อนเองผ่านไม้กั้นทางเข้าตอนกลางคืน',
        },
        caption: {
          en: 'Driving autonomously past the gate at night',
          th: 'ขับเคลื่อนอัตโนมัติผ่านทางเข้าตอนกลางคืน',
        },
      },
      {
        type: 'image',
        src: 'images/projects/outdoor-delivery-robot/campus-road.webp',
        thumb: 'images/projects/outdoor-delivery-robot/campus-road-thumb.webp',
        width: 696,
        height: 464,
        alt: {
          en: 'The delivery robot on a road in front of an office tower, next to a 7-Eleven exit sign',
          th: 'หุ่นยนต์ส่งของบนถนนหน้าอาคารสำนักงาน ข้างป้ายทางออก 7-Eleven',
        },
      },
      {
        type: 'image',
        src: 'images/projects/outdoor-delivery-robot/field-work.webp',
        thumb: 'images/projects/outdoor-delivery-robot/field-work-thumb.webp',
        width: 1600,
        height: 1067,
        alt: {
          en: 'Thitiwut kneeling with a laptop, working on the delivery robot outdoors',
          th: 'Thitiwut คุกเข่าพร้อมแล็ปท็อป ขณะทำงานกับหุ่นยนต์ส่งของกลางแจ้ง',
        },
      },
      {
        type: 'image',
        src: 'images/projects/outdoor-delivery-robot/robot-in-lab.webp',
        thumb: 'images/projects/outdoor-delivery-robot/robot-in-lab-thumb.webp',
        width: 1600,
        height: 900,
        alt: {
          en: 'The delivery robot in the lab, seen from the side',
          th: 'หุ่นยนต์ส่งของในห้องแล็บ มุมด้านข้าง',
        },
      },
      {
        type: 'image',
        src: 'images/projects/outdoor-delivery-robot/with-the-robot.webp',
        thumb: 'images/projects/outdoor-delivery-robot/with-the-robot-thumb.webp',
        width: 828,
        height: 1472,
        alt: {
          en: 'Thitiwut sitting on the delivery robot in the lab, giving a thumbs up',
          th: 'Thitiwut นั่งบนหุ่นยนต์ส่งของในห้องแล็บและชูนิ้วโป้ง',
        },
      },
    ],
    highlights: [
      {
        en: 'Set up the 3D mapping and navigation systems with ROS and Autoware.',
        th: 'ติดตั้งและตั้งค่าระบบสร้างแผนที่และนำทางแบบ 3 มิติด้วย ROS และ Autoware',
      },
      {
        en: 'Integrated the sensors: 3D LiDAR, IMU and depth cameras.',
        th: 'เชื่อมต่อเซนเซอร์ต่าง ๆ ได้แก่ 3D LiDAR, IMU และกล้องวัดความลึก',
      },
      {
        en: 'Handled the challenges of driving outdoors, outside controlled indoor spaces.',
        th: 'รับมือกับความท้าทายของการขับเคลื่อนกลางแจ้ง ซึ่งต่างจากพื้นที่ในอาคารที่ควบคุมได้',
      },
    ],
    tech: ['ROS', 'Autoware', '3D LiDAR', 'IMU', 'Depth Camera', '3D SLAM', '3D Navigation'],
    learned: {
      en: '3D navigation in open spaces, sensor fusion, and handling outdoor challenges.',
      th: 'การนำทางแบบ 3 มิติในพื้นที่เปิด การผสานข้อมูลเซนเซอร์ และการรับมือกับความท้าทายของงานกลางแจ้ง',
    },
    links: [
      {
        label: {
          en: 'Brand Inside: CP ALL’s Outdoor Delivery Robot, navigated by AI with no driver (in Thai)',
          th: 'Brand Inside: เปิดแนวคิด “หุ่นยนต์ส่งของสุดคิ้วท์” Outdoor Delivery Robot จาก CP-ALL ใช้ AI นำทาง ไร้คนขับ',
        },
        url: 'https://brandinside.asia/outdoor-delivery-robot-by-cpall/',
      },
    ],
  },
  {
    slug: 'medical-delivery-robot',
    title: {
      en: 'Medical Delivery Robot (COVID-19 Relief)',
      th: 'หุ่นยนต์ส่งอาหารและยาช่วงโควิด-19',
    },
    summary: {
      en: 'A line-following indoor robot that delivers food and medicine to COVID-19 patients safely, reading RFID tags to stop at each room. Built with Charoenkrung Pracharak Hospital for the “Ward Cowit 2020” project.',
      th: 'หุ่นยนต์เดินตามเส้นภายในอาคาร ส่งอาหารและยาให้ผู้ป่วยโควิด-19 อย่างปลอดภัย โดยอ่านแท็ก RFID เพื่อหยุดที่ห้องผู้ป่วยแต่ละห้อง พัฒนาร่วมกับโรงพยาบาลเจริญกรุงประชารักษ์ในโครงการ “วอร์ด Cowit 2020”',
    },
    company: 'pim',
    // The videos (May 2020), the photo (July 2020) and the news article (29 July 2020) all date it to 2020.
    period: '2020',
    media: [
      {
        type: 'image',
        src: 'images/projects/medical-delivery-robot/robots-in-ward.webp',
        thumb: 'images/projects/medical-delivery-robot/robots-in-ward-thumb.webp',
        width: 1600,
        height: 1200,
        alt: {
          en: 'Two delivery robots with tablet faces wearing face masks, standing on the guide lines in a hospital ward',
          th: 'หุ่นยนต์ส่งของ 2 ตัวที่มีหน้าจอแท็บเล็ตเป็นใบหน้าใส่หน้ากากอนามัย ยืนอยู่บนเส้นนำทางในวอร์ดโรงพยาบาล',
        },
        caption: {
          en: 'The two robots in the hospital ward',
          th: 'หุ่นยนต์ทั้ง 2 ตัวในวอร์ดโรงพยาบาล',
        },
      },
      {
        type: 'video',
        src: 'videos/medical-delivery-robot/ward-run.mp4',
        poster: 'images/projects/medical-delivery-robot/ward-run-poster.webp',
        width: 720,
        height: 1280,
        title: {
          en: 'The robot following the guide line along the ward corridor',
          th: 'หุ่นยนต์เดินตามเส้นนำทางไปตามทางเดินในวอร์ด',
        },
        caption: {
          en: 'Following the line along the ward corridor and turning into a room',
          th: 'เดินตามเส้นไปตามทางเดินในวอร์ดและเลี้ยวเข้าห้องผู้ป่วย',
        },
      },
      {
        type: 'video',
        src: 'videos/medical-delivery-robot/lab-test.mp4',
        poster: 'images/projects/medical-delivery-robot/lab-test-poster.webp',
        width: 540,
        height: 960,
        title: {
          en: 'Testing the robot with a load of supplies in the lab',
          th: 'ทดสอบหุ่นยนต์พร้อมของที่ต้องส่งในห้องแล็บ',
        },
        caption: {
          en: 'Line-following test in the lab, carrying supplies',
          th: 'ทดสอบการเดินตามเส้นในห้องแล็บ พร้อมบรรทุกของ',
        },
      },
    ],
    highlights: [
      {
        en: 'Built the basic embedded software for the robot.',
        th: 'พัฒนาซอฟต์แวร์ฝังตัวพื้นฐานของหุ่นยนต์',
      },
      {
        en: 'Programmed the delivery logic as a state machine.',
        th: 'เขียนลอจิกการส่งของด้วย State Machine',
      },
      {
        en: 'Tuned PID control for smooth movement along the line.',
        th: 'ปรับจูนการควบคุม PID ให้หุ่นยนต์เคลื่อนที่ตามเส้นได้อย่างราบรื่น',
      },
    ],
    tech: ['Arduino', 'RFID', 'State Machine', 'PID Control'],
    learned: {
      en: 'Basic microcontrollers, embedded systems, and PID tuning to control robot movement.',
      th: 'พื้นฐานไมโครคอนโทรลเลอร์ ระบบฝังตัว และการจูน PID เพื่อควบคุมการเคลื่อนที่ของหุ่นยนต์',
    },
    links: [
      {
        label: {
          en: 'TrueplookPanya: PIM Robotics Engineering and Charoenkrung Pracharak Hospital create “Ward Cowit 2020” (in Thai)',
          th: 'ทรูปลูกปัญญา: วิศวะ หุ่นยนต์ฯ พีไอเอ็ม จับมือ รพ. เจริญกรุงประชารักษ์ คิดค้น “วอร์ด Cowit 2020”',
        },
        url: 'https://www.trueplookpanya.com/dhamma/content/83252-scieng-sci-',
      },
    ],
  },
]
