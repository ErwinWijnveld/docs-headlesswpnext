import vercelImg from '@/images/vercel.png'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const HomeNew = () => {
  return (
    <div className="relative -mt-20 h-[500px] bg-black">
      <div
        className="absolute top-0 left-0 right-0 h-screen max-h-[650px]"
        data-aos="fade-in"
        data-aos-delay="400"
        data-aos-duration="2000"
      >
        <Image
          src={vercelImg}
          alt="Vercel Logo"
          layout="fill"
          className=" object-contain"
        />
      </div>
      <div
        data-aos="fade-in"
        className="relative z-10 flex h-full flex-col items-center justify-center py-24 px-4 text-center text-white mix-blend-difference"
      >
        <h1 className="ease-out-expo translate-y-20 text-[7vw] font-bold transition-all duration-[1300ms] hover:scale-110 hover:cursor-pointer">
          HeadlessWpNext
        </h1>
      </div>
    </div>
  )
}
export default HomeNew
