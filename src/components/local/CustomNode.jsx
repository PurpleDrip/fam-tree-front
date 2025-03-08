import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Mars, Pencil, Trash, Venus } from "lucide-react";

import EditNode from "./EditNode";


const NodeComponent = ({ 
  id, 
  data,
  mode="normal"
}) => {
    const words = data["description"].split(" ");
    let formattedText = [];
  
    for (let i = 0; i < words.length; i += 5) {
      formattedText.push(words.slice(i, i + 5).join(" "));
    }

  return (
    <div 
      className="relative p-3 rounded-lg text-white min-w-max transition-transform duration-200 bg-[#2c5340] shadow-2xl"
      key={id}
    >
      <div className="flex items-start justify-center gap-8">
        <div>
          <img 
            src={data.mainImg} 
            alt={data.name} 
            className="w-40 h-40 object-cover rounded-full mb-2" 
          />
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-start gap-2">
            <h3 className="font-bold text-left text-xl">{data?.name}</h3>
            <div className="text-white">
              {
                data.gender==="male"? <Mars size={16}/> :  <Venus size={16}/>
              }
            </div>
          </div>
          <p className="text-sm mb-2">{data?.relation}</p>
          <p className="whitespace-pre-wrap text-xs text-gray-300 text-left">
            {formattedText.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <h1 className="text-center text-sm mt-2">22 Oct 2004</h1>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-2">
        <a href={`/tree/view-images/?nodeId=${id}`} className="text-xs px-4 py-2 bg-[#00ff0018] text-[#00ff00] rounded-full cursor-pointer hover:bg-[#00ff0052]">View Photos</a>
        {mode!=="view" && <button className="text-xs px-4 py-2 bg-[#00ff0018] text-[#00ff00] rounded-full cursor-pointer hover:bg-[#00ff0052]">Add Photos</button>}
        {mode!=="view" && <a href={`/tree/view-images/?nodeId=${id}&mode=edit`} className="text-xs px-4 py-2 bg-[#00ff0018] text-[#00ff00] rounded-full cursor-pointer hover:bg-[#00ff0052]">Change DP</a>}
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <EditNode node={data}/>
        <div className="bg-red-400 rounded-full cursor-pointer px-4 py-1 flex items-center justify-center text-sm gap-1 hover:bg-red-500"><Trash size={12}/>Delete</div>
      </div>

      {mode!=="view" && <p className="text-center px-2 py-1 bg-[#00ff00] text-black font-semibold rounded-full text-xs max-w-min absolute top-2 right-2">{data.role}</p>}
      {/* Handles */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full" 
      />
      <Handle 
        type="target" 
        position={Position.Top} 
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full" 
      />
    </div>
  );
};

export default NodeComponent;
