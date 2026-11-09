import type { ReactNode } from 'react'

function Svg({ size = 28, sw = 2.4, children }: { size?: number; sw?: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}>{children}</svg>
  )
}
type P = { size?: number; sw?: number }

export const Back = (p: P) => <Svg sw={2.6} {...p}><path d="M15 5l-7 7 7 7" /></Svg>
export const Arrow = (p: P) => <Svg size={32} sw={2.6} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
export const Check = (p: P) => <Svg sw={3.4} {...p}><path d="M4 12.5l5 5L20 6.5" /></Svg>
export const Speaker = (p: P) => <Svg {...p}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" /></Svg>
export const Stop = (p: P) => <svg width={p.size ?? 28} height={p.size ?? 28} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
export const Help = (p: P) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17h.01" /></Svg>
export const Phone = (p: P) => <Svg size={30} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></Svg>
export const Bus = (p: P) => <Svg sw={2.2} {...p}><rect x="4" y="3" width="16" height="15" rx="3" /><path d="M4 11h16M8 21v-3M16 21v-3" /></Svg>
export const Calendar = (p: P) => <Svg size={40} sw={2.2} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>
export const Clock = (p: P) => <Svg size={40} sw={2.2} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
export const Pin = (p: P) => <Svg size={40} sw={2.2} {...p}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>
export const Wave = (p: P) => <Svg size={36} {...p}><path d="M5 10v4M9 6v12M13 9v6M17 4v16M21 11v2" /></Svg>
export const IdCard = (p: P) => <Svg size={34} sw={2.2} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M6.5 16c.5-1.5 4.5-1.5 5 0M14 10h4M14 14h3" /></Svg>
export const Pill = (p: P) => <Svg size={34} sw={2.2} {...p}><rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)" /><path d="M9 15l6-6" /></Svg>
export const Glasses = (p: P) => <Svg size={34} sw={2.2} {...p}><circle cx="7" cy="14" r="3.5" /><circle cx="17" cy="14" r="3.5" /><path d="M10.5 14h3M3.5 14L5 8M20.5 14L19 8" /></Svg>
export const Shirt = (p: P) => <Svg size={34} sw={2.2} {...p}><path d="M8 4l-5 3 2 4 2-1v10h10V10l2 1 2-4-5-3a4 4 0 01-8 0z" /></Svg>
export const Person = (p: P) => <Svg size={48} sw={2.2} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></Svg>
export const Lock = (p: P) => <Svg size={26} {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></Svg>
