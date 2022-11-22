# React styled components

Example react app using styled components

## Featires

- Custom Animations

### Animations

- Create custom component `Animate`
- Create custom hook `useAnimationTriger`
- Wrap component you want to animate in the `Animate` component
- Call the `useAnimationTrigger` hook to get the `isAnimating` boolean value and `animationThresholdRef` reference
- Set the `animationThresholdRef` as a ref on the component which threshold you want watched ti determin when the animation starts
- Set the `isAnimating` to the `Animate` component so it knows when to start the animation

NOTES:

- There are multiple ways to setup animations. Using the fade-in animtion as an example.

1. [Option 1] You can dynamically switch between two styles based on animation trigger validation. Once the animation ends it returns to having no styling set.

```
isAnimating
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
```

2. [Option 2] You can set the initial style to be always present, and then add the animation styling on animation trigger validation. This way you will need the `animation-fill-mode: forwards` in order to keep the style from reverting to the initial style set.

```
`
opacity: 0;
animation-fill-mode: forwards;
${
  isAnimating &&
  css`
    animation-name: ${keyframes`
        from {
          opacity: 0;
        } to {
          opacity: 1;
        }
      `};
    ${commonStyles}
  `
}
`
```
