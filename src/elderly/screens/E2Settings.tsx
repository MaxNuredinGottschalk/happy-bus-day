// E2 — text size, auto read-aloud, easy mode. Changes apply immediately.
import { go } from '../../router'
import { setVisit, useVisit, type FontSize } from '../../state/visit'
import Shell from '../Shell'
import { Check } from '../icons'

const SIZES: { id: FontSize; label: string; px: number }[] = [
  { id: 'normal', label: '보통', px: 22 },
  { id: 'large', label: '크게', px: 30 },
  { id: 'xlarge', label: '아주 크게', px: 40 },
]

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="seg" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <button className="sg" aria-pressed={on} onClick={() => onChange(true)}>{on && <Check size={24} />}켜기</button>
      <button className="sg" aria-pressed={!on} onClick={() => onChange(false)}>{!on && <Check size={24} />}끄기</button>
    </div>
  )
}

export default function E2Settings() {
  const v = useVisit()
  return (
    <Shell
      back={{ label: '닫기', to: 'e1' }} title="화면 설정"
      speak="보기 편하게 맞추기. 글자 크기, 소리 안내, 쉬운 화면을 고를 수 있습니다."
      actions={<button className="btn pri" onClick={() => go('e1')}>저장하고 돌아가기</button>}
    >
      <h1 className="h1" style={{ fontSize: 36 }}>보기 편하게 맞추기</h1>
      <div>
        <div className="gl" style={{ marginBottom: 8 }}>글자 크기</div>
        <div className="seg" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          {SIZES.map((s) => (
            <button key={s.id} className="sg sz" aria-pressed={v.fontSize === s.id} onClick={() => setVisit({ fontSize: s.id })}>
              <b style={{ fontSize: s.px, fontWeight: 900 }}>가</b>{s.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="gl">소리 안내</div>
        <div className="ds">화면이 열리면 자동으로 읽어 드립니다.</div>
        <Toggle on={v.autoRead} onChange={(autoRead) => setVisit({ autoRead })} />
      </div>
      <div>
        <div className="gl">쉬운 화면</div>
        <div className="ds">꼭 필요한 정보만 보여 드립니다.</div>
        <Toggle on={v.easyMode} onChange={(easyMode) => setVisit({ easyMode })} />
      </div>
    </Shell>
  )
}
