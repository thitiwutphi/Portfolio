import { ChevronRight, Maximize2, ScrollText, Star, Trophy } from 'lucide-react'
import type { ReactNode } from 'react'

import { LogoImage } from '@/components/logo-image'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { awards, certifications, type ProofImage } from '@/content/education'
import { asset } from '@/lib/asset'
import { useLocale, useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

import { itemCardClass } from './item-card'
import { Panel } from './panel'

export function Certifications({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  return (
    <Panel id="certifications" title={t.certifications} icon={ScrollText} className={className}>
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li key={cert.name.en}>
            <ExpandableItem
              media={<LogoImage logo={cert.logo} className="h-10 w-auto" />}
              title={cert.name[locale]}
              details={`${cert.issuer[locale]} · ${cert.detail[locale]}`}
              image={cert.image}
            />
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function Awards({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  return (
    <Panel id="awards" title={t.awards} icon={Trophy} className={className}>
      <ul className="space-y-2">
        {awards.map((award) => (
          <li key={award.name.en}>
            <ExpandableItem
              media={<Star aria-hidden="true" className="size-6 fill-amber-400 text-amber-400" />}
              title={award.name[locale]}
              details={award.issuer[locale]}
              image={award.image}
            />
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function ExpandableItem({
  media,
  title,
  details,
  image,
}: {
  media: ReactNode
  title: string
  details: string
  image?: ProofImage
}) {
  return (
    <Collapsible className={itemCardClass}>
      <CollapsibleTrigger className="group flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <span className="grid w-10 shrink-0 place-items-center">{media}</span>
        <span className="flex-1 text-sm font-medium text-heading">{title}</span>
        <ChevronRight
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform',
            'group-data-[state=open]:rotate-90',
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        <p className="pl-14 text-xs leading-relaxed text-muted-foreground">{details}</p>
        {image && <ImagePreview image={image} />}
      </CollapsibleContent>
    </Collapsible>
  )
}

/** Thumbnail that opens the full-size image in a dialog. */
function ImagePreview({ image }: { image: ProofImage }) {
  const locale = useLocale()
  const t = useMessages()
  const caption = image.caption[locale]
  const alt = image.alt[locale]
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={t.viewLarger(caption)}
          className="group/zoom relative mt-3 block w-full max-w-sm overflow-hidden rounded-md border bg-white outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <img
            src={asset(image.thumb)}
            // Thumbnail is 640px wide; high-density screens get the full image instead.
            srcSet={`${asset(image.thumb)} 640w, ${asset(image.full)} ${image.width}w`}
            sizes="(min-width: 1024px) 260px, 384px"
            alt={alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full transition-transform duration-300 group-hover/zoom:scale-[1.02]"
          />
          <span
            aria-hidden="true"
            className="absolute right-2 bottom-2 grid size-7 place-items-center rounded-md bg-black/55 text-white opacity-80 transition-opacity group-hover/zoom:opacity-100"
          >
            <Maximize2 className="size-3.5" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="gap-2 p-2 pt-11 sm:max-w-4xl sm:p-3 sm:pt-11">
        <DialogTitle className="sr-only">{caption}</DialogTitle>
        <img
          src={asset(image.full)}
          alt={alt}
          width={image.width}
          height={image.height}
          decoding="async"
          className="h-auto max-h-[80vh] w-full rounded-md bg-white object-contain"
        />
        <DialogDescription className="px-1 pb-1 text-xs">{caption}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
