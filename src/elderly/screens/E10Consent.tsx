// E10 — separate consent. Rules: NOTHING is preselected; if nothing is chosen, nothing is shared;
// photos are asked separately; can be changed later.
import { useState } from 'react'
import { setVisit, useVisit, type ShareChoice } from '../../state/visit'
import Shell from '../Shell'
import { Check, Lock } from '../icons'

const OPTIONS: { id: Exclude<ShareChoice, null>; label: string }[] = [
  { id: 'yes', label: '네, 보여 드립니다' },
  { id: 'no', label: '아니요, 보여 드리지 않습니다' },
  { id: 'later', label: '나중에 정하겠습니다' },
]

export default function E10Consent() {
  const v = useVisit()
  const [pick, setPick] = useState<ShareChoice>(null) // starts empty on purpose
  const saved = v.shareChoice !== null && pick === v.shareChoice
  return (
    <Shell
      back={{ to: 'e9' }} title="동의 확인"
      speak={`건강 상담 결과를 ${v.guardianRelation}께 보여 드릴까요? 상담 결과 요약만 보입니다. 사진은 포함되지 않으며, 사진은 따로 여쭙니다.`}
      actions={pick === null
        ? <button className="btn off" aria-disabled="true">하나를 고르면 저장됩니다</button>
        : saved
          ? <button className="btn sec" disabled><Check />저장했습니다. 나중에 바꿀 수 있습니다</button>
          : <button className="btn pri" onClick={() => setVisit({ shareChoice: pick })}>저장하기</button>}
    >
      <h1 className="h1" style={{ fontSize: 34 }}>건강 상담 결과를<br />{v.guardianRelation}께 보여 드릴까요?</h1>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 900, color: 'var(--teal)' }}><Lock />{v.guardianRelation}이 보게 되는 것</div>
        <div style={{ fontSize: 22, marginTop: 6 }}>상담 결과 요약만 보입니다. 사진은 포함되지 않으며, 사진은 따로 여쭙니다.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {OPTIONS.map((o) => (
          <button key={o.id} className="rd" aria-pressed={pick === o.id} onClick={() => setPick(o.id)}><i />{o.label}</button>
        ))}
      </div>
    </Shell>
  )
}
