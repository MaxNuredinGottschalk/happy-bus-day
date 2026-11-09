// DEMO ONLY — stands in for the staff/operator side (out of project scope).
// It answers "who updates the visit status?" for now: whoever presses these buttons.
// Remove or hide this once the team decides how status is really updated.
import { go, usePath } from '../router'
import { resetVisit, setStatus, setVisit, STATUS_LABEL, STATUS_ORDER, useVisit, formatClock } from '../state/visit'
import { ELDERLY_SCREENS } from '../elderly/ElderlyApp'

export default function DemoPanel() {
  const v = useVisit()
  const path = usePath() || 'e1'
  return (
    <aside className="demo">
      <h2>데모 직원 패널 (제품 화면 아님)</h2>
      <small>여기서 방문 상태를 바꾸면 어르신 화면이 따라 바뀝니다. 다른 탭에 열어 둔 화면도 같이 바뀝니다.</small>

      <div>
        <b>방문 상태 (직원이 기록)</b>
        <div className="row" style={{ marginTop: 6 }}>
          {STATUS_ORDER.map((s) => (
            <button key={s} className={v.status === s ? 'active' : ''} onClick={() => setStatus(s)}>{STATUS_LABEL[s]}</button>
          ))}
        </div>
        <small>마지막 확인: {formatClock(v.lastCheckedAt)}</small>
      </div>

      <div>
        <b>대기 숫자 (서로 별개의 값)</b>
        <div className="row" style={{ marginTop: 6 }}>
          <label>내 번호 <input type="number" value={v.queueNumber} onChange={(e) => setVisit({ queueNumber: +e.target.value })} /></label>
          <label>지금 진행 <input type="number" value={v.nowServing} onChange={(e) => setVisit({ nowServing: +e.target.value })} /></label>
          <label>내 앞 <input type="number" value={v.peopleAhead} onChange={(e) => setVisit({ peopleAhead: +e.target.value })} /></label>
        </div>
      </div>

      <div>
        <b>시간 추정 (운영 근거가 있을 때만)</b>
        <div className="row" style={{ marginTop: 6 }}>
          <button className={v.avgMinutesPerPerson !== null ? 'active' : ''} onClick={() => setVisit({ avgMinutesPerPerson: 5 })}>근거 있음 (1명당 5분)</button>
          <button className={v.avgMinutesPerPerson === null ? 'active' : ''} onClick={() => setVisit({ avgMinutesPerPerson: null })}>근거 없음 → 알 수 없음</button>
        </div>
      </div>

      <div>
        <b>화면 바로가기</b>
        <div className="row" style={{ marginTop: 6 }}>
          {ELDERLY_SCREENS.map((s) => (
            <button key={s} className={path === s ? 'active' : ''} onClick={() => go(s)}>{s.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div>
        <b>어르신이 남긴 것</b>
        <div className="row" style={{ marginTop: 6, flexDirection: 'column', gap: 4 }}>
          <span className="badge">도움 요청: {v.helpRequestedAt ? formatClock(v.helpRequestedAt) + ' 직원 호출' : '없음'}</span>
          <span className="badge">공유 선택: {v.shareChoice ?? '선택 안 함 (= 공유 안 함)'}</span>
        </div>
        {v.helpRequestedAt && <button style={{ marginTop: 6 }} onClick={() => setVisit({ helpRequestedAt: null })}>도움 요청 처리 완료</button>}
      </div>

      <button onClick={() => { resetVisit(); go('e1') }}>처음 상태로 되돌리기</button>
    </aside>
  )
}
