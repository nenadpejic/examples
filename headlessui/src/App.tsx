import Select from 'components/Select'
import Switch from 'components/Switch'

const countries = [
  { id: '1', name: 'Serbia' },
  { id: '2', name: 'USA' },
]

function App() {
  return (
    <>
      <Switch />

      <Select name="countries" options={countries} />
    </>
  )
}

export default App
