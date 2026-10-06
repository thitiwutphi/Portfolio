import { Play } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'

import type { ProjectMedia } from '@/content/projects'
import type { Locale } from '@/i18n/locales'
import { useLocale, useMessages } from '@/i18n/use-locale'
import { asset } from '@/lib/asset'
import { mediaLabel, mediaPreview } from '@/lib/projects'
import { cn } from '@/lib/utils'

/** Photos and videos of a project: one large viewer and, when there are several, thumbnails. */
export function ProjectGallery({ media }: { media: ProjectMedia[] }) {
  const locale = useLocale()
  const t = useMessages()
  const [index, setIndex] = useState(0)
  const current = media[index] ?? media[0]
  if (!current) return null

  const select = (next: number) => setIndex((next + media.length) % media.length)
  // Arrow keys on a thumbnail move to the next / previous item and keep focus with it.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (index + step + media.length) % media.length
    select(next)
    const buttons = event.currentTarget.closest('ul')?.querySelectorAll('button')
    buttons?.[next]?.focus()
  }

  return (
    <div>
      {/* key: start every item fresh, e.g. stop a playing video when switching */}
      <figure key={`${current.type}-${index}`} className="m-0">
        <div className="overflow-hidden rounded-lg border bg-black/90">
          <MediaStage media={current} locale={locale} playLabel={t.project.play} />
        </div>
        {current.caption && (
          <figcaption className="mt-2 text-sm text-muted-foreground">
            {current.caption[locale]}
          </figcaption>
        )}
      </figure>

      {media.length > 1 && (
        <ul aria-label={t.project.media} className="mt-3 flex flex-wrap gap-2">
          {media.map((item, i) => {
            const preview = mediaPreview(item)
            const selected = i === index
            return (
              <li key={`${item.type}-${i}`} className="shrink-0">
                <button
                  type="button"
                  aria-label={t.project.showMedia(i + 1, media.length, mediaLabel(item)[locale])}
                  aria-current={selected || undefined}
                  onClick={() => select(i)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'relative block h-16 w-24 overflow-hidden rounded-md border-2 bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                    selected ? 'border-brand' : 'border-transparent opacity-75 hover:opacity-100',
                  )}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  ) : null}
                  {item.type !== 'image' && (
                    <span className="absolute inset-0 grid place-items-center bg-black/25 text-white">
                      <Play aria-hidden="true" className="size-5 fill-current" />
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function MediaStage({
  media,
  locale,
  playLabel,
}: {
  media: ProjectMedia
  locale: Locale
  playLabel: (title: string) => string
}) {
  switch (media.type) {
    case 'image':
      return (
        <img
          src={asset(media.src)}
          alt={media.alt[locale]}
          width={media.width}
          height={media.height}
          decoding="async"
          className="mx-auto max-h-[70vh] w-auto max-w-full bg-white object-contain"
        />
      )
    case 'video':
      return (
        // Captions are optional: many project clips have no speech.
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={asset(media.src)}
          poster={media.poster ? asset(media.poster) : undefined}
          width={media.width}
          height={media.height}
          controls
          playsInline
          preload="metadata"
          aria-label={media.title[locale]}
          className="mx-auto max-h-[70vh] w-auto max-w-full"
        >
          {media.captions && (
            <track
              kind="captions"
              src={asset(media.captions)}
              srcLang={locale}
              label={locale === 'th' ? 'ไทย' : 'English'}
              default
            />
          )}
        </video>
      )
    case 'youtube':
      return <YouTubeEmbed id={media.id} title={media.title[locale]} playLabel={playLabel} />
  }
}

/**
 * Shows the thumbnail until the visitor presses play, so YouTube (and its cookies) only load on
 * request. Uses the privacy-enhanced youtube-nocookie.com domain.
 */
function YouTubeEmbed({
  id,
  title,
  playLabel,
}: {
  id: string
  title: string
  playLabel: (title: string) => string
}) {
  const [playing, setPlaying] = useState(false)
  const videoId = encodeURIComponent(id)

  return (
    <div className="relative aspect-video w-full">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel(title)}
          className="group absolute inset-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            decoding="async"
            className="size-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/10">
            <span className="grid h-12 w-[68px] place-items-center rounded-xl bg-[#ff0033] text-white shadow-lg">
              <Play aria-hidden="true" className="size-6 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
