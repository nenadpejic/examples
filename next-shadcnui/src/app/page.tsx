import ScnDrawer from '@/components/ScnDrawer'
import MyDrawer from '@/components/my-drawer'
import { ModeToggle } from '@/components/ui/ModeToggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main>
      <div className="container h-[1000px]">
        {/* <ModeToggle /> */}

        {/* <Button variant="default">Click me</Button> */}

        <ScnDrawer />

        <MyDrawer />
      </div>
    </main>
  )
}
