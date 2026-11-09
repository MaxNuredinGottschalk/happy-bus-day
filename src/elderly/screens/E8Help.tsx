// E8 — help. Placeholders stay visible on purpose: the numbers are not decided yet.
import { useState } from 'react'
import { setVisit, useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Person, Phone } from '../icons'

export default function E8Help() {
  const v = useVisit()
  const [sent, setSent] = useState(v.helpRequestedAt !== null)
  const callStaff = () => { setVisit({ helpRequestedAt: Date.now() }); setSent(true) }
  return (
    <Shell
      back={{ to: history.length > 1 ? 'e5' : 'e1' }} title="도움 요청"
      speak="어떤 도움이 필요하세요? 직원을 부르거나, 보호자 또는 고객센터에 전화할 수 있습니다."
    >
      <h1 className="h1" style={{ marginBottom: 4 }}>어떤 도움이<br />필요하세요?</h1>
      <button className="op staff" onClick={callStaff}>
        <span className="ic"><Person /></span>
        <span><b>직원을 불러 주세요</b><small>{sent ? '직원에게 알렸습니다. 잠시만 기다려 주세요.' : '현장 직원에게 알립니다.'}</small></span>
      </button>
      <button className="op" onClick={() => alert('데모: 보호자 전화 연결')}>
        <span className="ic"><Phone size={48} sw={2.2} /></span>
        <span><b>{v.guardianRelation}께 전화</b><small>{v.guardianName}님 · [보호자 번호 자동 연결]</small></span>
      </button>
      <button className="op" onClick={() => alert('데모: 고객센터 번호는 아직 정해지지 않았습니다')}>
        <span className="ic"><Phone size={48} sw={2.2} /></span>
        <span><b>고객센터에 전화</b><small>[고객센터 번호 입력 예정]<br />운영시간 [입력 예정]</small></span>
      </button>
    </Shell>
  )
}
