import React from 'react'
import SearchTree from './SearchTree'
import Button from './Button'
import { Settings, Settings2, Share2 } from 'lucide-react'

const TitleBar = ({treeName}:{treeName?:string}) => {
  return (
    <div className='absolute top-0 left-0 text-white w-full px-8 py-4 flex items-center justify-between z-2'>
        <div className=''>
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