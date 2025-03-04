import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const SearchTree = () => {
  return (
    <form className="border p-1 rounded-full flex gap-1 bg-black">
        <Input className="rounded-full border-0 outline-0" placeholder="Search a FamTree" />
        <button type="submit" className="flex items-center justify-center text-sm px-2">
        <Search />
        </button>
    </form>
  )
}

export default SearchTree