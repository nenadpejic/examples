import { FormEvent, useState } from 'react'
import Heading from './components/common/Heading'
import Autocomplete from './components/common/inputs/Autocomplete'
import Button from './components/common/inputs/Button'
import Checkbox from './components/common/inputs/Checkbox'
import NumberInput from './components/common/inputs/NumberInput'
import RadioGroup from './components/common/inputs/RadioGroup'
import Select from './components/common/inputs/Select'
import TextArea from './components/common/inputs/TextArea'
import TextInput from './components/common/inputs/TextInput'

const categoryOptions = [
  { value: 'Boots', label: 'Boots' },
  { value: 'Jackets', label: 'Jackets' },
  { value: 'Hats', label: 'Hats' },
]

const colorOptions = [
  { value: 'Red', label: 'Red' },
  { value: 'Green', label: 'Green' },
  { value: 'Blue', label: 'Blue' },
]

const featuresOptions = [
  { value: 'Advanced Camber Profile', label: 'Advanced Camber Profile' },
  {
    value: 'Customizable Binding Adjustments',
    label: 'Customizable Binding Adjustments',
  },
  {
    value: 'Integrated Impact Protection',
    label: 'Integrated Impact Protection',
  },
]

const defaultValues = {
  name: '',
  description: '',
  image: '',
  price: 0,
  stockQuantity: 0,
  category: '',
  color: '',
  features: [] as string[],
  availability: false,
}

function App() {
  const [formData, setFormData] = useState(defaultValues)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(formData)
  }

  return (
    <>
      <Heading>React UI</Heading>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <TextInput
            label="Name"
            placeholder="Product name"
            full
            value={formData.name}
            onChange={(e) =>
              setFormData((pV) => ({ ...pV, name: e.target.value }))
            }
            required
          />
          <TextArea
            label="Description"
            placeholder="Product description"
            full
            value={formData.description}
            onChange={(e) =>
              setFormData((pV) => ({ ...pV, description: e.target.value }))
            }
            required
          />
          <TextInput
            label="Image"
            placeholder="https://example.com"
            full
            value={formData.image}
            onChange={(e) =>
              setFormData((pV) => ({ ...pV, image: e.target.value }))
            }
            required
          />
          <div className="md:flex gap-4">
            <NumberInput
              className="md:w-1/2"
              label="Price"
              placeholder="1234"
              full
              value={formData.price}
              onChange={(e) =>
                setFormData((pV) => ({
                  ...pV,
                  price: Number(e.target.value),
                }))
              }
              required
            />
            <NumberInput
              className="md:w-1/2"
              label="Stock Quantity"
              placeholder="1234"
              full
              value={formData.stockQuantity}
              onChange={(e) =>
                setFormData((pV) => ({
                  ...pV,
                  stockQuantity: Number(e.target.value),
                }))
              }
              required
            />
          </div>
          <RadioGroup
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(e) =>
              setFormData((pV) => ({ ...pV, category: e.target.value }))
            }
            required
          />
          <Select
            label="Color"
            options={colorOptions}
            full
            value={formData.color}
            onChange={(e) =>
              setFormData((pV) => ({ ...pV, color: e.target.value }))
            }
            required
          />
          <Autocomplete
            label="Features"
            options={featuresOptions}
            full
            multiple
            value={formData.features}
            onChange={(v) => setFormData((pV) => ({ ...pV, features: v }))}
            required
          />
          <Checkbox
            label="Is Available"
            checked={formData.availability}
            onChange={(e) =>
              setFormData((pV) => ({ ...pV, availability: e.target.checked }))
            }
            required
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 mt-8">
          <Button onClick={() => setFormData(defaultValues)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  )
}

export default App
