"use client";

import CreateTree from '@/components/local/CreateTree';
import Btn from '@/components/local/Button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addTree, logout as logoutAction, registered } from "@/redux/userSlice";
import { checkForCookies, logoutUser } from '@/api/auth';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const isRegistered = useSelector((state: { isRegistered: boolean }) => state.isRegistered);
  const treeName=useSelector((state:{treeName:string})=>state.treeName)

  const createTreeHandler = () => {
    if (isRegistered) {
      setOpenDialog(prev => !prev);
    } else {
      router.push("/register"); 
    }
  };

  const handleLogout = async () => {
    dispatch(logoutAction());
    await logoutUser();
    router.push("/login"); 
  };

  return (
    <div className="h-screen p-8">
      <section className="text-4xl flex items-center justify-between">
        <div className="text-[#00FF00]">FamTree</div>
        <div>
          <form className="border p-1 rounded-full flex gap-1">
            <Input className="rounded-full border-0 outline-0" placeholder="Search a FamTree" />
            <button type="submit" className="flex items-center justify-center text-sm px-2">
              <Search />
            </button>
          </form>
        </div>
        <div className="flex gap-4 items-center justify-center">
          {isRegistered ? (
            <>
              <Btn onClick={() => router.push("/about-us")}>About Us</Btn>
              {treeName? 
              <>
                <Btn onClick={() => router.push(`/tree/${treeName}`)}>View Tree</Btn>
              </> : 
              <>
                <Btn onClick={createTreeHandler}>Create Tree</Btn>
              </>}
              <button
                onClick={handleLogout}
                className="cursor-pointer text-sm px-4 py-2 rounded-full text-[#FF0000] bg-[#ff000018] border border-[#ff000018] hover:border-[#ff0000]"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Btn onClick={() => router.push("/login")}>Sign In</Btn>
              <Btn onClick={() => router.push("/register")}>Register</Btn>
            </>
          )}
        </div>
      </section>
      <section className="h-[80vh] m-12 flex items-center justify-between">
        <div className="w-1/2 flex flex-col gap-4 items-center">
          <h1 className="text-5xl font-semibold">
            Welcome to Fam Tree – Where Your Family's Story Comes to Life
          </h1>
          <p className="text-gray-300">
            Preserve your family's legacy in a beautiful, interactive family tree. Add photos, stories, and
            connections to create a living digital archive that can be shared with generations to come.
          </p>
          <p className="text-gray-300">
            Easily add family members, upload cherished photos, and watch your family's history unfold in an
            elegant, visual format. Whether you're documenting your immediate family or tracing your ancestry back
            through generations, Fam Tree gives you the tools to capture and celebrate your unique family story.
          </p>
          <h2 className="text-[#00FF00] text-3xl text-center font-thin mt-16">
            Start building your family tree today and create a lasting gift for your loved ones.
          </h2>
          {treeName ? (
            <Button className="mt-2" onClick={() => router.push(`/tree/${treeName}`)}>
              View Tree
            </Button>
          ) : (
            <Button className="mt-2" onClick={createTreeHandler}>
              Create Tree
            </Button>
          )}
        </div>
        <div className="border">
          <Image src="/Images/hero_image1.jpeg" width="450" height="100" alt="Image of a family" />
        </div>
      </section>
      <CreateTree open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

export default Page;
