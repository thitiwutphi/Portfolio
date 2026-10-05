export interface SkillGroup {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Robotics & autonomy',
    skills: [
      'ROS',
      'ROS 2',
      'SLAM',
      'RTAB-Map',
      'SLAM Toolbox',
      'Cartographer',
      'Move Base',
      'Autoware',
      'Sensor Fusion',
      'Visual-Inertial Odometry',
      'PID Control',
      'MAVLink',
    ],
  },
  {
    title: 'Perception & AI',
    skills: ['Computer Vision', 'Object Detection', 'Object Tracking', 'OCR', 'LLMs', 'VLMs'],
  },
  {
    title: 'Sensors & hardware',
    skills: [
      '2D/3D LiDAR',
      'IMU',
      'Depth Camera',
      'Thermal / PTZ / OGI / Acoustic Cameras',
      'Embedded Linux',
      'STM32',
      'Arduino',
      'RTOS',
      'CAN Bus',
    ],
  },
  {
    title: 'Software',
    skills: [
      'Python',
      'Rust',
      'C#',
      'Kotlin',
      'JavaScript',
      'React',
      'React Native',
      'Node.js',
      'SQL',
      'WPF',
    ],
  },
  {
    title: 'Real-time & IoT',
    skills: ['WebSockets', 'Socket.IO', 'MQTT', 'gRPC', 'Modbus'],
  },
]
