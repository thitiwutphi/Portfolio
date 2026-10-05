import { profile } from '@/content/profile'

const focus = [
  'ROS 2 navigation & SLAM',
  'Quadruped inspection robots',
  'Fleet & mission platforms',
  'Edge AI · detection, OCR, VLMs',
]

const stack = ['Python', 'Rust', 'React', 'Node.js']

function Key({ children }: { children: string }) {
  return <span className="text-brand">{children}</span>
}

/** Decorative "config file" summary; the same facts are available as text elsewhere on the page. */
export function ProfileCard() {
  return (
    <figure
      aria-hidden="true"
      className="overflow-hidden rounded-xl border bg-card/80 font-mono text-[13px] leading-6 shadow-xl shadow-brand/5 backdrop-blur motion-safe:animate-in motion-safe:delay-150 motion-safe:duration-700 motion-safe:fill-mode-both motion-safe:fade-in motion-safe:slide-in-from-bottom-4"
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-2 text-xs text-muted-foreground">profile.yaml</span>
      </div>
      <pre className="overflow-x-auto p-4 sm:p-5">
        <code>
          <span className="text-muted-foreground"># {profile.role.toLowerCase()}</span>
          {'\n'}
          <Key>name</Key>: {profile.name}
          {'\n'}
          <Key>role</Key>: {profile.role}
          {'\n'}
          <Key>based_in</Key>: Bangkok, Thailand
          {'\n'}
          <Key>focus</Key>:
          {focus.map((item) => (
            <span key={item}>
              {'\n'}
              {'  '}
              <span className="text-muted-foreground">-</span> {item}
            </span>
          ))}
          {'\n'}
          <Key>stack</Key>: [{stack.join(', ')}]
        </code>
      </pre>
    </figure>
  )
}
