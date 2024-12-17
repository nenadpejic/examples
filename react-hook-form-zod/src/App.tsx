import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import './App.css'
import Combobox from './components/Combobox'

const people = [
  { id: '1', name: 'Durward Reynolds' },
  { id: '2', name: 'Kenton Towne' },
  { id: '3', name: 'Therese Wunsch' },
  { id: '4', name: 'Benedict Kessler' },
  { id: '5', name: 'Katelyn Rohan' },
]

const getStep = () =>
  Number(new URLSearchParams(document.location.search).get('step'))

// Zod
const step1Schema = z.object({
  name: z.string().nonempty(),
  people: z.array(z.string()).nonempty(),
})
const step2Schema = z.object({
  email: z.string().email(),
})
const step3Schema = step1Schema.merge(step2Schema)
// Yup
// const step1Schema = yup.object({
//   name: yup.string().required(),
//   people: yup.array(
//     yup.object({
//       id: yup.string().required(),
//       test: yup.string().required(),
//     })
//   ),
// })
// const step2Schema = yup.object({
//   email: yup.string().email(),
// })
// const step3Schema = step1Schema.concat(step2Schema)
const schemaMap = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
}

type FormValues = {
  name: string
  people: string[]
  email: string
}

function App() {
  const [step, setStep] = useState<number>(getStep() || 1)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control,
  } = useForm<FormValues>({
    defaultValues: JSON.parse(localStorage.getItem('form-data')!) || {
      name: '',
      people: [],
      email: '',
    },
    resolver: zodResolver(schemaMap[step as 1 | 2 | 3]),
    // resolver: yupResolver(schemaMap[step as 1 | 2 | 3]),
  })

  // console.log(watch())
  // console.log(errors)

  const onValid = (data: FieldValues) => {
    console.log(data)
    localStorage.setItem('form-data', JSON.stringify(data))
    if (step === 3) {
      localStorage.removeItem('form-data')
      reset()
      history.pushState({}, '', `?step=1`)
      setStep(1)
      return
    }
    history.pushState({}, '', `?step=${step + 1}`)
    setStep((pS) => pS + 1)
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {step === 1 && (
        <>
          <div>
            <label htmlFor="name">
              Name
              <input id="name" type="text" {...register('name')} />
            </label>
            {errors.name?.message && <p>{errors.name?.message}</p>}
          </div>

          <Combobox
            name="people"
            control={control}
            label="People"
            options={people}
            recommendations={people.slice(0, 2)}
          />
        </>
      )}

      {step === 2 && (
        <div>
          <label htmlFor="email">
            Email
            <input id="email" type="text" {...register('email')} />
          </label>
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
      )}

      {step === 3 && (
        <>
          <div>
            <label htmlFor="name">
              Name
              <input id="name" type="text" {...register('name')} />
            </label>
            {errors.name?.message && <p>{errors.name?.message}</p>}
          </div>

          <div>
            <label htmlFor="email">
              Email
              <input id="email" type="text" {...register('email')} />
            </label>
            {errors.email?.message && <p>{errors.email?.message}</p>}
          </div>
        </>
      )}

      <button type="submit" style={{ display: 'block', margin: '1rem auto' }}>
        Submit
      </button>
    </form>
  )
}

export default App
