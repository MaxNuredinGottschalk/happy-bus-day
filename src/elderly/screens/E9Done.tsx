// E9 — visit finished. "Done" and "share" are separate steps; sharing is asked on E10.
// NOTE: the draft said the guardian was already notified that the visit ended. Per the week-5 changes
// ("보호자에게 이미 알림" removed), we do NOT claim a notification was sent. Only completion is shown.
import { go } from '../../router'
import { formatClock, useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Arrow, Check } from '../icons'

export default function E9Done() {
  const v = useVisit()
  return (
    <Shell
      title="오늘 방문 · 마침" right="checked"
      speak={`오늘 방문이 끝났습니다. 오늘 받으신 것, ${v.service} 완료. 기록이 맞습니까?`}
      actions={<>
        <button className="btn pri" onClick={() => go('e10')}>맞습니다<Arrow /></button>
        <button className="btn sec" onClick={() => go('e8')}>빠진 것이 있어요</button>
      </>}
    >
      <h1 className="h1" style={{ fontSize: 40 }}>오늘 방문이<br />끝났습니다</h1>
      <div className="card">
        <div className="lb">오늘 받으신 것</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0 12px' }}>
          <span style={{ flex: 'none', width: 48, height: 48, borderRadius: '50%', background: 'var(--teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check /></span>
          <div><div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.2 }}>{v.service} 완료</div>
            <div className="lb">{formatClock(v.lastCheckedAt)}</div></div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, borderTop: '2px solid var(--line-soft)', paddingTop: 12 }}>기록이 맞습니까?</div>
      </div>
    </Shell>
  )
}
