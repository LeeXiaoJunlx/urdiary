import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from './dialog'


export const Navbar = () => {
    return (
        <nav className="fixed top-0 right-0 w-full z-50 border-b-4 border-border bg-bg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">Keluh Kesah</div>
          <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="neutral">Tentang</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Tentang Keluh Kesah</DialogTitle>
                <DialogDescription>
                  Keluh Kesah adalah adalah tempat bagi siapa saja untuk mencurahkan isi hati dan berbagi pengalaman. Platform ini dibuat dengan tujuan untuk mengurangi angka stress di Indonesia. (Anjay)
                </DialogDescription>
                <DialogDescription>
                  Dibuat oleh <Link href="https://ifal.me" className="text-main hover:text-black">Ifal Fahri A</Link>
                </DialogDescription>
            </DialogContent>
          </Dialog>
            <Link href="https://github.com/ifalfahri/keluhkesah"><Button variant="neutral" className="w-10 h-10"><Github /></Button></Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    )
}