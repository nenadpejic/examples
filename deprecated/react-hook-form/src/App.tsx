import { useEffect } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import './App.css'

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
          username: {
            type: 'required',
            message: 'Required',
          },
        }
      : {},
  }
}

type FormValues = {
  username: string
  email: string
  age: number
}

function App() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isSubmitted,
      isSubmitting,
      isSubmitSuccessful,
      submitCount,
      isValid,
      isValidating,
      defaultValues,
    },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      age: 0,
    },
    // mode: 'onTouched', // Used to validate fields on touched
    resolver,
  })

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  return (
    <>
      <h1>React Hook Form</h1>

      <form
        onSubmit={handleSubmit(async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          console.log('data', data)
          reset()
          alert('Form submitted successfully')
        })}
      >
        <label htmlFor="username">
          Username
          <span className="label-required-marker">*</span>
        </label>
        <input
          id="username"
          className={errors.username && 'input-error'}
          type="text"
          placeholder="Enter username"
          {...register('username', {
            required: 'Required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long',
            },
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          className={errors.email && 'input-error'}
          type="text"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Required',
            validate: {
              notAdmin: async (value) =>
                value !== 'admin@example.com' || 'Must not be admin',
            },
          })}
        />
        {errors.email && <p className="error">{errors.email?.message}</p>}

        <label htmlFor="age">Age</label>
        <input
          id="age"
          className={errors.age && 'input-error'}
          type="number"
          placeholder="Enter your age"
          {...register('age', {
            valueAsNumber: true,
          })}
        />
        {errors.age && <p className="error">{errors.age?.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </>
  )
}

export default App
