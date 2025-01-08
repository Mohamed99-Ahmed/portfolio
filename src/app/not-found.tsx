import React from 'react'
import notFound from "../../public/imgs/notFound.png"
import Image from 'next/image'
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'

export default function NotFound() {
  return (
    // design of notfound page navbar + img (not found) + footer
    <div className='h-screen flex flex-col  justify-between '>
        <NavBar/>
        <Image src={notFound} width={600} alt="not found img"  className='self-center'/>
        <Footer/>
    </div>
  )
}
