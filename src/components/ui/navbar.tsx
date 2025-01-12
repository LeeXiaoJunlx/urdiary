import { Button } from './button'
import { ModeToggle } from '../mode-toggle'
import Link from 'next/link'
import { Github } from 'lucide-react'

export const Navbar = () => {
    return (
        <nav className="fixed top-0 right-0 w-full z-50 border-b-4 border-border bg-bg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">Keluh Kesah</div>
          <div className="flex items-center gap-4">
            <Button variant="neutral">Tentang</Button>
            <Link href="https://github.com/ifalfahri/keluhkesah"><Button variant="neutral" className="w-10 h-10"><Github /></Button></Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    )
}