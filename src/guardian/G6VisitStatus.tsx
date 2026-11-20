import { STATUS_ORDER, useVisit, type VisitStatus } from '../state/visit'
import './guardian.css'

const COPY: Record<VisitStatus, { title: string; description: string; next: string }> = {
  booked: { title: '방문이 예약되어 있습니다', description: '현장 접수 전입니다.', next: '어르신은 방문 장소에서 직원에게 접수를 요청해 주세요.' },
  checked_in: { title: '현장 접수가 되었습니다', description: '직원이 접수를 확인했습니다. 아직 이용 시작 전입니다.', next: '어르신은 현장 직원의 대기 안내를 따라 주세요.' },
  waiting: { title: '순서를 기다리고 있습니다', description: '접수를 마치고 호출을 기다리는 중입니다.', next: '어르신은 현장에서 기다리며 직원의 호출을 확인해 주세요.' },
  called: { title: '어르신의 차례를 안내했습니다', description: '호출된 상태이며, 실제 이용 시작은 직원이 별도로 기록합니다.', next: '어르신은 현장 직원의 안내를 받아 이동해 주세요.' },
  in_service: { title: '서비스를 이용하고 있습니다', description: '직원이 실제 이용 시작을 기록했습니다.', next: '이용이 끝나면 직원이 완료 상태를 기록합니다.' },
  done: { title: '서비스 이용을 마쳤습니다', description: '직원이 이용 완료를 기록했습니다.', next: '건강 상담 결과와 사진의 공유 여부는 별도로 확인해야 합니다.' },
}

const STEPS: Record<VisitStatus, string> = {
  booked: '예약 확인', checked_in: '현장 접수', waiting: '대기',
  called: '호출', in_service: '이용 중', done: '마침',
}

export default function G6VisitStatus() {
  const v = useVisit()
  const copy = COPY[v.status]
  const waiting = v.status === 'waiting'
  const hasQueue = v.status === 'checked_in' || waiting || v.status === 'called'
  const validCount = (n: number) => Number.isInteger(n) && n >= 0
  const minutes = v.avgMinutesPerPerson !== null && Number.isFinite(v.avgMinutesPerPerson)
    && v.avgMinutesPerPerson > 0 && validCount(v.peopleAhead)
    ? Math.ceil(v.peopleAhead * v.avgMinutesPerPerson) : null
  const estimateKnown = minutes !== null && Number.isFinite(minutes)
  const checkedAt = Number.isFinite(v.lastCheckedAt) && v.lastCheckedAt > 0
    ? new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(v.lastCheckedAt)
    : '확인 시각 없음'

  return (
    <main className="g6" aria-labelledby="g6-title">
      <header className="g6-header">
        <span className="g6-brand">HAPPY BUS DAY</span>
        <span>보호자 화면</span>
      </header>
      <div className="g6-body">
        <div>
          <p className="g6-eyebrow">오늘의 방문 현황</p>
          <h1 id="g6-title">{v.elderName} 님의 방문</h1>
          <p className="g6-muted">같은 방문의 진행 상황을 확인하세요.</p>
        </div>

        <aside className="g6-demo-note" aria-label="시연 안내">
          <strong>시연용 화면 · 예시 정보</strong>
          <p>실제 방문 기록이 아닙니다. 같은 브라우저의 탭에서만 상태를 공유합니다. 실제 보호자 연결과 방문 현황 공개 범위는 팀에서 확정할 예정입니다.</p>
        </aside>

        <section className="g6-status" aria-labelledby="g6-status-title" aria-live="polite" aria-atomic="true">
          <span className="g6-badge">현재 상태 · {STEPS[v.status]}</span>
          <h2 id="g6-status-title">{copy.title}</h2>
          <p>{copy.description}</p>
          <p className="g6-timestamp">마지막 상태 기록: {checkedAt}</p>
          <div className="g6-next"><strong>다음 안내</strong><p>{copy.next}</p></div>
        </section>

        {v.status === 'done' && <a className="g6-post-visit" href="#/g7">방문 후 확인</a>}

        <section className="g6-card" aria-labelledby="g6-steps-title">
          <h2 id="g6-steps-title">방문 진행 단계</h2>
          <ol className="g6-steps">
            {STATUS_ORDER.map((status, i) => (
              <li key={status} aria-current={status === v.status ? 'step' : undefined}>
                <span className="g6-step-number" aria-hidden="true">{i + 1}</span>
                <span>{STEPS[status]}</span>
                {status === v.status && <strong className="g6-current">현재</strong>}
              </li>
            ))}
          </ol>
        </section>

        {hasQueue && (
          <section className="g6-card" aria-labelledby="g6-queue-title">
            <h2 id="g6-queue-title">현장 순서 안내</h2>
            <dl className="g6-numbers">
              <div><dt>어르신 접수번호</dt><dd>{validCount(v.queueNumber) ? `${v.queueNumber}번` : '확인 중'}</dd></div>
              {waiting && <>
                <div><dt>지금 진행 번호</dt><dd>{validCount(v.nowServing) ? `${v.nowServing}번` : '확인 중'}</dd></div>
                <div><dt>앞에서 기다리는 인원</dt><dd>{validCount(v.peopleAhead) ? `${v.peopleAhead}명` : '확인 중'}</dd></div>
              </>}
            </dl>
            {waiting && <div className="g6-estimate">
              <h3>예상 대기시간</h3>
              <p className="g6-estimate-value">{v.peopleAhead === 0 ? '다음 차례입니다.' : estimateKnown ? `약 ${minutes}분` : '아직 알 수 없습니다'}</p>
              <p>{v.peopleAhead === 0 ? '어르신은 현장 직원의 호출을 기다려 주세요.' : estimateKnown ? `시연 계산: 앞선 인원 × 1명당 평균 ${v.avgMinutesPerPerson}분. 실제 시간은 현장 상황에 따라 달라질 수 있습니다.` : '시간을 계산할 근거가 없습니다. 어르신은 현장 직원의 순서 안내를 따라 주세요.'}</p>
              <p className="g6-muted">번호 차이로 대기 인원을 계산하지 않습니다. 표시된 값은 마지막 기록이며, 현재 현장 상황과 다를 수 있습니다.</p>
            </div>}
          </section>
        )}

        <section className="g6-card" aria-labelledby="g6-visit-title">
          <h2 id="g6-visit-title">방문 정보</h2>
          <dl className="g6-details">
            <div><dt>날짜</dt><dd>{v.dateText}</dd></div>
            <div><dt>운영 시간</dt><dd>{v.timeText}</dd></div>
            <div><dt>장소</dt><dd>{v.placeText}</dd></div>
            <div><dt>서비스</dt><dd>{v.service}</dd></div>
          </dl>
        </section>
        <footer className="g6-footer">이 화면은 진행 상태만 보여줍니다. 건강 상담 결과와 사진은 표시하지 않습니다.</footer>
      </div>
    </main>
  )
}
