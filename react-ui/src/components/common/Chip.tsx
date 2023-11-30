import Paragraph from './Paragraph'
import IconButton from './inputs/IconButton'

type Props = {
  label: string
  onDelete?: () => void
}

const Chip = ({ label, onDelete }: Props) => {
  return (
    <div className="rounded-full py-1 items-center bg-gray-300 inline-flex">
      <Paragraph className="px-3" variant="md">
        {label}
      </Paragraph>
      <IconButton
        name="remove"
        className="rounded-full bg-gray-100 mr-1"
        onClick={onDelete}
      />
    </div>
  )
}

export default Chip
