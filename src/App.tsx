import ElderlyApp from './elderly/ElderlyApp'
import DemoPanel from './staff/DemoPanel'
import G6VisitStatus from './guardian/G6VisitStatus'
import G7PostVisit from './guardian/G7PostVisit'
import { usePath } from './router'

// Guardian screens (G1–G7) will live in src/guardian/ and get their own route prefix, e.g. #/g1.
export default function App() {
  const path = usePath()
  let screen = <ElderlyApp />
  if (path === 'g6') screen = <G6VisitStatus />
  if (path === 'g7') screen = <G7PostVisit />

  return (
    <div className="stage">
      {screen}
      <DemoPanel />
    </div>
  )
}
