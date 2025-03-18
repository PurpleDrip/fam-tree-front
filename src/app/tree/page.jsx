"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import NodeComponent from "@/components/local/CustomNode";
import TitleBar from "@/components/local/TitleBar";
import { fetchTree } from "@/api/tree";
import Tools from "@/components/local/Tools"
import {debouncedUpdateCache} from "@/api/redis";


function Flow() {
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [treeName, setTreeName] = useState("");
  const [treeId, setTreeId] = useState("");

  const nodeTypes = useMemo(() => ({ custom: NodeComponent }), []);
  const changesMade=useSelector(state=>state.value);

  useEffect(() => {
    const getTree = async () => {
      try {
        const res = await fetchTree();
        console.log(res)
        if (res.data?.tree) {
          setNodes(
            res.data.tree.nodes.map((node) => ({
              ...node,
              id: node._id,
            }))
          );

          setEdges(res.data.tree.edges);
          setTreeName(res.data.tree.treeName);
          setTreeId((prevId) => res.data.tree.treeId);

          console.log("JSON",res.data.tree.treeId);
        } else {
          toast.error("Failed to load tree data");
        }
      } catch (error) {
        console.error("Error fetching tree:", error);
        toast.error("Error loading tree");
      } finally {
        setLoading(false);
      }
    };
    getTree();
  }, [changesMade]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []); 
  
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      debouncedUpdateCache(nodes, updatedEdges, treeName, treeId); 
      return updatedEdges;
    });
  }, [nodes, treeName, treeId]);
  
  const onConnect = useCallback((connection) => {
    setEdges((eds) => {
      const updatedEdges = addEdge(connection, eds);
      debouncedUpdateCache(nodes, updatedEdges, treeName, treeId);
      return updatedEdges;
    });
  }, [nodes, treeName, treeId]);
  
  const onNodeDragStop = useCallback((event, node) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      );
      debouncedUpdateCache(updatedNodes, edges, treeName, treeId);
      return updatedNodes;
    });
  }, [edges, treeName, treeId]);
  
  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    setEdges((eds) => {
      const updatedEdges = eds.filter((e) => e.id !== edge.id);
      debouncedUpdateCache(nodes, updatedEdges, treeName, treeId);
      return updatedEdges;
    });
    toast.success("Edge deleted successfully");
  }, [nodes, treeName, treeId]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      debouncedUpdateCache.flush(); 
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [nodes, edges, treeName, treeId]); 

  if (loading) return <div className="h-screen flex items-center justify-center">Loading tree data...</div>;

  return (
    <div className="h-screen text-black bg-black relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onEdgeContextMenu={onEdgeContextMenu}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <TitleBar treeName={treeName} />
      <Tools />
    </div>
  );
}

export default Flow;
