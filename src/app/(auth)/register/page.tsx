"use client"

import * as React from "react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import  Calendar  from "@/components/local/Calender";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import DrawerBox from "@/components/local/DrawerBox";
import { registerUser } from "@/api/auth";
import { AxiosError } from "axios";
import { useDispatch} from "react-redux";
import { addTree, registered } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ErrorResponse {
  message: string;
}

export default function Register() {
  const dispatch=useDispatch();
  const router=useRouter();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [isSubmitting,setSubmitting]=React.useState(false)

  const [gender, setGender] = React.useState("");
  const [birthdate, setBirthdate] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;
    if (gender) data.gender = gender;
    if (birthdate) data.birthdate = birthdate;

    const sendData={
      username:data.username,
      password:data.password,
      treeId:data.code,
      gender:data.gender,
      dob:data.birthdate,
      mode:"default"
    }
    const promise=new Promise(async (resolve,reject)=>{
      try{
        const response=await registerUser(sendData);
        const tree=response.data.data;
        console.log(tree);
        dispatch(addTree(tree));
        dispatch(registered(true));

        resolve(tree);

        router.push("/")
      }catch(e){
        const error=(e as AxiosError<ErrorResponse>).response?.data?.message;
        console.log(error);

        reject(error);

        setErrorMsg(error || "An error occurred");
      }finally{
        setSubmitting(false)
      }
    })

    toast.promise(promise, {
      loading: "Loading...",
      success: "Registration Successful!",
      error: (err) => err || "Login failed",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px] border-[#00ff0060]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#00FF00]">Register</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Username" required />
              </div>
              <div className="flex flex-col space-y-1.5 min-w-max">
                <Label htmlFor="birthdate">Date Of Birth</Label>
                <Calendar 
                  selectedDate={birthdate} 
                  uponChange={(date) => setBirthdate(date || '')} 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      <SelectLabel>Genders</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Password" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Fam Tree ID</Label>
                <Input id="code" name="code" placeholder="Fam Tree ID (optional)." />
              </div>
            </div>
            <div>
                <h1 className="text-center mt-2 text-lg">Or Register with</h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center justify-center gap-1 bg-[#ffffff18] pb-2 pt-1 px-4 rounded-3xl cursor-pointer hover:bg-[#ffffff81]" onClick={()=>setOpenDialog(prev=>!prev)}>
                        <RiFacebookCircleFill color="#1877F2" size="20"/>
                        Facebook
                    </div>
                    <div className="flex items-center justify-center gap-1 bg-[#ffffff18] pb-2 pt-1 px-4 rounded-3xl cursor-pointer hover:bg-[#ffffff81]" onClick={()=>setOpenDialog(prev=>!prev)}>
                        <FcGoogle/>
                        Google
                    </div>
                </div>
            </div>
            <Link href="/login" className="text-center text-sm my-3 underline">
              Already have an account?
            </Link>
            <h1 className="text-center mb-2 text-red-400">{errorMsg}</h1>
            <CardFooter className="flex justify-center">
              <Button type="submit" className="px-12 rounded-xl bg-[#00FF00]" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <DrawerBox open={openDialog} onOpenChange={setOpenDialog}/>
    </div>
  );
}