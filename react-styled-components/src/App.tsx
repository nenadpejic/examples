import { useRef } from 'react'
import './App.css'
import Animate from './components/Animate/Animate'
import useAnimationTrigger from './hooks/useAnimationTrigger'

function App() {
  const animationThresholdRef = useRef<HTMLElement>(null)
  const { isAnimating } = useAnimationTrigger(animationThresholdRef)

  return (
    <div className="App">
      <section ref={animationThresholdRef}>
        <Animate isAnimating={isAnimating} animate="slide-up-text">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </Animate>
      </section>
    </div>
  )
}

export default App
