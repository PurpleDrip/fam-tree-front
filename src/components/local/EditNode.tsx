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

const EditNode = ({ node }: { node: INode["data"] }) => {
  const [name, setName] = useState(node.name);
  const [relation, setRelation] = useState(node.relation);
  const [dob, setBirthdate] = useState(node.dob);
  const [gender, setGender] = useState(node.gender);
  const [role, setRole] = useState(node.role);
  const [description, setDescription] = useState(node.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedNode = {
        id: node.id,
        name,
        relation,
        dob,
        gender,
        role,
        description,
      };

      console.log(updatedNode);
      
      alert("Node updated successfully!");
    } catch (error) {
      console.error("Error updating node:", error);
      alert("Failed to update node.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
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

              {/* Role Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                className={`bg-[#00ff0028] text-[#00ff00] hover:bg-[#00ff0041] ${
                  loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Edit Node"}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditNode;
