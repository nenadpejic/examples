import { SVGProps, Suspense, lazy } from 'react'

const iconsList = {
  // add: lazy(() => import('@/assets/add.svg?react')),
  // attachMoney: lazy(() => import('@/assets/attach_money.svg?react')),
  checkBox: lazy(() => import('@/assets/check_box.svg?react')),
  checkBoxBlank: lazy(() => import('@/assets/check_box_blank.svg?react')),
  // close: lazy(() => import('@/assets/close.svg?react')),
  // delete: lazy(() => import('@/assets/delete.svg?react')),
  keyboardArrowDown: lazy(
    () => import('@/assets/keyboard_arrow_down.svg?react'),
  ),
  keyboardArrowUp: lazy(() => import('@/assets/keyboard_arrow_up.svg?react')),
  // more: lazy(() => import('@/assets/more.svg?react')),
  radioButtonChecked: lazy(
    () => import('@/assets/radio_button_checked.svg?react'),
  ),
  radioButtonUnchecked: lazy(
    () => import('@/assets/radio_button_unchecked.svg?react'),
  ),
  remove: lazy(() => import('@/assets/remove.svg?react')),
  // search: lazy(() => import('@/assets/search.svg?react')),
  // shoppingBag: lazy(() => import('@/assets/shopping_bag.svg?react')),
}

export type IconName = keyof typeof iconsList

type Props = {
  name: IconName
} & Omit<SVGProps<SVGSVGElement>, 'ref'>

const Icon = ({ name, ...rest }: Props) => {
  const Icon = iconsList[name]

  return (
    <Suspense>
      <Icon {...rest} />
    </Suspense>
  )
}

export default Icon
