"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '../ui/input'
import { createTree } from '@/api/tree'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { addTree } from '@/redux/userSlice'
import { ITree } from '@/types/tree'

interface CreateTreeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ErrorResponse {
  message: string;
}

const CreateTree =({ open, onOpenChange }: CreateTreeProps) => {
    const dispatch=useDispatch();
    const [treeName, setTreeName] = useState("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
          console.log(treeName)
          const res=await createTree(treeName as string);
          const tree=res.data?.tree as ITree | null;
          dispatch(addTree(tree))
          onOpenChange(false);
        }catch(e){
          const error=(e as AxiosError<ErrorResponse>).response?.data?.message;
          setError(error || "")
          console.log(error);
        }
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Name your FamTree.</DialogTitle>
          <DialogDescription>
            Using this name, people can find ur FamTree from across the globe.
          </DialogDescription>
          <DialogDescription>
            (Hint - Use your Family Name.)
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Input value={treeName} onChange={(e)=>setTreeName(e.target.value)}/>
            {error && <p className='text-center text-red-400'>{error}</p>}
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button className="bg-[#00FF00] text-black hover:bg-[#00CC00]" type="submit">Create Tree</Button>
            </div>
          </form>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

export default CreateTree