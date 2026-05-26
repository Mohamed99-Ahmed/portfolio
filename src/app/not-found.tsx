import React from 'react'
import notFound from "../../public/imgs/notFound.png"
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-8 bg-back'>
      <Image src={notFound} width={600} alt="not found img" className='self-center' />
      <Link
        href="/"
        className="px-8 py-3 bg-scolor text-back font-bold rounded-lg hover:bg-scolor/80 transition-all text-xl"
      >
        Go Home
      </Link>
    </div>
  )
}
