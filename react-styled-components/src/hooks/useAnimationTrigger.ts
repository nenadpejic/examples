import { MutableRefObject, useEffect, useState } from 'react'

const useAnimationTrigger = (
  elementRef: MutableRefObject<Element | null>,
  intersectionObserverInit = {
    root: null, // If null defaults to the browsers viewport
    rootMargin: '0px',
    threshold: 0.2,
  }
) => {
  const [shouldAnimate, setshouldAnimate] = useState(false)

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver
    const node = elementRef?.current

    if (!hasIOSupport || !node) return

    const intersectionObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          setshouldAnimate(true)
          observer.disconnect()
        }
      },
      intersectionObserverInit
    )

    intersectionObserver.observe(node)

    return () => intersectionObserver.disconnect()
  }, [elementRef, intersectionObserverInit])

  return { shouldAnimate }
}

export default useAnimationTrigger
