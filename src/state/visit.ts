// Shared visit state — the single source of truth for BOTH the elderly and guardian screens.
// Team model: 예약 확인 → 현장 접수 → 대기 → 이용 시작 (+ called / done).
// Check-in is recorded by STAFF, never by the visitor tapping "arrived".
// Persisted in localStorage and synced across browser tabs, so a "staff" tab can drive an "elderly" tab in a demo.
import { useSyncExternalStore } from 'react'

export type VisitStatus =
  | 'booked'     // 예약 확인
  | 'checked_in' // 현장 접수 (recorded by staff)
  | 'waiting'    // 대기
  | 'called'     // 호출 (your turn)
  | 'in_service' // 이용 중
  | 'done'       // 마침

export const STATUS_ORDER: VisitStatus[] = ['booked', 'checked_in', 'waiting', 'called', 'in_service', 'done']
export const STATUS_LABEL: Record<VisitStatus, string> = {
  booked: '예약 확인',
  checked_in: '현장 접수',
  waiting: '대기',
  called: '호출',
  in_service: '이용 중',
  done: '마침',
}

export type ShareChoice = 'yes' | 'no' | 'later' | null
export type FontSize = 'normal' | 'large' | 'xlarge'

export interface VisitState {
  // --- data (sample data from the draft; replace with real data later) ---
  elderName: string
  guardianName: string
  guardianRelation: string // 아드님
  service: string
  dateText: string
  timeText: string
  placeText: string
  // --- queue: three SEPARATE values, never derived from each other in the UI ---
  status: VisitStatus
  queueNumber: number
  nowServing: number
  peopleAhead: number
  // Estimate shown ONLY with an operational basis. null = "알 수 없음" screen (E6).
  avgMinutesPerPerson: number | null
  lastCheckedAt: number // epoch ms; shown as "10시 42분 확인"
  // --- elderly-side choices ---
  broughtItems: Record<string, boolean>
  helpRequestedAt: number | null
  shareChoice: ShareChoice // null = nothing chosen = nothing shared (E10)
  // --- settings (E2) ---
  fontSize: FontSize
  autoRead: boolean
  easyMode: boolean
}

const KEY = 'hbd-visit-state-v1'

export const initialState: VisitState = {
  elderName: '김순자',
  guardianName: '김준호',
  guardianRelation: '아드님',
  service: '건강 상담',
  dateText: '11월 5일 목요일',
  timeText: '오전 10시 ~ 낮 12시',
  placeText: '달빛마을 회관 앞',
  status: 'booked',
  queueNumber: 23,
  nowServing: 19,
  peopleAhead: 3,
  avgMinutesPerPerson: 5,
  lastCheckedAt: Date.now(),
  broughtItems: { id: false, medicine: false, glasses: false, clothes: false },
  helpRequestedAt: null,
  shareChoice: null,
  fontSize: 'large',
  autoRead: false,
  easyMode: true,
}

function load(): VisitState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initialState, ...JSON.parse(raw) }
  } catch { /* storage may be blocked; fall back to defaults */ }
  return initialState
}

let state: VisitState = load()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
}

export function setVisit(patch: Partial<VisitState>) {
  state = { ...state, ...patch }
  save()
  emit()
}

/** Staff action: move the visit to a new status and refresh the "last checked" time. */
export function setStatus(status: VisitStatus) {
  const patch: Partial<VisitState> = { status, lastCheckedAt: Date.now() }
  if (status === 'called') patch.nowServing = state.queueNumber
  if (status === 'waiting' && state.nowServing >= state.queueNumber) {
    patch.nowServing = state.queueNumber - state.peopleAhead - 1
  }
  setVisit(patch)
}

export function resetVisit() {
  state = { ...initialState, lastCheckedAt: Date.now() }
  save()
  emit()
}

window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    state = load()
    emit()
  }
})

export function useVisit(): VisitState {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => state,
  )
}

export function formatClock(ms: number): string {
  const d = new Date(ms)
  return `${d.getHours()}시 ${d.getMinutes()}분`
}
