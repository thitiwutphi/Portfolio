export type ProjectIcon = 'quadruped' | 'fleet' | 'ai' | 'delivery' | 'medical' | 'vehicle' | 'iot'

export interface Project {
  slug: string
  title: string
  summary: string
  /** Where the work was done, e.g. a company or "University project". */
  context?: string
  period?: string
  featured: boolean
  icon: ProjectIcon
  highlights: string[]
  tech: string[]
  learned?: string
  press?: string[]
}

export const projects: Project[] = [
  {
    slug: 'inspection-robots',
    title: 'Industrial Inspection Robots',
    summary:
      'Software stack and web monitoring platform for autonomous quadruped (LAIKA-S) and wheeled inspection robots that work in dangerous industrial areas.',
    context: 'AI and Robotics Ventures',
    period: '2024 – 2026',
    featured: true,
    icon: 'quadruped',
    highlights: [
      'Architected the end-to-end software stack and web monitoring platform for LAIKA-S, an autonomous quadruped inspection robot.',
      'Moved the robot stack to ROS 2 for safer and faster communication.',
      'Integrated specialized inspection sensors — PTZ, thermal, OGI and acoustic cameras, plus gas sensors.',
      'Worked with 2D/3D SLAM and a mission control system to run inspection missions.',
    ],
    tech: [
      'ROS 2',
      '2D/3D SLAM',
      'Mission Control',
      'PTZ Camera',
      'Thermal Camera',
      'OGI Camera',
      'Acoustic Camera',
      'Gas Sensor',
    ],
    learned:
      'Upgrading to ROS 2 for safer and faster communication, and reading data from specialized sensors.',
  },
  {
    slug: 'fleet-platform',
    title: 'Robot & Drone Fleet Platform',
    summary:
      'Real-time mission and fleet management that connects multiple robots and drones, streams their video feeds and powers low-latency dashboards.',
    context: 'AI and Robotics Ventures',
    period: '2024 – 2026',
    featured: true,
    icon: 'fleet',
    highlights: [
      'Connected multiple robots to one platform in real time with WebSockets, Socket.IO, MQTT and gRPC.',
      'Streamed robot video feeds and built real-time web dashboards with low latency.',
      'Integrated enterprise drone fleets (Autel Drones) using MAVLink for telemetry and automated flight control.',
      'Developed web and mobile apps with React, Node.js, Rust, React Native and Kotlin for real-time asset management and remote operation.',
    ],
    tech: [
      'React',
      'Node.js',
      'Rust',
      'React Native',
      'Kotlin',
      'WebSockets',
      'Socket.IO',
      'MQTT',
      'gRPC',
      'MAVLink',
    ],
    learned:
      'Becoming a full-stack developer to connect multiple robots, stream video feeds, and build real-time dashboards with low latency.',
  },
  {
    slug: 'edge-ai',
    title: 'AI Perception for Robots',
    summary:
      'Robots should not just move from point A to point B — they need to understand what they see. Adding modern AI models to robots running on edge hardware.',
    featured: true,
    icon: 'ai',
    highlights: [
      'Added object detection and OCR so robots can recognize what they see.',
      'Integrated LLMs and vision-language models (VLMs) to help robots understand natural language and their environment.',
      'Ran AI models on edge hardware on board the robot.',
    ],
    tech: ['Object Detection', 'OCR', 'LLMs', 'VLMs', 'Edge AI'],
    learned:
      'Running AI on edge hardware and helping robots understand natural language and their environment.',
  },
  {
    slug: 'outdoor-delivery-robot',
    title: 'Outdoor Delivery Robot for 7-Eleven',
    summary:
      'An autonomous outdoor delivery robot for convenience stores, developed for 7-Eleven (CP ALL). Complex outdoor environments called for 3D sensing and navigation.',
    context: 'Panyapiwat Institute of Management',
    period: '2021 – 2024',
    featured: true,
    icon: 'delivery',
    highlights: [
      'Built 3D navigation for open, complex outdoor spaces using ROS.',
      'Fused 3D LiDAR, IMU and depth-camera data with 3D SLAM for reliable localization.',
      'Handled the challenges of operating outdoors rather than in controlled indoor spaces.',
    ],
    tech: ['ROS', '3D LiDAR', 'IMU', 'Depth Camera', '3D SLAM', '3D Navigation', 'Sensor Fusion'],
    learned: '3D navigation in open spaces, sensor fusion, and handling outdoor challenges.',
    press: [
      'Featured by Brand Inside — “Outdoor Delivery Robot from CP ALL, navigated by AI, no driver needed”.',
      'CP ALL launch video for the new 7-Eleven delivery robot — 56K views.',
    ],
  },
  {
    slug: 'covid-ward-robot',
    title: 'COVID-19 Ward Delivery Robot',
    summary:
      'My first robot: a line-following robot that delivered food and medicine to COVID-19 patients, showcased in the “Ward Cowit 20” project.',
    context: 'University project',
    featured: false,
    icon: 'medical',
    highlights: [
      'Built a line-following delivery robot using Arduino, RFID and a state machine.',
      'Tuned PID control to keep the robot moving smoothly along its route.',
      'The main goal was to make it work quickly for patients and staff.',
    ],
    tech: ['Arduino', 'RFID', 'State Machine', 'PID Control'],
    learned: 'Basic microcontrollers, embedded systems, and PID tuning to control robot movement.',
  },
  {
    slug: 'in-vehicle-device',
    title: 'In-Vehicle Embedded Device for Ford',
    summary:
      'Embedded in-car devices for Ford vehicles, plus desktop dashboards for real-time vehicle diagnostics.',
    context: 'RMA Group',
    period: '2020 – 2021',
    featured: false,
    icon: 'vehicle',
    highlights: [
      'Developed in-car embedded devices for Ford vehicles running on a real-time operating system with CAN bus communication.',
      'Built WPF (C#) desktop dashboards for real-time vehicle diagnostics and device monitoring.',
    ],
    tech: ['STM32', 'RTOS', 'CAN Bus', 'C#', 'WPF'],
  },
  {
    slug: 'iot-gateway',
    title: 'Smart IoT Gateway',
    summary: 'An IoT gateway and devices that connect to other equipment over Modbus.',
    context: 'Gosoft (Thailand)',
    period: '2018 – 2019',
    featured: false,
    icon: 'iot',
    highlights: [
      'Developed an IoT system and devices that communicate with other equipment through the Modbus protocol.',
    ],
    tech: ['Modbus', 'MQTT', 'IoT'],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** "Company · 2024 – 2026", or whichever parts are known. */
export function projectContext(project: Project): string | undefined {
  const parts = [project.context, project.period].filter(Boolean)
  return parts.length > 0 ? parts.join(' · ') : undefined
}
