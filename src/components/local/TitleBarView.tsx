import React from 'react'
import SearchTree from './SearchTree'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'; 
import Share from './Share'


const TitleBar = ({treeName}:{treeName:string}) => {
    const router = useRouter();
  return (
    <div className='absolute top-0 left-0 text-white w-full px-8 py-4 flex items-center justify-between z-2'>
        <div className='text-3xl font-bold flex items-center justify-center gap-8'>
            <div className='bg-[#00ff00] rounded-full text-black cursor-pointer hover:bg-[#00ff00a1]' onClick={()=>router.push("/")}><ChevronLeft size={40}/></div>
            {treeName}
        </div>
        <div>
            <SearchTree/>
        </div>
        <Share treeName={treeName} />
    </div>
  )
}

export default TitleBar