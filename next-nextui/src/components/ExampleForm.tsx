'use client'

import { Button } from '@nextui-org/button'
import { Checkbox } from '@nextui-org/checkbox'
import { Input, Textarea } from '@nextui-org/input'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Select, SelectItem } from '@nextui-org/select'
import { FormEvent, Key, useState } from 'react'

const animals = [
  {
    label: 'Cat',
    value: 'cat',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    value: 'dog',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    value: 'elephant',
    description: 'The largest land animal',
  },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
  {
    label: 'Giraffe',
    value: 'giraffe',
    description: 'The tallest land animal',
  },
  {
    label: 'Dolphin',
    value: 'dolphin',
    description: 'A widely distributed and diverse group of aquatic mammals',
  },
  {
    label: 'Penguin',
    value: 'penguin',
    description: 'A group of aquatic flightless birds',
  },
  {
    label: 'Zebra',
    value: 'zebra',
    description: 'A several species of African equids',
  },
  {
    label: 'Shark',
    value: 'shark',
    description:
      'A group of elasmobranch fish characterized by a cartilaginous skeleton',
  },
  {
    label: 'Whale',
    value: 'whale',
    description: 'Diverse group of fully aquatic placental marine mammals',
  },
  {
    label: 'Otter',
    value: 'otter',
    description: 'A carnivorous mammal in the subfamily Lutrinae',
  },
  {
    label: 'Crocodile',
    value: 'crocodile',
    description: 'A large semiaquatic reptile',
  },
]

const ExampleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    animals: new Set([]),
    city: '',
    terms: false,
  })

  const handleChange =
    (name: keyof typeof formData) => (v: string | Set<Key> | boolean) => {
      setFormData((pV) => ({ ...pV, [name]: v }))
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)
    const body = Object.fromEntries(data)
    console.log('body', body)
    console.log('formData', formData)
  }

  return (
    <section className="mt-8 w-[400px] mx-auto">
      <h1 className="text-center">Home page</h1>
      <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          className=""
          type="title"
          label="Title"
          placeholder="Enter title"
          // isDisabled={false}
          // isReadOnly={false}
          // isRequired={true}
          size="md"
          color="default"
          variant="flat"
          radius="md"
          labelPlacement="outside"
          description="Example description"
          // isInvalid={true}
          // errorMessage="Example error message"
          value={formData.title}
          onValueChange={handleChange('title')}
        />

        <Textarea
          className=""
          label="Description"
          placeholder="Enter description"
          // isDisabled={false}
          // isReadOnly={false}
          // isRequired={true}
          size="md"
          color="default"
          variant="flat"
          radius="md"
          labelPlacement="outside"
          description="Example description"
          // isInvalid={true}
          // errorMessage="Example error message"
          value={formData.description}
          onValueChange={handleChange('description')}
        />

        <Select
          className=""
          classNames={{
            label: 'pb-2',
          }}
          label="Favorite Animal"
          placeholder="Select an animal"
          items={animals}
          selectionMode="multiple"
          // isDisabled={false}
          disabledKeys={[
            'zebra',
            'tiger',
            'lion',
            'elephant',
            'crocodile',
            'whale',
          ]}
          // isReadOnly={false}
          // isRequired={true}
          size="md"
          color="default"
          variant="flat"
          radius="md"
          labelPlacement="outside"
          // startContent={}
          // selectorIcon={}
          // disableSelectorIconRotation
          // scrollShadowProps={{
          //   isEnabled: false,
          // }}
          // showScrollIndicators
          description="Example description"
          // isInvalid={true}
          // errorMessage="Example error message"
          selectedKeys={formData.animals}
          onSelectionChange={handleChange('animals')}
          // renderValue={} // for chips
        >
          {(animal) => (
            <SelectItem
              key={animal.value}
              // startContent={}
            >
              {animal.label}
            </SelectItem>
          )}
        </Select>

        <RadioGroup
          label="Select your favorite city"
          // isDisabled={false}
          defaultValue="london"
          // orientation="horizontal"
          value={formData.city}
          onValueChange={handleChange('city')}
          description="Example description"
          // isInvalid={true}
          // errorMessage="Example error message"
        >
          <Radio
            value="buenos-aires"
            // description="The capital of Argentina"
          >
            Buenos Aires
          </Radio>
          <Radio value="sydney">Sydney</Radio>
          <Radio value="san-francisco">San Francisco</Radio>
          <Radio value="london">London</Radio>
          <Radio value="tokyo">Tokyo</Radio>
        </RadioGroup>

        <Checkbox
          className="mt-1"
          // defaultSelected
          // isDisabled={false}
          // isReadOnly={false}
          // isRequired={true}
          size="md"
          color="default"
          radius="md"
          // isInvalid={true}
          value={formData.title}
          onValueChange={handleChange('terms')}
        >
          Terms of Use
        </Checkbox>

        {/* Todo Autocomplete */}

        <div className="mt-2 flex justify-center gap-4">
          <Button>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </section>
  )
}

export default ExampleForm
