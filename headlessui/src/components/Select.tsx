type Props = {
  name: string
  options: { id: string; name: string }[]
}

const Select = ({ name, options }: Props) => {
  return (
    <label className="block w-[400px] h-[100px] bg-slate-400" htmlFor={name}>
      <select name={name} id={name} defaultValue="">
        <option value="" disabled>
          --Please choose an option--
        </option>
        {options.map((c) => {
          return (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          )
        })}
      </select>
    </label>
  )
}

export default Select
