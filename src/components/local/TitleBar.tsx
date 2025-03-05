import React from 'react'
import SearchTree from './SearchTree'
import { ChevronLeft, Settings,  Share2 } from 'lucide-react'

const TitleBar = ({treeName}:{treeName?:string}) => {
  return (
    <div className='absolute top-0 left-0 text-white w-full px-8 py-4 flex items-center justify-between z-2'>
        <div className='text-3xl font-bold flex items-center justify-center gap-8'>
            <div className='bg-[#00ff00] rounded-full text-black cursor-pointer hover:bg-[#00ff00a1]'><ChevronLeft size={40}/></div>
            {treeName}
        </div>
        <div>
            <SearchTree/>
        </div>
        <div className='flex items-center justify-center gap-4'>
            <div className='bg-[#00ff00] text-xl p-2 rounded-full cursor-pointer' >
                <Share2 size={20} color='black'/>
            </div>
            <div className='bg-[#00ff00] text-xl p-2 rounded-full cursor-pointer' >
                <Settings size={20} color='black'/>
            </div>
        </div>
    </div>
  )
}

export default TitleBar