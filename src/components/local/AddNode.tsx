"use client"

import React, { useEffect, useState } from 'react'
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
import axios, { AxiosError } from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const URL=process.env.NEXT_PUBLIC_API_URL;

interface ErrorResponse {
    message: string;
  }
const AddNode = () => {
    const dispatch =useDispatch();

    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const treeName = useSelector((state: {treeName:string}) => state.treeName)
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

    useEffect(()=>{
        if(open){
            setSubmitting(false);
            setErrMsg("");
            setFormData({
                name:"",
                relationship:"",
                description:"",
                images:[]
            });
            setGender("");
            setBirthdate("");
            setRole("");
        }
    },[open])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, images: Array.from(e.target.files) });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const data = new FormData();
    
        data.append("name", formData.name);
        data.append("relation", formData.relationship);
        data.append("gender", gender);
        data.append("description", formData.description);
        data.append("dob", birthdate || "");
        data.append("role", role || "");
        data.append("treeName", treeName);
        const position = { x: 20, y: 20 };
        data.append("position", JSON.stringify(position));
    
        formData.images.forEach(file => data.append("images", file));

        const promise=new Promise(async (resolve,reject)=>{
            try {
                if(!birthdate){
                    setErrMsg("Date Of Birth field is required");
                    reject("Date Of Birth field is required");
                    setSubmitting(false)
                    return;
                }

                const response = await axios.post(`${URL}/node/addnode`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials:true,
                });
                const tree=response.data.data;

                console.log(tree)
    
                resolve(tree);
                setOpen(false); 
            } catch (error) {
                console.error("Error submitting form:", error);
                const err=(error as AxiosError<ErrorResponse>).response?.data?.message || "An error occurred";
                reject(err)
                setErrMsg(err);
                setSubmitting(false)
            }
        })

        toast.promise(promise, {
            loading: "Loading...",
            success: "Added Node Successfully!",
            error: (err) => err || "Adding Node failed",
          });
    };

    return (
        <div className='bg-white cursor-pointer text-black px-4 py-2 font-semibold text-sm rounded-full hover:bg-[#00ff00] focus:bg-[#00ff00]'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='cursor-pointer'>Add Node</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='mb-4 text-3xl text-[#00ff00]'>Create Node</DialogTitle>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="relationship">Relationship</Label>
                                <Input type="text" id="relationship" required name="relationship" placeholder="Relationship" value={formData.relationship} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 min-w-max">
                                <Label htmlFor="birthdate">Date of Birth</Label>
                                <Calender selectedDate={birthdate} uponChange={(date)=>setBirthdate(date || "")} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="gender">Gender</Label>
                                <Select onValueChange={setGender} required>
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
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" required placeholder="Description about the person." value={formData.description} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={setRole} required>
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
                                <Input id="images" type="file" name="images" required multiple onChange={handleFileChange} />
                            </div>
                            <p className='text-center text-red-400'>{errMsg}</p>
                            <Button className='bg-[#00ff0028] text-[#00ff00] hover:bg-[#00ff0041] cursor-pointer' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating Node..." : "Create Node"}
                            </Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNode;
