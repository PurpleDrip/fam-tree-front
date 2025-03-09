import { Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteNode } from "@/api/node";
import { deleteNode as delNode } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const DeleteNode = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false); // Controls Dialog state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id);
    try {
      const res = await deleteNode(id);
      console.log(res);
      dispatch(delNode(id));
      router.refresh();
      setOpen(false); 

    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-red-400 rounded-full cursor-pointer px-4 py-1 flex items-center justify-center text-sm gap-1 hover:bg-red-500">
          <Trash size={12} />
          Delete
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>Click on Confirm to delete the Node.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              className="text-[#ff0000] bg-[#ff000018] hover:bg-[#ff000052] cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-[#00ff00] bg-[#00ff0018] hover:bg-[#00ff0052] cursor-pointer"
            >
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNode;
