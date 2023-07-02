import { ReactElement } from 'react';

export interface Row {
  [key: string]: any,
  id: string,
  isActive?: boolean
}

export type Rows = Row[]

export interface Column<T> {
  key: string
  label: string
  align: 'left' | 'right' | 'center'
  getValue: (row: T) => string | number | undefined | ReactElement<any, any>
}

export type Columns<T> = Column<T>[]

export type Order = 'asc' | 'desc'

export type HandleInteract = (params: {
  page: number,
  rowsPerPage: number,
  order: Order,
  orderBy: keyof Row,
}) => void

export interface MenuOption {
  key: string
  label: string
  onClick: (row: Row) => void
}

export type MenuOptions = MenuOption[] | []
