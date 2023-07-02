declare module 'styled-components' {
  type BaseDefaultTheme = typeof defaultTheme
  export interface DefaultTheme extends BaseDefaultTheme {}
}

const animationSpace = {
  a_xxs: '30px',
  a_xs: '60px',
  a_s: '100px',
  a_m: '120px',
  a_l: '200px',
}

const defaultTheme = {
  animationSpace,
}

export default defaultTheme
