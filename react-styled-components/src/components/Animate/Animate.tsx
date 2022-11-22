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
  isAnimating: boolean
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
  isAnimating,
  duration = 1,
  timingFunction = 'ease',
  delay,
  animate,
  amount = 'a_l',
  ...rest
}: AnimateProps) => {
  return (
    <StyledDiv
      as="div"
      animate={animate}
      isAnimating={isAnimating}
      amount={amount}
      duration={duration}
      timingFunction={timingFunction}
      delay={delay}
      {...rest}
    >
      {children}
    </StyledDiv>
  )
}

const StyledDiv = styled.div<{
  isAnimating: boolean
  duration: number
  timingFunction: string
  delay?: number
  animate: AnimateType
  amount: Amount
}>`
  ${({
    theme,
    isAnimating,
    animate,
    amount,
    delay,
    duration,
    timingFunction,
  }) => {
    const amountInPixels = theme.animationSpace[amount]
    const commonStyles = `
      ${delay ? `animation-delay: ${delay}s;` : ''}
      ${duration ? `animation-duration: ${duration}s;` : ''}
      ${timingFunction ? `animation-timing-function: ${timingFunction};` : ''}
    `

    switch (animate) {
      case 'slide-up-text':
        return isAnimating
          ? css`
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
            `
          : 'opacity: 0;'

      case 'slide-up-background-image':
        return isAnimating
          ? css`
              & img {
                animation-name: ${keyframes`
                  from {
                    transform: translateY(30px);
                  } to {
                    transform: translateY(0px);
                  }
                `};
                ${commonStyles}
              }
            `
          : `& img {transform: translateY(30px);}`
      case 'fade-in':
        return isAnimating
          ? css`
              animation-name: ${keyframes`
                  from {
                    opacity: 0;
                  } to {
                    opacity: 1;
                  }
                `};
              ${commonStyles}
            `
          : 'opacity: 0;'
      case 'clip-y-image':
        return isAnimating
          ? css`
              animation-name: ${keyframes`
                  from {
                    clip-path: inset(${amountInPixels} 0)
                  } to {
                    clip-path: inset(0 0)
                  }
                `};
              ${commonStyles}
            `
          : `clip-path: inset(${amountInPixels} 0);`
      case 'clip-up-image':
        return isAnimating
          ? css`
              animation-name: ${keyframes`
                  from {
                    clip-path: inset(${amountInPixels} 0 0 0)
                  } to {
                    clip-path: inset(0 0)
                  }
                `};
              ${commonStyles}
            `
          : `clip-path: inset(${amountInPixels} 0 0 0);`
    }
  }};
`

export default Animate
