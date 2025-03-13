"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Calender from './Calender'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addTree } from '@/redux/userSlice'
import { formatNodes } from '@/lib/formatNode'


const AddNode = () => {
    const dispatch =useDispatch();

    const treeId = useSelector((state: {treeId:string}) => state.treeId)
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState<string| null>(null);
    const [role, setRole] = useState<string | undefined>("");
    const [formData, setFormData] = useState({
        name: "",
        relationship: "",
        description: "",
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, images: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
    
        // Append text fields
        data.append("name", formData.name);
        data.append("relation", formData.relationship);
        data.append("gender", gender);
        data.append("description", formData.description);
        data.append("dob", birthdate || "");
        data.append("role", role || "");
        data.append("treeId", treeId);
        const position = { x: 20, y: 20 };
        data.append("position", JSON.stringify(position));
    
        // Append images properly
        formData.images.forEach(file => data.append("images", file));
    
        try {
            const response = await axios.post("https://api.famtree.in/api/node/addnode", data, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials:true,
            });
            const tree=response.data.data;
            console.log("Response:", tree);
            const formatedNodes=formatNodes(tree.nodes);

            console.log(formatedNodes)

            dispatch(addTree({nodes:formatedNodes,treeName:tree.treeName,edges:tree.edges}))
            alert("Node added successfully!");
            setOpen(false); 
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error adding node.");
            setOpen(false); 
        }
    };

    return (
        <div className=' bg-[#00ff00] cursor-pointer text-black px-2 py-1 font-semibold text-sm rounded-full hover:bg-[#00ff008e]'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='cursor-pointer'>Add Node</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='mb-4 text-3xl text-[#00ff00]'>Create Node</DialogTitle>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="relationship">Relationship</Label>
                                <Input type="text" id="relationship" name="relationship" placeholder="Relationship" value={formData.relationship} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="gender">Gender</Label>
                                <Select onValueChange={setGender}>
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
                            <div className="flex flex-col space-y-1.5 min-w-max">
                                <Label htmlFor="birthdate">Birthdate</Label>
                                <Calender selectedDate={birthdate} uponChange={(date)=>setBirthdate(date || "")} />
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" placeholder="Description about the person." value={formData.description} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={setRole}>
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
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="images">Pictures</Label>
                                <Input id="images" type="file" name="images" multiple onChange={handleFileChange} />
                            </div>
                            <Button className='bg-[#00ff0028] text-[#00ff00] hover:bg-[#00ff0041] cursor-pointer' type="submit">
                                Create Node
                            </Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNode;
