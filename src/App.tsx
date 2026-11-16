import ElderlyApp from './elderly/ElderlyApp'
import DemoPanel from './staff/DemoPanel'
import G6VisitStatus from './guardian/G6VisitStatus'
import { usePath } from './router'

// Guardian screens (G1–G7) will live in src/guardian/ and get their own route prefix, e.g. #/g1.
export default function App() {
  const path = usePath()
  return (
    <div className="stage">
      {path === 'g6' ? <G6VisitStatus /> : <ElderlyApp />}
      <DemoPanel />
    </div>
  )
}
