import { STATUS_LABEL, useVisit, type ShareChoice } from '../state/visit'
import './post-visit.css'

const SHARE_LABEL: Record<Exclude<ShareChoice, null>, string> = {
  yes: '공유에 동의했습니다.',
  no: '공유하지 않기로 했습니다.',
  later: '나중에 결정하기로 했습니다.',
}

export default function G7PostVisit() {
  const visit = useVisit()
  const done = visit.status === 'done'
  const shareLabel = visit.shareChoice === null
    ? '아직 공유 여부를 선택하지 않았습니다.'
    : SHARE_LABEL[visit.shareChoice]

  return (
    <main className="g7" aria-labelledby="g7-title">
      <header className="g7-header">
        <span className="g7-brand">HAPPY BUS DAY</span>
        <span>보호자 화면</span>
      </header>

      <div className="g7-body">
        <a className="g7-back" href="#/g6">← 방문 현황 보기</a>
        <div>
          <h1 id="g7-title">방문 후 확인</h1>
          <p className="g7-muted">{visit.elderName} 님의 방문</p>
        </div>

        <section className="g7-status" aria-labelledby="g7-status-title" aria-live="polite" aria-atomic="true">
          <h2 id="g7-status-title">{done ? '서비스 이용을 마쳤습니다' : '방문이 아직 끝나지 않았습니다'}</h2>
          <p>{done ? '직원이 이용 완료를 기록했습니다.' : `현재 상태는 ‘${STATUS_LABEL[visit.status]}’입니다. 진행 상황은 방문 현황에서 볼 수 있습니다.`}</p>
        </section>

        {done && (
          <>
            <section className="g7-card" aria-labelledby="g7-details-title">
              <h2 id="g7-details-title">방문 정보</h2>
              <dl className="g7-details">
                <div><dt>방문 날짜</dt><dd>{visit.dateText}</dd></div>
                <div><dt>방문 장소</dt><dd>{visit.placeText}</dd></div>
                <div><dt>이용 서비스</dt><dd>{visit.service}</dd></div>
              </dl>
            </section>

            <section className="g7-card" aria-labelledby="g7-summary-title">
              <h2 id="g7-summary-title">건강 상담 결과 요약</h2>
              <dl className="g7-details" aria-live="polite" aria-atomic="true">
                <div><dt>요약 공유 선택</dt><dd>{shareLabel}</dd></div>
                <div><dt>결과 요약</dt><dd>이 시연에서 확인할 수 있는 결과 요약이 없습니다.</dd></div>
              </dl>
            </section>

            <section className="g7-card" aria-labelledby="g7-follow-up-title">
              <h2 id="g7-follow-up-title">후속 안내</h2>
              <p className="g7-muted">등록된 후속 안내가 없습니다.</p>
              <dl className="g7-details g7-follow-up">
                <div><dt>다음 방문 일정</dt><dd>등록된 일정이 없습니다.</dd></div>
              </dl>
            </section>
          </>
        )}

        <aside className="g7-demo-note" aria-label="시연 안내">
          <strong>시연용 화면 · 예시 정보</strong>
          <p>같은 브라우저의 탭에서만 방문 상태를 공유합니다. 실제 보호자에게 공개할 정보 범위는 팀에서 정할 예정입니다.</p>
        </aside>
      </div>
    </main>
  )
}
