"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";

const Page = () => {
  const [nodeId, setNodeId] = useState("");
  const [mode, setMode] = useState("")
  const searchParams = useSearchParams(); 

  useEffect(() => {
    const nodeIdParam = searchParams.get("nodeId");
    const mode=searchParams.get("mode");
    if (nodeIdParam) {
      setNodeId(nodeIdParam);
    }
    if(mode){
      setMode(mode);
    }
  }, [searchParams]);

  const nodes = useSelector((state) => state.nodes);

  const node = nodes.find((node) => node.id === nodeId);

  return (
    <div className="p-6 min-h-screen bg-black">
      {node ? (
        <>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-12">
            {node.data?.images?.map((img, index) => (
              <div className="relative" key={index}>
              <img
                src={img}
                alt=""
                className="w-full rounded-lg shadow-lg border-2 border-[#00ff0050] p-2"
              />
              {mode==="edit" && <button className="absolute bottom-4 right-3 bg-[#00ff00] px-4 py-1 rounded-full text-sm text-black font-semibold cursor-pointer hover:bg-[#477047]">Set As DP</button>}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No node found for this ID.</p>
      )}
      <div className="fixed top-0 left-0 w-full">
        <div className="flex items-center justify-between px-8 py-4 bg-[#000000e5]">
          <div className='bg-[#00ff00] rounded-full text-black cursor-pointer hover:bg-[#00ff00a1]'><ChevronLeft size={40}/></div>
          <button className="px-4 py-2 bg-[#00ff00] text-[#000000] rounded-full text-sm font-semibold hover:bg-[#00ff00b9]">Add Image</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
