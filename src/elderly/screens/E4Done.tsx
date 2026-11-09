// NOT in the draft: a minimal "ready, now wait for on-site check-in" screen so the pre-visit flow doesn't dead-end.
// Staff (not the visitor) record check-in. Replace/redesign when the team decides.
import { useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Check } from '../icons'

export default function E4Done() {
  const v = useVisit()
  return (
    <Shell back={{ to: 'e4' }} title="방문 전 안내 · 4 / 4" speak="준비가 끝났습니다. 방문 날 현장에서 직원이 접수해 드립니다.">
      <h1 className="h1">준비가<br />끝났습니다</h1>
      <div className="note"><span style={{ color: 'var(--teal)' }}><Check size={34} /></span>
        <div>방문 날 현장에서 <b>직원이 접수</b>해 드립니다. 도착하셔서 직원에게 이름을 말씀해 주세요.</div></div>
      <div className="card">
        <div className="lb">방문 일정</div>
        <div className="vl" style={{ fontSize: 26 }}>{v.dateText}<br />{v.timeText}</div>
      </div>
    </Shell>
  )
}
