import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { gallery } from '@/content/gallery'
import { asset } from '@/lib/asset'
import { useLocale, useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

/** Masonry grid of the gallery photos, each opening a full-size viewer with next / previous. */
export function GalleryGrid({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  const [index, setIndex] = useState<number | null>(null)
  const current = index === null ? undefined : gallery[index]
  const thumbs = useRef<(HTMLButtonElement | null)[]>([])
  const lastViewed = useRef(0)

  useEffect(() => {
    if (index !== null) lastViewed.current = index
  }, [index])

  const step = (delta: number) =>
    setIndex((value) =>
      value === null ? value : (value + delta + gallery.length) % gallery.length,
    )

  return (
    <>
      {/* CSS columns give a masonry layout that keeps each photo's own aspect ratio. */}
      <ul className={cn('columns-2 gap-3 sm:columns-3 lg:columns-4', className)}>
        {gallery.map((image, i) => (
          <li key={image.full} className="mb-3 break-inside-avoid">
            <button
              ref={(element) => {
                thumbs.current[i] = element
              }}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t.openPhoto(image.caption[locale])}
              className="group/photo relative block w-full overflow-hidden rounded-lg border bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <img
                src={asset(image.thumb)}
                srcSet={`${asset(image.thumbSmall)} 360w, ${asset(image.thumb)} 640w`}
                sizes="(min-width: 1460px) 330px, (min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw"
                alt={image.alt[locale]}
                width={image.thumbWidth}
                height={image.thumbHeight}
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: Math.max(image.thumbWidth / image.thumbHeight, 4 / 5) }}
                className="w-full object-cover object-[center_35%] transition-transform duration-300 group-hover/photo:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-3 pt-10 pb-2.5 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100"
              >
                {image.caption[locale]}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={current !== undefined} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent
          className="gap-3 p-2 pt-11 sm:max-w-5xl sm:p-3 sm:pt-11"
          // Return focus to the thumbnail of the photo viewed last, not necessarily the one opened.
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            thumbs.current[lastViewed.current]?.focus()
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') step(1)
            if (event.key === 'ArrowLeft') step(-1)
          }}
        >
          {current && index !== null && (
            <>
              <DialogTitle className="sr-only">{current.caption[locale]}</DialogTitle>
              <div className="relative">
                <img
                  key={current.full}
                  src={asset(current.full)}
                  alt={current.alt[locale]}
                  width={current.width}
                  height={current.height}
                  className="mx-auto h-auto max-h-[75vh] w-auto max-w-full rounded-md object-contain"
                />
                <NavButton direction="previous" onClick={() => step(-1)} />
                <NavButton direction="next" onClick={() => step(1)} />
              </div>
              <div className="flex items-center justify-between gap-4 px-1 pb-1">
                <DialogDescription className="text-sm">{current.caption[locale]}</DialogDescription>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {index + 1} / {gallery.length}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function NavButton({
  direction,
  onClick,
}: {
  direction: 'previous' | 'next'
  onClick: () => void
}) {
  const t = useMessages()
  const Icon = direction === 'next' ? ChevronRight : ChevronLeft
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-lg"
      aria-label={direction === 'next' ? t.nextPhoto : t.previousPhoto}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow-sm backdrop-blur',
        direction === 'next' ? 'right-2' : 'left-2',
      )}
    >
      <Icon />
    </Button>
  )
}
