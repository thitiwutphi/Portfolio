export const profile = {
  name: 'Thitiwut Phimpisai',
  firstName: 'Thitiwut',
  initials: 'TP',
  role: 'Robotics Software Engineer',
  location: 'Bangkok Metropolitan Area, Thailand',
  tagline:
    'I build the software that takes robots out of the lab and into the field — from motor control and SLAM to platforms that run whole fleets in real time.',
  about: [
    'Driven by a deep passion for programming and robotics, I have dedicated both my studies and my career to this field — from a line-following Arduino robot in university to full-stack fleet management for multi-robot platforms today.',
    'My work spans indoor and outdoor mobile robots, quadruped inspection robots, and the web and mobile applications that monitor and control them.',
    'Robotics is growing every day. The best part of my job is learning new tech stacks to solve real-world problems.',
  ],
  email: 'thitiwutphimpisai@gmail.com',
  links: {
    github: 'https://github.com/thitiwutphi',
    linkedin: 'https://www.linkedin.com/in/thitiwut-phimpisai-02bb00299',
  },
} as const

export type FocusIcon = 'navigation' | 'inspection' | 'fleet' | 'ai'

export interface FocusArea {
  title: string
  description: string
  icon: FocusIcon
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Autonomous navigation',
    description: 'SLAM, localization and path planning for indoor and outdoor mobile robots.',
    icon: 'navigation',
  },
  {
    title: 'Inspection robotics',
    description:
      'Quadruped and wheeled robots with PTZ, thermal, OGI and acoustic cameras and gas sensors.',
    icon: 'inspection',
  },
  {
    title: 'Fleet platforms',
    description:
      'Real-time web and mobile apps for missions, telemetry and live video from many robots.',
    icon: 'fleet',
  },
  {
    title: 'Edge AI',
    description: 'Object detection, OCR, LLMs and VLMs running on robot hardware.',
    icon: 'ai',
  },
]
