"use client"

import React, { useEffect, useState } from 'react'
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
import { addTree, createdTree } from '@/redux/userSlice'
import { ITree } from '@/types/tree'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface CreateTreeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ErrorResponse {
  message: string;
}

const CreateTree =({ open, onOpenChange }: CreateTreeProps) => {
    const router=useRouter();
    const dispatch=useDispatch();
    const [treeName, setTreeName] = useState("");
    const [error, setError] = useState<string>("");
    const [isSubmitting,setSubmitting]=React.useState(false);

    useEffect(() => {
      if (open) {
        setTreeName("");
        setError("");
        setSubmitting(false);
      }
    }, [open]); 
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitting(true)

        const promise=new Promise(async (resolve,reject)=>{
          try{
            console.log(treeName)
            const res=await createTree(treeName as string);
            const tree=res.data?.tree as ITree | null;
            dispatch(addTree(tree))
            dispatch(createdTree(treeName))
            onOpenChange(false);

            resolve(tree);

            router.push("/tree");
          }catch(e){
            const error=(e as AxiosError<ErrorResponse>).response?.data?.message;
            console.log(error);
            reject(error)
            setError(error || "")
          }finally{
            setSubmitting(false);
          }
        })

        toast.promise(promise, {
          loading: "Loading...",
          success: "Tree Created Successful!",
          error: (err) => err || "Tree Creation failed",
        });
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
                <Button variant="outline" onClick={() => {
                  setTreeName(""); 
                  setError(""); 
                  setSubmitting(false);
                  onOpenChange(false)
                }}>Cancel</Button>
                <Button className="bg-[#00FF00] text-black hover:bg-[#00CC00]" type="submit">
                  {isSubmitting ? "Creating Tree..." : "Create Tree"}
                </Button>
            </div>
          </form>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

export default CreateTree