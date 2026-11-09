// E7 — your turn. Full yellow screen. Also used while status is 'in_service'.
import { useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Arrow, Bus } from '../icons'

export default function E7Turn() {
  const v = useVisit()
  const inService = v.status === 'in_service'
  return (
    <Shell
      variant="turn" title="오늘 방문" right="checked"
      speak={inService ? `${v.queueNumber}번 ${v.elderName}님, 지금 이용 중입니다.` : `지금 차례입니다. ${v.queueNumber}번 ${v.elderName}님. 버스 앞문으로 들어오세요. 직원이 문 앞에서 도와드립니다.`}
    >
      <div style={{ width: 132, height: 132, borderRadius: '50%', background: '#fff', border: '3px solid var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)' }}>
        <Bus size={80} sw={1.8} />
      </div>
      <h1 style={{ margin: 0, fontSize: 46, fontWeight: 900, lineHeight: 1.2 }}>{inService ? <>지금<br />이용 중입니다</> : <>지금<br />차례입니다</>}</h1>
      <div style={{ fontSize: 34, fontWeight: 900 }}>{v.queueNumber}번 {v.elderName}님</div>
      {!inService && (
        <div style={{ background: '#fff', border: '3px solid var(--text)', borderRadius: 20, padding: 18, width: '100%', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
          <span style={{ color: 'var(--teal)' }}><Arrow size={44} /></span>
          <div><div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.25 }}>버스 앞문으로<br />들어오세요</div>
            <div style={{ fontSize: 22, marginTop: 6 }}>직원이 문 앞에서 도와드립니다.</div></div>
        </div>
      )}
    </Shell>
  )
}
