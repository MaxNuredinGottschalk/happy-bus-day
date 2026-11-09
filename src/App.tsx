import ElderlyApp from './elderly/ElderlyApp'
import DemoPanel from './staff/DemoPanel'

// Guardian screens (G1–G7) will live in src/guardian/ and get their own route prefix, e.g. #/g1.
export default function App() {
  return (
    <div className="stage">
      <ElderlyApp />
      <DemoPanel />
    </div>
  )
}
