// E3 — visit schedule. Read-aloud runs here, so the bottom-left button becomes "멈추기" in the same spot.
import { useEffect } from 'react'
import { go } from '../../router'
import { useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Arrow, Calendar, Clock, Pin, Wave } from '../icons'

export default function E3Schedule() {
  const v = useVisit()
  const line = `${v.dateText} 오전 10시, ${v.placeText}입니다.`
  useEffect(() => {
    // Draft shows E3 already reading. Auto-start once when opened (browsers may block until the first tap).
    const t = setTimeout(() => document.querySelector<HTMLButtonElement>('.bar .vo:not(.on)')?.click(), 300)
    return () => clearTimeout(t)
  }, [])
  return (
    <Shell
      back={{ to: 'e1' }} title="방문 전 안내 · 2 / 4" speak={line}
      actions={<button className="btn pri" onClick={() => go('e4')}>다음: 준비물 보기<Arrow /></button>}
    >
      <h1 className="h1">방문 일정</h1>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="ln"><Calendar /><span>{v.dateText}</span></div>
        <div className="ln"><Clock /><span>{v.timeText}</span></div>
        <div className="ln"><Pin /><span style={{ fontSize: 28 }}>{v.placeText}</span></div>
      </div>
      <div className="placeholder">[약도 이미지 자리]</div>
      <div className="reading" aria-live="polite">
        <span style={{ color: 'var(--teal)' }}><Wave /></span>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--teal)' }}>소리로 읽는 중</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{line}</div>
        </div>
      </div>
    </Shell>
  )
}
