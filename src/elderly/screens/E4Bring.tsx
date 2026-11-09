// E4 — what to bring. TODO(team): the real list is not decided; these four are the draft's examples.
import type { ReactNode } from 'react'
import { go } from '../../router'
import { setVisit, useVisit } from '../../state/visit'
import Shell from '../Shell'
import { Arrow, Check, Glasses, IdCard, Pill, Shirt } from '../icons'

const ITEMS: { id: string; name: string; hint: string; icon: ReactNode }[] = [
  { id: 'id', name: '신분증', hint: '주민등록증 등', icon: <IdCard /> },
  { id: 'medicine', name: '복용 중인 약', hint: '약 봉투도 됩니다', icon: <Pill /> },
  { id: 'glasses', name: '안경', hint: '평소 쓰시는 것', icon: <Glasses /> },
  { id: 'clothes', name: '편한 옷', hint: '소매 걷기 쉬운 옷', icon: <Shirt /> },
]

export default function E4Bring() {
  const v = useVisit()
  const toggle = (id: string) => setVisit({ broughtItems: { ...v.broughtItems, [id]: !v.broughtItems[id] } })
  return (
    <Shell
      back={{ to: 'e3' }} title="방문 전 안내 · 3 / 4"
      speak="가져오실 것. 신분증, 복용 중인 약, 안경, 편한 옷. 챙기신 것을 눌러 표시하세요."
      actions={<button className="btn pri" onClick={() => go('e4done')}>확인했습니다<Arrow /></button>}
    >
      <h1 className="h1">가져오실 것</h1>
      <div style={{ fontSize: 24 }}>챙기신 것을 눌러 표시하세요.</div>
      {ITEMS.map((it) => {
        const on = !!v.broughtItems[it.id]
        return (
          <button key={it.id} className="it" aria-pressed={on} onClick={() => toggle(it.id)}>
            <span className="bx">{on && <Check size={26} />}</span>
            {it.icon}
            <span className="tx"><b>{it.name}</b><small>{it.hint}</small></span>
            <span className="st">{on ? '챙김' : '아직'}</span>
          </button>
        )
      })}
      <div style={{ fontSize: 20, color: 'var(--muted)' }}>챙기신 것은 보호자 {v.guardianName}님께도 전해집니다.</div>
    </Shell>
  )
}
