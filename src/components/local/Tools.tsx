import React from 'react'
import AddNode from './AddNode'
import PreviewTree from "./PreviewTree"

const Tools = () => {
  return (
    <div className='flex absolute right-8 top-20 z-2 gap-2 items-center justify-center'>
        <AddNode />
        <PreviewTree/>
    </div>
  )
}

export default Tools