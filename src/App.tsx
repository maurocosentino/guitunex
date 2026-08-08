import { useState } from 'react'
import Header from './shared/components/Header'
import AppShell from './shared/components/AppShell'
import TunerPage from './features/tuner/components/TunerPage'
import MetronomePage from './features/metronome/components/MetronomePage'
import type { AppModule } from './shared/types/module'

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('tuner')

  return (
    <AppShell>
      <Header activeModule={activeModule} onModuleChange={setActiveModule} />

      {activeModule === 'tuner' ? <TunerPage /> : <MetronomePage />}
    </AppShell>
  )
}

export default App
