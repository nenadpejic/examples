import { ReactNode, isValidElement, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon from './Icon'
import Paragraph from './Paragraph'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortColumn = (sort: Sort, sortBy: string) => (a: any, b: any) => {
  if (!sortBy) return 0
  const aValue =
    typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy]
  const bValue =
    typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy]

  if (sort === 'asc') {
    if (aValue < bValue) {
      return -1
    }
    if (aValue > bValue) {
      return 1
    }
    return 0
  } else {
    if (aValue < bValue) {
      return 1
    }
    if (aValue > bValue) {
      return -1
    }
    return 0
  }
}

export type TableConfig<T> = {
  align?: 'left' | 'center' | 'right'
  component?: ReactNode | ((props: { data: T }) => JSX.Element)
  field?: keyof T
  label: string
}[]

type Props = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ({ id: string } & any)[]
  error: Error | null
  isLoading: boolean
  tableConfig: TableConfig<Props['data'][0]>
}

type Sort = 'asc' | 'desc'

const Table = ({ className, data, error, isLoading, tableConfig }: Props) => {
  const [sort, setSort] = useState<Sort>('asc')
  const [sortBy, setSortBy] = useState<string>('')

  return (
    <table className={twMerge('text-gray-900', className)}>
      <thead>
        <tr className="border-b border-gray-300">
          {tableConfig.map((conf, i) => {
            const { label, field, align = 'left' } = conf

            return (
              <th key={i} className="p-1 md:p-2">
                {field ? (
                  <button
                    className={twMerge(
                      'flex',
                      align === 'left'
                        ? 'mr-auto'
                        : align === 'right'
                        ? 'ml-auto'
                        : 'mx-auto',
                    )}
                    onClick={() => {
                      if (!field) return
                      setSortBy(String(field))
                      setSort((pV) => (pV === 'asc' ? 'desc' : 'asc'))
                    }}
                  >
                    {sortBy === field && (
                      <Icon
                        name={
                          sort === 'asc'
                            ? 'keyboardArrowUp'
                            : 'keyboardArrowDown'
                        }
                      />
                    )}
                    <span className={twMerge(sortBy !== field && 'ml-6')}>
                      {label}
                    </span>
                  </button>
                ) : (
                  label
                )}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {(isLoading || error || data.length === 0) && (
          <tr className="h-[50px]">
            <td
              className="text-center"
              colSpan={Object.keys(tableConfig).length}
            >
              {isLoading && (
                <Paragraph variant="lg" className="text-gray-500">
                  Loading...
                </Paragraph>
              )}
              {error && (
                <Paragraph variant="lg" className="text-red-500">
                  {error.message}
                </Paragraph>
              )}
              {!isLoading && !error && data.length === 0 && (
                <Paragraph variant="lg">No products found</Paragraph>
              )}
            </td>
          </tr>
        )}
        {data.sort(sortColumn(sort, sortBy)).map((singleData) => (
          <tr key={singleData.id} className="border-b border-gray-300 h-[50px]">
            {tableConfig.map((conf, i) => {
              const { component, field, align } = conf
              let content

              if (field) {
                content = singleData[field]
              } else if (component) {
                if (typeof component === 'function') {
                  content = component({ data: singleData })
                } else {
                  content = component
                }
              }

              return (
                <td
                  key={singleData.id + i}
                  className={twMerge(
                    'px-1 md:px-2',
                    field && 'pl-7 md:pl-8',
                    typeof content === 'number' && !align && 'text-right',
                    align && `text-${align}`,
                  )}
                >
                  {(isValidElement(content) ||
                    typeof content === 'string' ||
                    typeof content === 'number') &&
                    content}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
