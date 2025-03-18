"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import Drawer from "@/components/local/DrawerBox";
import { loginUser } from "@/api/auth";
import {registered, setInitialState } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import ErrorResponse from "@/types/errorMsg";

export default function Home() {
  const router = useRouter();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSubmitting,setSubmitting]=React.useState(false)

  const dispatch=useDispatch();
  
  interface Data {
    treeName: string;
    password: string;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as unknown as Data;

    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await loginUser(data);
            console.log(res);
            dispatch(setInitialState(res.data.data))
            dispatch(registered(true));
            resolve(res.data.data.type);
            router.push("/");
        } catch (e) {
            console.log(e);
            const err = (e as AxiosError<ErrorResponse>).response?.data?.message || "An error occurred";
            setErrorMsg(err);
            reject(err);
        } finally {
            setSubmitting(false);
        }
    });

    toast.promise(promise, {
        loading: "Loading...",
        success: (type)=> `Loged In as ${type}!` || "Logged In Successfully!",
        error: (err) => err || "Login failed",
      });
      
  };

  return (
    <div className="h-screen flex items-center justify-center dark">
      <Card className="w-[350px] border-[#00ff0060]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#00FF00]">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username" >Fam Tree Name</Label>
                <Input id="username" name="treeName" placeholder="Fam Tree Name" autoComplete="current-username" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password"  />
              </div>
            </div>
            <h1 className="text-center mt-2 text-lg">Or sign in with</h1>
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
            <div className="flex flex-col my-1">
              <Link href="/register" className="text-center text-sm my-2 underline">
                Don&apos;t have an account?
              </Link>
              <Link href="/reset-pass" className="text-center text-sm underline">
                Forgot Password?
              </Link>
              <h1 className="text-center mt-2 text-red-400">{errorMsg}</h1>
            </div>
            <CardFooter className="flex flex-col items-center gap-2 mt-4">
              <Button className="px-12 rounded-xl bg-[#00FF00] " type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <Drawer open={openDialog} onOpenChange={setOpenDialog}/>
    </div>
  );
}