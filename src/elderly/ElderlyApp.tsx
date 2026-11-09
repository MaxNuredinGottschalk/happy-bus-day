// Elderly flow E1–E10. The screen follows the visit status set by staff (see staff/DemoPanel.tsx).
import { useEffect, useRef } from 'react'
import { go, usePath } from '../router'
import { useVisit, type VisitStatus } from '../state/visit'
import E1Hello from './screens/E1Hello'
import E2Settings from './screens/E2Settings'
import E3Schedule from './screens/E3Schedule'
import E4Bring from './screens/E4Bring'
import E4Done from './screens/E4Done'
import Queue from './screens/Queue'
import E7Turn from './screens/E7Turn'
import E8Help from './screens/E8Help'
import E9Done from './screens/E9Done'
import E10Consent from './screens/E10Consent'

export const ELDERLY_SCREENS = ['e1', 'e2', 'e3', 'e4', 'e4done', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10'] as const

/** Which screen the visitor should see when staff change the status. */
function screenFor(status: VisitStatus, estimateKnown: boolean): string | null {
  switch (status) {
    case 'checked_in': case 'waiting': return estimateKnown ? 'e5' : 'e6'
    case 'called': case 'in_service': return 'e7'
    case 'done': return 'e9'
    default: return null // 'booked': the visitor is in the pre-visit flow, don't move them
  }
}

export default function ElderlyApp() {
  const path = usePath()
  const v = useVisit()
  const prev = useRef(v.status)

  useEffect(() => {
    if (prev.current !== v.status) {
      prev.current = v.status
      const next = screenFor(v.status, v.avgMinutesPerPerson !== null)
      if (next) go(next)
    }
  }, [v.status, v.avgMinutesPerPerson])

  switch (path) {
    case 'e2': return <E2Settings />
    case 'e3': return <E3Schedule />
    case 'e4': return <E4Bring />
    case 'e4done': return <E4Done />
    case 'e5': return <Queue />
    case 'e6': return <Queue forceUnknown />
    case 'e7': return <E7Turn />
    case 'e8': return <E8Help />
    case 'e9': return <E9Done />
    case 'e10': return <E10Consent />
    default: return <E1Hello />
  }
}
