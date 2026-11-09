// Frame shared by every elderly screen: top bar, scrolling content, optional action buttons,
// and the fixed bottom bar (소리로 듣기 bottom-left, 도움 요청 bottom-right — same place on every screen).
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { go } from '../router'
import { useVisit, formatClock } from '../state/visit'
import { Back, Help, Speaker, Stop } from './icons'

const SCALE = { normal: 0.9, large: 1, xlarge: 1.2 } as const

interface Props {
  title?: string
  /** If set, show a back button instead of a plain title. */
  back?: { label?: string; to: string }
  /** Right side of the top bar. 'checked' shows "10시 42분 확인". */
  right?: 'checked' | string
  /** Sentence(s) read aloud by the 소리로 듣기 button. */
  speak: string
  actions?: ReactNode
  variant?: 'turn'
  /** Replace the whole top bar (used by E1). */
  top?: ReactNode
  children: ReactNode
}

export default function Shell({ title, back, right, speak, actions, variant, top, children }: Props) {
  const v = useVisit()
  const [speaking, setSpeaking] = useState(false)
  const spoken = useRef(speak)
  spoken.current = speak

  const say = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(spoken.current)
    u.lang = 'ko-KR'
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(u)
  }
  const stop = () => { window.speechSynthesis?.cancel(); setSpeaking(false) }

  // E2 setting: read automatically when a screen opens. Stop reading when leaving.
  useEffect(() => {
    if (v.autoRead) say()
    return () => { window.speechSynthesis?.cancel() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speak])

  const rightText = right === 'checked' ? `${formatClock(v.lastCheckedAt)} 확인` : right

  return (
    <div className={'e' + (variant === 'turn' ? ' turn' : '')} style={{ ['--fs' as string]: SCALE[v.fontSize] }}>
      {top ?? <div className={'top' + (back ? ' has-back' : '')}>
        {back ? (
          <button className="tb" onClick={() => go(back.to)}><Back />{back.label ?? '이전'}</button>
        ) : <span>{title}</span>}
        {rightText && <span style={{ fontWeight: 500, color: 'var(--muted)' }}>{rightText}</span>}
        {!rightText && back && title && <span style={{ fontWeight: 500, color: 'var(--muted)' }}>{title}</span>}
      </div>}
      <div className="main"><div className="scaled">{children}</div></div>
      {actions && <div className="acts">{actions}</div>}
      <div className="bar">
        {speaking
          ? <button className="btn vo on" aria-pressed="true" onClick={stop}><Stop />멈추기</button>
          : <button className="btn vo" onClick={say}><Speaker />소리로 듣기</button>}
        <button className={'btn hp' + (location.hash === '#/e8' ? ' on' : '')} onClick={() => go('e8')}>
          <Help />도움 요청
        </button>
      </div>
    </div>
  )
}
