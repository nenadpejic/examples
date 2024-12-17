import { Combobox as HUICombobox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

type Option = { id: string; name: string }

type ComboboxProps<FormValues extends FieldValues> = {
  name: Path<FormValues>
  control: Control<FormValues>
  options: Option[]
  label?: string
  recommendations?: Option[]
}

const Combobox = <FormValues extends FieldValues>({
  name,
  control,
  options,
  label,
  recommendations,
}: ComboboxProps<FormValues>) => {
  const {
    formState: { defaultValues },
    field: { onChange },
    fieldState: { error },
  } = useController({ name, control })
  const [selectedOptionsIds, setSelectedOptionsIds] = useState<string[]>(
    defaultValues?.[name] || []
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    onChange(selectedOptionsIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionsIds])

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase())
        })

  const toggleOption = (optionId: string) => {
    if (selectedOptionsIds.includes(optionId)) {
      setSelectedOptionsIds((pVs) => pVs.filter((pV) => pV !== optionId))
    } else {
      setSelectedOptionsIds((pVs) => [...pVs, optionId])
    }
  }

  const recommendedOptions = recommendations?.map((recommendation) =>
    selectedOptionsIds.includes(recommendation.id)
      ? { ...recommendation, selected: true }
      : { ...recommendation, selected: false }
  )

  return (
    <HUICombobox
      value={selectedOptionsIds}
      onChange={(value) => {
        setSelectedOptionsIds(value)
      }}
      multiple
    >
      <div>
        <p>Selected:</p>
        {selectedOptionsIds.length > 0 && (
          <ul>
            {selectedOptionsIds.map((optionId) => (
              <li key={optionId} onClick={() => toggleOption(optionId)}>
                {options.find((option) => option.id === optionId)?.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p>Recommendations:</p>
        {recommendedOptions && recommendedOptions?.length > 0 && (
          <ul>
            {recommendedOptions?.map((reccomendation) => (
              <li
                key={reccomendation.id + '-r'}
                onClick={() => toggleOption(reccomendation.id)}
              >
                {reccomendation.name}
                {reccomendation.selected ? '-' : '+'}
              </li>
            ))}
          </ul>
        )}
      </div>

      {label && <HUICombobox.Label>{label}</HUICombobox.Label>}
      <HUICombobox.Input onChange={(event) => setQuery(event.target.value)} />
      <HUICombobox.Options>
        {filteredOptions.map((option) => (
          <HUICombobox.Option key={option.id} value={option.id}>
            {option.name}
          </HUICombobox.Option>
        ))}
      </HUICombobox.Options>

      {error?.message && <p>{error.message}</p>}
    </HUICombobox>
  )
}

export default Combobox
