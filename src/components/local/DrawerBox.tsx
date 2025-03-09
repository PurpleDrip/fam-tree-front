import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"

  interface CreateTreeProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export default function DrawerBox({ open, onOpenChange }: CreateTreeProps){
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="w-[50vw] mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-2xl text-center">This action is currently in Development Phase.</DrawerTitle>
            <DrawerDescription className="text-center text-white">It will be ready by next patch update.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose className="cursor-pointer pt-1 pb-2 px-4 rounded-full bg-[#ff000018] text-[#ff0000] max-w-min mx-auto mb-4 hover:bg-[#ff000021]">
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  } 