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
import {setInitialState, registered } from "@/redux/userSlice";
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;

    const sendData={
      treeName:data.treeName,
      password:data.password,
      adminPassword:data.adminPassword,
      owner:data.owner
    }
    const promise=new Promise(async (resolve,reject)=>{
      try{
        const response=await registerUser(sendData);
        const data=response.data.data;
        dispatch(setInitialState(data));
        dispatch(registered(true));

        resolve(data);

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
      error: (err) => err || "Registration failed",
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
                <Label htmlFor="treeName">Tree Name</Label>
                <Input id="treeName" name="treeName" placeholder="Tree Name" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" name="owner" placeholder="Owner of this tree" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Set Password</Label>
                <Input id="password" name="password" type="password" placeholder="Password" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="adminPassword">Set Admin Password</Label>
                <Input id="adminPassword" name="adminPassword" type="password" placeholder="Admin Password" required />
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