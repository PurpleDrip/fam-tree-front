"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SearchTree = () => {

  const router=useRouter();
  const [treeName, setTreeName] = useState("")

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/tree/view/${treeName}`);
    setTreeName("");

  }
  return (
    <form className="border p-1 rounded-full flex gap-1 bg-[#1d1a1a]" onSubmit={submitHandler}>
        <Input className="rounded-full border-0 outline-0" placeholder="Search a FamTree" onChange={(e)=>setTreeName(e.target.value)}/>
        <button type="submit" className="flex items-center justify-center text-sm px-2 cursor-pointer">
          <Search />
        </button>
    </form>
  )
}

export default SearchTree