import { useEffect, useRef, useState } from 'react'

const useAnimationTrigger = (threshold = 0.3) => {
  const animationThresholdRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!animationThresholdRef.current) {
      return
    }

    const options = {
      root: null, // If null defaults to the browsers viewport
      rootMargin: '0px',
      threshold,
    }

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry

          if (isIntersecting) {
            observer.disconnect()
            setIsAnimating(true)
          }
        })
      },
      options
    )

    intersectionObserver.observe(animationThresholdRef.current)
  }, [threshold])

  return { isAnimating, animationThresholdRef }
}

export default useAnimationTrigger
