import { Meta, StoryObj } from '@storybook/react'
import TextField from './TextField'

const meta = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'TextField component',
      },
    },
  },
  argTypes: {
    // label: {
    //   description: 'Label text',
    // },
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
