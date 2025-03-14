"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

interface ErrorResponse {
  message: string;
}

const AddImages = ({ nodeId, open, setIsOpen }: { nodeId: string; open: boolean; setIsOpen: (val: boolean) => void }) => {
  const router = useRouter();

  const treeName = useSelector((state: {treeName:string}) => state.treeName)
  const [images, setImages] = useState<FileList | null>(null)
  const [errMsg, setErrMsg] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
  
    if (!images) {
      setSubmitting(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("nodeId", nodeId);
    formData.append("treeName", treeName);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/node/addimagestoid`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
  
        resolve(response.data.tree);
        setIsOpen(false);
        router.refresh();
      } catch (error) {
        console.error('Error uploading images:', error);
        const err = (error as AxiosError<ErrorResponse>).response?.data.message;
        reject(err);
        setErrMsg(err || "Adding Image failed");
      } finally {
        setSubmitting(false);
      }
    });
  
    toast.promise(promise, {
      loading: "Uploading...",
      success: "Added Image Successfully!",
      error: (err) => err || "Adding Image failed",
    });
  };
  

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Images</DialogTitle>
          <DialogDescription>Add up to 10 images.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="images">Pictures</Label>
            <Input id="images" required type="file" name="images" multiple onChange={(e) => setImages(e.target.files)} />
          </div>
          <p className='text-center text-red-400'>{errMsg}</p>
          <button className='bg-[#00ff0018] text-[#00ff00] px-4 py-2 rounded-full ml-auto flex mt-4 cursor-pointer hover:bg-[#00ff0049]' disabled={isSubmitting}>
            {isSubmitting ? "Adding Images..." : "Add Images"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddImages;
