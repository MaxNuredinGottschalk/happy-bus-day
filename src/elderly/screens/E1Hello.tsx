// E1 — link opens. "네, 맞습니다" is a CONFIRMATION, not authentication.
import { go } from '../../router'
import { useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Arrow, Bus } from '../icons'

export default function E1Hello() {
  const v = useVisit()
  return (
    <Shell
      speak={`${v.elderName}님, 안녕하세요. 아래 내용이 맞습니까? 성함 ${v.elderName}. 받으실 서비스 ${v.service}. 신청하신 분 ${v.guardianName}, ${v.guardianRelation}.`}
      top={
      <div className="top" style={{ padding: '0 12px 0 20px', color: 'var(--teal)', fontWeight: 900 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bus size={28} />해피버스데이</span>
        <button className="tb" onClick={() => go('e2')} aria-label="글자와 소리 설정">
          <span style={{ fontSize: 26, fontWeight: 900 }}>가</span>글자 설정
        </button>
      </div>
      }
      actions={<>
        <button className="btn pri" onClick={() => go('e3')}>네, 맞습니다<Arrow /></button>
        <button className="btn sec" onClick={() => go('e8')}>아닙니다. 고쳐 주세요</button>
      </>}
    >
      <h1 className="h1">{v.elderName}님,<br />안녕하세요</h1>
      <div className="card">
        <div className="lb" style={{ fontWeight: 700, color: 'var(--text)', fontSize: 22, paddingBottom: 8 }}>아래 내용이 맞습니까?</div>
        <div className="rw"><div className="lb">성함</div><div className="vl">{v.elderName}</div></div>
        <div className="rw"><div className="lb">받으실 서비스</div><div className="vl">{v.service}</div></div>
        <div className="rw"><div className="lb">신청하신 분</div><div className="vl">{v.guardianName} ({v.guardianRelation})</div></div>
      </div>
    </Shell>
  )
}
