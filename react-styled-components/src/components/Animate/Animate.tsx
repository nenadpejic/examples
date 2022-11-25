import { ReactNode } from 'react'
import styled, { css, DefaultTheme, keyframes } from 'styled-components'

type Amount = keyof DefaultTheme['animationSpace']

type AnimateType =
  | 'slide-up-text'
  | 'slide-up-background-image'
  | 'fade-in'
  | 'clip-y-image'
  | 'clip-up-image'

type CommonProps = {
  children?: ReactNode
  shouldAnimate: boolean
  duration?: number
  timingFunction?: string
  delay?: number
}

type ConditionalProps =
  | {
      animate: 'slide-up-text' | 'clip-y-image' | 'clip-up-image'
      amount?: Amount
    }
  | {
      animate: 'slide-up-background-image' | 'fade-in'
      amount?: never
    }

type AnimateProps = CommonProps & ConditionalProps

const Animate = ({
  children,
  shouldAnimate,
  duration = 1,
  timingFunction = 'ease',
  delay,
  animate,
  amount = 'a_l',
  ...rest
}: AnimateProps) => {
  return (
    <StyledBox
      as="div"
      animate={animate}
      shouldAnimate={shouldAnimate}
      amount={amount}
      duration={duration}
      timingFunction={timingFunction}
      delay={delay}
      {...rest}
    >
      {children}
    </StyledBox>
  )
}

const StyledBox = styled.div<{
  shouldAnimate: boolean
  duration: number
  timingFunction: string
  delay?: number
  animate: AnimateType
  amount: Amount
}>`
  ${({
    theme,
    shouldAnimate,
    animate,
    amount,
    delay,
    duration,
    timingFunction,
  }) => {
    if (typeof window !== 'undefined') {
      const hasIOSupport = !!window?.IntersectionObserver
      if (!hasIOSupport) return
    }

    const amountInPixels = theme.animationSpace[amount]
    const commonStyles = `
      ${delay ? `animation-delay: ${delay}s;` : ''}
      ${duration ? `animation-duration: ${duration}s;` : ''}
      ${timingFunction ? `animation-timing-function: ${timingFunction};` : ''}
      animation-fill-mode: forwards;
    `

    switch (animate) {
      case 'slide-up-text':
        return css`
          opacity: 0;
          ${shouldAnimate &&
          css`
            animation-name: ${keyframes`
                  from {
                    opacity: 0;
                    transform: translateY(${amountInPixels});
                  } to {
                    opacity: 1;
                    transform: translateY(0px);
                  }
                `};
            ${commonStyles}
          `}
        `
      case 'slide-up-background-image':
        return css`
          & img {
            transform: translateY(30px);
            ${shouldAnimate &&
            css`
              animation-name: ${keyframes`
                  from {
                    transform: translateY(30px);
                  } to {
                    transform: translateY(0px);
                  }
                `};
              ${commonStyles}
            `}
          }
        `
      case 'fade-in':
        return css`
          opacity: 0;
          ${shouldAnimate &&
          css`
            animation-name: ${keyframes`
                  from {
                    opacity: 0;
                  } to {
                    opacity: 1;
                  }
                `};
            ${commonStyles}
          `}
        `
      case 'clip-y-image':
        return css`
          clip-path: inset(${amountInPixels} 0);
          ${shouldAnimate &&
          css`
            animation-name: ${keyframes`
                  from {
                    clip-path: inset(${amountInPixels} 0)
                  } to {
                    clip-path: inset(0 0)
                  }
                `};
            ${commonStyles}
          `}
        `
      case 'clip-up-image':
        return css`
          clip-path: inset(${amountInPixels} 0 0 0);
          ${shouldAnimate &&
          css`
            animation-name: ${keyframes`
                  from {
                    clip-path: inset(${amountInPixels} 0 0 0)
                  } to {
                    clip-path: inset(0 0)
                  }
                `};
            ${commonStyles}
          `}
        `
    }
  }};
`

export default Animate
