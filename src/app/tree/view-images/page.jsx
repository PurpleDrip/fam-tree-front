"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import { ChevronLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { changeMainImg, getImagesForID } from "@/api/node";
import AddImages from "@/components/local/AddImages";
import { Button } from "@/components/ui/button";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const [isOpen, setIsOpen] = useState(false)

  const [nodeId, setNodeId] = useState("");
  const [mode, setMode] = useState("");
  const [error, setError] = useState("");
  const [node, setNode] = useState(null);
  const [mainImg, setMainImg] = useState("");

  // Fetch search parameters
  useEffect(() => {
    const nodeIdParam = searchParams.get("nodeId");
    const modeParam = searchParams.get("mode");

    if (nodeIdParam) setNodeId(nodeIdParam);
    if (modeParam) setMode(modeParam);
  }, [searchParams]);

  // Fetch images for the given node ID
  useEffect(() => {
    if (!nodeId) return;

    getImagesForID(nodeId)
      .then((res) => {
        setMainImg(res.data.mainImg);
        setNode(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch images.");
      });
  }, [nodeId]);

  const handleSubmit = async (imgUrl) => {
    console.log(imgUrl);
    try {
      await changeMainImg(imgUrl, nodeId);
      setNode((prev) => ({ ...prev, data: { ...prev.data, mainImg: imgUrl } }));
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-black">
      {node ? (
        <>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-12">
            {node.map((img) => (
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
                    <div className="flex absolute bottom-4 items-center justify-between w-full px-4" key={img._id * 10}>
                      <button className="bg-red-400 p-2 rounded-full shadow-2xl cursor-pointer hover:bg-red-500">
                        <Trash size={16} />
                      </button>
                      <button 
                        className="bg-[#00ff00] shadow-2xl px-4 py-1 rounded-full text-sm text-black font-semibold cursor-pointer hover:bg-[#7cd67c]"
                        onClick={() => handleSubmit(img)}>
                        Set As DP
                      </button>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-[50vh] flex text-center">{error || "No images found for this ID."}</p>
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
          {mode === "edit" && <AddImages nodeId={nodeId} open={isOpen} setIsOpen={setIsOpen} />}
          {mode==="edit" && <Button 
            className="bg-[#00ff00] cursor-pointer hover:bg-[#00ff00]"
            onClick={() => setIsOpen(true)}>Add Images</Button>}
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
