import type { Logo } from '@/content/logos'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'

/**
 * Company / issuer logo on a white tile, so dark logos stay visible in dark mode.
 * With `area` (px²), the logo is sized so that wide and square logos look equally heavy.
 */
export function LogoImage({
  logo,
  area,
  className,
}: {
  logo: Logo
  area?: number
  className?: string
}) {
  const aspect = logo.width / logo.height
  const style = area
    ? { width: Math.round(Math.sqrt(area * aspect)), height: Math.round(Math.sqrt(area / aspect)) }
    : undefined
  return (
    <img
      src={asset(logo.src)}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      decoding="async"
      style={style}
      className={cn('shrink-0 rounded-md bg-white object-contain dark:p-1', className)}
    />
  )
}
