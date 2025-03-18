"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import { ChevronLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { changeMainImg, deleteImage, getImagesForID } from "@/api/node";
import AddImages from "@/components/local/AddImages";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import INode from "@/types/node";
import ErrorResponse from "@/types/errorMsg";
import { Skeleton } from "@/components/ui/skeleton"



const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const changes=useSelector((state:{value:number})=>state.value)

  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const [mode, setMode] = useState("");
  const [node, setNode] = useState<INode | null>(null);
  const [mainImg, setMainImg] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const nodeIdParam = searchParams.get("nodeId");
    const modeParam = searchParams.get("mode");

    if (nodeIdParam) setNodeId(nodeIdParam);
    if (modeParam) setMode(modeParam);
  }, [searchParams]);


  useEffect(() => {
  if (!nodeId) return; 

    getImagesForID(nodeId)
    .then((res) => {
      console.log("res",res)
      const node=res.data.data;
      setNode(node)
      setMainImg(res.data.data.data.mainImg)
    })
    .catch((err) => {
      console.log(err);
    });
  
  }, [nodeId,changes]); 

  const handleSubmit = async (imgUrl: string) => {
    if (!nodeId) return;
    setSubmitting(true)
    
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await changeMainImg(imgUrl, nodeId);
        console.log(res)
        const node = res.data.data;
        setMainImg(imgUrl);
        resolve(node);
      } catch (err) {
        const error = (err as AxiosError<ErrorResponse>).response?.data?.message;
        console.log(err);
        reject(error);
      }finally{
        setSubmitting(false)
      }
    });

    toast.promise(promise, {
      loading: "Updating Main Img",
      success: "Changed Main Image Successfully!",
      error: (err) => err || "Changing Main Image failed",
    });
  };

  const handleDelete = async (imgId: string, nodeId: string) => {
    setSubmitting(true)
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await deleteImage(imgId, nodeId);
        const tree = res.data.data;
        if (node) {
          const updatedImages = node.data.images.filter(img => img._id !== imgId);
          setNode({
            ...node,
            data: {
              ...node.data,
              images: updatedImages
            }
          });
        }
        
        resolve(tree);
      } catch (err) {
        const error = (err as AxiosError<ErrorResponse>).response?.data?.message;
        console.log(err);
        reject(error);
      }finally{
        setSubmitting(false)
      }
    });
    
    toast.promise(promise, {
      loading: "Deleting Image",
      success: "Deleted Image Successfully!",
      error: (err) => err || "Deleting Image failed",
    });
  };

  return (
    <div className="p-6 min-h-screen bg-black">
      {node ? (
        <>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-12">
            {node.data.images && node.data.images.length > 0 ? (
              node.data.images.map((img) => (
                <div className="relative" key={img._id}>
                  <img
                    src={img.url}
                    alt=""
                    className="w-full rounded-lg shadow-lg border-2 border-[#00ff0050] p-2"
                  />
                  {mode === "edit" && (
                    img.url === mainImg ? (
                      <button className="absolute bottom-4 right-3 bg-[#00ff00] px-4 py-1 rounded-full text-sm text-black font-semibold cursor-not-allowed">
                        Current DP
                      </button>
                    ) : (
                      <div className="flex absolute bottom-4 items-center justify-between w-full px-4">
                        <button className="bg-red-400 p-2 rounded-full shadow-2xl cursor-pointer hover:bg-red-500" disabled={isSubmitting}
                          onClick={() => handleDelete(img._id, nodeId)}>
                          <Trash size={16} />
                        </button>
                        <button 
                          className="bg-[#00ff00] shadow-2xl px-4 py-1 rounded-full text-sm text-black font-semibold cursor-pointer hover:bg-[#7cd67c]"
                          disabled={isSubmitting}
                          onClick={() => handleSubmit(img.url)}>
                          Set As DP
                        </button>
                      </div>
                    )
                  )}
                </div>
              ))
            ) : (
              <p className="text-white">No images available. Add some images!</p>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-4 gap-8 mt-16 px-4">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-[25rem] w-[20vw]  rounded-xl" />
          ))}
        </div>
      )}

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 w-full">
        <div className="flex items-center justify-between px-8 py-4 bg-[#000000e5]">
          {/* Back Button */}
          <div
            className="bg-[#00ff00] rounded-full text-black cursor-pointer hover:bg-[#00ff00a1]"
            onClick={() => router.back()}
          >
            <ChevronLeft size={40} />
          </div>
          {mode === "edit" && (
            <AddImages 
              nodeId={nodeId} 
              open={isOpen} 
              setIsOpen={setIsOpen} 
            />
          )}
          {mode === "edit" && (
            <Button 
              className="bg-[#00ff00] cursor-pointer hover:bg-[#00ff00]"
              onClick={() => setIsOpen(true)}>
              Add Images
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;