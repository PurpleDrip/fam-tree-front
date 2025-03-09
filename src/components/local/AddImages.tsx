import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddImages = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-4 py-2 bg-[#00ff00] text-[#000000] rounded-full text-sm font-semibold hover:bg-[#00ff00b9]">
            Add Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Images</DialogTitle>
          <DialogDescription>
            Add maximum of 10 Images.
          </DialogDescription>
        </DialogHeader>
        <form>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="images">Pictures</Label>
                <Input id="images" type="file" name="images" multiple  />
            </div>
            <button className='bg-[#00ff0018] text-[#00ff00] px-4 py-2 rounded-full ml-auto flex mt-4 cursor-pointer hover:bg-[#00ff0049]'>Add Images</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddImages