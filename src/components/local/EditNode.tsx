"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Calender from "./Calender";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import INode from "@/types/node";
import { editNode } from "@/api/node";
import { AxiosError } from "axios";
import ErrorResponse from "@/types/errorMsg";
import { useDispatch } from "react-redux";
import { madeChanges } from "@/redux/userSlice";
import { toast } from "sonner";

const EditNode = ({ node,nodeId }: { node: INode["data"],nodeId:string }) => {
  const dispatch=useDispatch();

  const [open, setOpen] = useState(false); 
  const [isSubmitting, setSubmitting] = useState(false)

  const [name, setName] = useState(node.name);
  const [relation, setRelation] = useState(node.relation);
  const [dob, setBirthdate] = useState(node.dob);
  const [gender, setGender] = useState(node.gender);
  const [description, setDescription] = useState(node.description);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const promise=new Promise(async (resolve,reject)=>{
      try{
        const res=await editNode(nodeId,name,relation,gender,dob,description);
        console.log(res.data.data);

        resolve(res)
        dispatch(madeChanges());
        setOpen(false)
        }catch(err){
          const error=(err as AxiosError<ErrorResponse>).response?.data.message;
          console.log(error)
          reject(error)
        }finally{
          setSubmitting(false);
        }
      })
      
      toast.promise(promise, {
        loading: "Updating...",
        success: "Updated Node Successfully!",
        error: (err) => err || "Updating Node failed",
      });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-green-500 rounded-full px-4 py-1 cursor-pointer flex items-center justify-center text-sm gap-1 hover:bg-[#65b965]">
          <Pencil size={12} />
          Edit
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4 text-3xl text-[#00ff00]">
              Edit Node
            </DialogTitle>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* Name Input */}
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Relationship Input */}
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  type="text"
                  id="relationship"
                  name="relationship"
                  placeholder="Relationship"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                />
              </div>

              {/* Gender Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Genders</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Birthdate Selection */}
              <div className="flex flex-col space-y-1.5 min-w-max">
                <Label htmlFor="birthdate">Birthdate</Label>
                <Calender 
                  selectedDate={dob} 
                  uponChange={(date) => setBirthdate(date || '')} 
                />
              </div>

              {/* Description Input */}
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description about the person."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                className={`bg-[#00ff0028] text-[#00ff00] hover:bg-[#00ff0041] ${
                  isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Edit Node"}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditNode;
