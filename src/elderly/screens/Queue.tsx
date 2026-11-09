// E5 / E6 — waiting. Queue number, now-serving and people-ahead are SEPARATE values.
// The estimate is shown only with an operational basis (avgMinutesPerPerson). Otherwise: "알 수 없음" + reason + next action.
import { useVisit, STATUS_LABEL } from '../../state/visit'
import Shell from '../Shell'
import { Arrow, Phone } from '../icons'

export default function Queue({ forceUnknown }: { forceUnknown?: boolean }) {
  const v = useVisit()
  const known = !forceUnknown && v.avgMinutesPerPerson !== null
  const minutes = known ? v.peopleAhead * (v.avgMinutesPerPerson as number) : 0
  const headline = v.status === 'checked_in' ? '접수되었습니다' : '순서를 기다리는 중'
  return (
    <Shell
      title="오늘 방문" right="checked"
      speak={`지금 상태, ${headline}. ${known ? `예상 대기 약 ${minutes}분.` : '예상 대기는 아직 알 수 없습니다.'} 내 번호 ${v.queueNumber}번, 지금 진행 ${v.nowServing}번, 내 앞 ${v.peopleAhead}명. 회관 앞 의자에서 기다려 주세요.`}
      actions={<button className="btn sec" onClick={() => alert('데모: 보호자에게 전화 연결 [번호 자리]')}><Phone />{v.guardianRelation}께 전화</button>}
    >
      <div className="hero">
        <div><span className="pill">지금 상태 · {STATUS_LABEL[v.status]}</span></div>
        <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.2 }}>{headline}</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>예상 대기</div>
          {known ? (
            <>
              <div style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.1 }}>약 {minutes}분</div>
              <div style={{ fontSize: 20, color: '#DCEFF4' }}>오늘 한 분당 평균 약 {v.avgMinutesPerPerson}분 기준</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.3 }}>아직 알 수 없습니다</div>
              <div style={{ fontSize: 20, color: '#DCEFF4' }}>진행 속도를 확인하는 중입니다.</div>
            </>
          )}
        </div>
        <div className="next">
          <Arrow size={34} />
          <div><div style={{ fontSize: 20, fontWeight: 900 }}>다음 할 일</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>회관 앞 의자에서 기다려 주세요.</div></div>
        </div>
      </div>
      <div className="tiles">
        <div className="tile me"><div className="lb">내 번호</div><b>{v.queueNumber}</b></div>
        <div className="tile"><div className="lb">지금 진행</div><b>{v.nowServing}</b></div>
        <div className="tile"><div className="lb">내 앞</div><b>{v.peopleAhead}명</b></div>
      </div>
    </Shell>
  )
}
