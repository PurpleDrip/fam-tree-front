"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { addTree, registered } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function Home() {
  const router = useRouter();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const dispatch=useDispatch();
  
  interface Data {
    username: string;
    password: string;
  }

  interface ErrorResponse {
    message: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as unknown as Data;
    try {
      const res = await loginUser(data);
      console.log(res)
      const tree=res?.data?.data;
      dispatch(addTree(tree));
      dispatch(registered(true));
      router.push("/")
    } catch (e) {
      console.log(e)
      const err = (e as AxiosError<ErrorResponse>).response?.data?.message || "An error occurred";
      setErrorMsg(err);
    }
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
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Username" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Password" required />
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
              <Button className="px-12 rounded-xl bg-[#00FF00] " type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <Drawer open={openDialog} onOpenChange={setOpenDialog}/>
    </div>
  );
}
