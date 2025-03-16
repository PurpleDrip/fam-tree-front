"use client";

import NodeComponent from "@/components/local/CustomNode";
import TitleBar from "@/components/local/TitleBar";
import { useSelector, useDispatch } from "react-redux";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState, useRef } from "react";
import { updateNodes, updateEdges } from "@/redux/userSlice";
import {updateTree} from "@/api/tree"
import Tools from "@/components/local/Tools"
import { toast } from "sonner";

function Flow() {
  const dispatch = useDispatch();

  const [isSubmitting, setSubmitting] = useState(false);
  
  // ✅ Fetch nodes and edges from Redux store
  const reduxNodes = useSelector((state) => state.nodes) || [];
  const reduxEdges = useSelector((state) => state.edges) || [];
  const treeName = useSelector((state) => state.treeName) || "";

  // ✅ Initialize local state
  const [nodes, setNodes] = useState(reduxNodes);
  const [edges, setEdges] = useState(reduxEdges);
  const [changes, setChanges] = useState(false); // Track unsaved changes
  
  // Keep track of original data for comparison
  const originalNodesRef = useRef(JSON.stringify(reduxNodes));
  const originalEdgesRef = useRef(JSON.stringify(reduxEdges));
  
  // Track if user has interacted
  const userHasInteracted = useRef(false);

  // ✅ Sync local state with Redux store when store updates
  useEffect(() => {
    setNodes(reduxNodes);
    setEdges(reduxEdges);
    
    // Store original data for comparison
    if (!userHasInteracted.current) {
      originalNodesRef.current = JSON.stringify(reduxNodes);
      originalEdgesRef.current = JSON.stringify(reduxEdges);
    }
  }, [reduxNodes, reduxEdges]);

  // Check for actual changes compared to original data
  const checkForChanges = useCallback(() => {
    const currentNodes = JSON.stringify(nodes);
    const currentEdges = JSON.stringify(edges);
    
    // Only set changes flag if there's an actual difference from original data
    const hasChanges = currentNodes !== originalNodesRef.current || 
                       currentEdges !== originalEdgesRef.current;
    
    setChanges(hasChanges && userHasInteracted.current);
  }, [nodes, edges]);

  // ✅ Handle node changes
  const onNodesChange = useCallback((changes) => {
    userHasInteracted.current = true; // User has now interacted
    
    setNodes((nds) => {
      const newNodes = applyNodeChanges(changes, nds);
      return newNodes;
    });
    
    // Use setTimeout to ensure state has updated before checking
    setTimeout(checkForChanges, 0);
  }, [checkForChanges]);

  // ✅ Handle edge changes
  const onEdgesChange = useCallback((changes) => {
    userHasInteracted.current = true; // User has now interacted
    
    setEdges((eds) => {
      const newEdges = applyEdgeChanges(changes, eds);
      return newEdges;
    });
    
    // Use setTimeout to ensure state has updated before checking
    setTimeout(checkForChanges, 0);
  }, [checkForChanges]);

  // ✅ Handle new connections
  const onConnect = useCallback((connection) => {
    userHasInteracted.current = true; // User has now interacted
    
    setEdges((eds) => {
      const newEdges = addEdge(connection, eds);
      // Direct flag setting for connections since this is causing issues
      setTimeout(() => {
        if (userHasInteracted.current) {
          setChanges(true);
        }
      }, 50);
      return newEdges;
    });
  },[]);

  // ✅ Save changes to Redux and DB
  const handleSave =  () => {
    setSubmitting(true);
    const promise=new Promise(async (resolve,reject)=>{
      dispatch(updateNodes(nodes)); // ✅ Update Redux
      dispatch(updateEdges(edges)); // ✅ Update Redux
      try {
        const res=await updateTree(nodes,edges);
        console.log(res)
        setChanges(false); // Reset change tracker
        
        // Update original references after save
        originalNodesRef.current = JSON.stringify(nodes);
        originalEdgesRef.current = JSON.stringify(edges);
        
        resolve(res);
      } catch (error) {
        console.error("Failed to save changes:", error);
        alert("Error saving changes.");
        reject(error.response.data.message)
      }finally{
        setSubmitting(false);
      }
    })

    toast.promise(promise, {
      loading: "Saving...",
      success: "Saved Progress Successfully!",
      error: (err) => err || "Saving failed",
    });

  };

  return (
    <div className="h-screen text-black bg-black relative">
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          id: String(node.id)
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ custom: NodeComponent }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <TitleBar treeName={treeName} />
      <Tools/>

      {changes && (
        <div className="bg-[#00ff00] absolute min-w-max top-16 left-1/2 px-3 py-2 rounded-xl -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center gap-3">
          <h1 className="font-semibold text-md">Save the changes?</h1>
          <button 
            onClick={handleSave} 
            className="bg-black text-white px-2 py-1 rounded-sm text-sm cursor-pointer" disabled={isSubmitting}
          >
            {isSubmitting? "Saving...":"Save"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Flow;