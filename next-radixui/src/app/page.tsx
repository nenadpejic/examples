import ThemeSwitch from '@/components/ThemeSwitch'
import { Button, Text } from '@radix-ui/themes'

export default function Home() {
  return (
    <main>
      <ThemeSwitch />

      <Text>Example text</Text>
      <Button color="brown">Click me</Button>
    </main>
  )
}
