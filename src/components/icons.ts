import {
  BrainCircuit,
  Bot,
  Car,
  HeartPulse,
  Network,
  Router,
  ScanSearch,
  Truck,
  Waypoints,
  type LucideIcon,
} from 'lucide-react'

import type { FocusIcon } from '@/content/profile'
import type { ProjectIcon } from '@/content/projects'

export const projectIcons: Record<ProjectIcon, LucideIcon> = {
  quadruped: Bot,
  fleet: Network,
  ai: BrainCircuit,
  delivery: Truck,
  medical: HeartPulse,
  vehicle: Car,
  iot: Router,
}

export const focusIcons: Record<FocusIcon, LucideIcon> = {
  navigation: Waypoints,
  inspection: ScanSearch,
  fleet: Network,
  ai: BrainCircuit,
}
