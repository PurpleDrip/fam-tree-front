import { Clipboard, Share2 } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from 'sonner'
import { FaWhatsapp } from "react-icons/fa";

const Share = ({treeName}:{treeName:string}) => {
    const link=`https://famtree.in/tree/view/${treeName}`

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Copied to Clipboard!")
        } catch (err) {
            toast.error("Error Copying Link.")
        }
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;
        window.open(whatsappUrl, "_blank");
    };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='bg-[#00ff00] text-xl p-2 rounded-full cursor-pointer' >
            <Share2 size={20} color='black'/>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-max mr-4 mt-2">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share this FamTree</h4>
            <p className="text-sm text-muted-foreground">
              Anyone can access this link.
            </p>
          </div>
            <div className='border rounded-sm border-gray-700 w-full flex items-center justify-between p-2 px-4 text-sm gap-4'>
                <code className='w-[18rem] text-ellipsis overflow-hidden whitespace-nowrap'>https://famtree.in/tree/view/{treeName}</code>
            </div>
            <div className='flex items-center justify-center gap-8'>
                <FaWhatsapp size={36} className='cursor-pointer p-1 rounded-full bg-gray-900 text-white' onClick={shareOnWhatsApp}/>
                <Clipboard size={32} className='cursor-pointer p-1 rounded-full bg-gray-900 text-white' onClick={copyToClipboard}/>
            </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Share