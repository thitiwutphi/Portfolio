import type { YearMonth } from '@/lib/date'

export interface Experience {
  company: string
  role: string
  employmentType: 'Full-time' | 'Internship'
  start: YearMonth
  /** Omit for a current position. */
  end?: YearMonth
  location: string
  highlights: string[]
  skills: string[]
  projectSlugs?: string[]
}

export const experience: Experience[] = [
  {
    company: 'AI and Robotics Ventures',
    role: 'Robotics Software Engineer',
    employmentType: 'Full-time',
    start: { year: 2024, month: 4 },
    end: { year: 2026, month: 9 },
    location: 'Bangkok, Thailand · On-site',
    highlights: [
      'Architected end-to-end software stack and web monitoring platforms for autonomous quadruped inspection robots.',
      'Integrated enterprise drone fleets (Autel Drones) using MAVLink protocols for telemetry and automated flight control.',
      'Developed full-stack web and mobile applications utilizing React.js, Node.js, Rust, React Native, and Kotlin to enable real-time asset management and remote operation.',
      'Engineered ROS-based mobile robot navigation, SLAM, and localization pipelines for autonomous field operations.',
    ],
    skills: [
      'ROS 2',
      'Navigation',
      'SLAM',
      'MAVLink',
      'React',
      'Node.js',
      'Rust',
      'React Native',
      'Kotlin',
    ],
    projectSlugs: ['inspection-robots', 'fleet-platform', 'edge-ai'],
  },
  {
    company: 'Panyapiwat Institute of Management',
    role: 'Senior Technical Officer, Innovation and Invention Excellence Center (IIEC)',
    employmentType: 'Full-time',
    start: { year: 2021, month: 4 },
    end: { year: 2024, month: 3 },
    location: 'Nonthaburi, Thailand · On-site',
    highlights: [
      'Designed and deployed indoor/outdoor mobile robots using 2D/3D LiDAR sensors, RTAB-Map, SLAM Toolbox, and Google Cartographer for high-precision mapping and localization.',
      'Integrated depth cameras with IMU sensors to implement Visual-Inertial Odometry (VIO) alongside computer vision pipelines for real-time object detection, tracking, and recognition.',
      'Developed embedded Linux boards and custom ROS nodes to manage robot kinematics, implementing PID control algorithms for motor RPM regulation and encoder-based odometry.',
      'Executed autonomous path planning and navigation frameworks using Move Base and Autoware.',
    ],
    skills: [
      'ROS',
      'Python',
      'SQL',
      'RTAB-Map',
      'SLAM Toolbox',
      'Cartographer',
      'Autoware',
      'Computer Vision',
    ],
    projectSlugs: ['outdoor-delivery-robot'],
  },
  {
    company: 'RMA Group Company Limited',
    role: 'Engineer, Product Development',
    employmentType: 'Internship',
    start: { year: 2020, month: 8 },
    end: { year: 2021, month: 2 },
    location: 'Sriracha, Chonburi, Thailand · On-site',
    highlights: [
      'Developed in-car embedded devices for Ford vehicles operating on Real-Time Operating Systems (RTOS) and CAN bus protocol communications.',
      'Designed and built desktop dashboard applications using WPF (C#) for real-time vehicle diagnostics and device monitoring.',
    ],
    skills: ['STM32', 'RTOS', 'CAN Bus', 'C#', 'WPF'],
    projectSlugs: ['in-vehicle-device'],
  },
  {
    company: 'Gosoft (Thailand)',
    role: 'Software Developer',
    employmentType: 'Internship',
    start: { year: 2018, month: 10 },
    end: { year: 2019, month: 5 },
    location: 'Silom, Bangkok, Thailand · On-site',
    highlights: [
      'Developed an IoT system and devices that connect with other equipment through the Modbus protocol.',
    ],
    skills: ['Modbus', 'MQTT', 'IoT'],
    projectSlugs: ['iot-gateway'],
  },
]
