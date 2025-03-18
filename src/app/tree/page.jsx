"use client";

import NodeComponent from "@/components/local/CustomNode";
import TitleBar from "@/components/local/TitleBar";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import {fetchTree} from "@/api/tree"
import Tools from "@/components/local/Tools"
import { toast } from "sonner";

function Flow() {
  const [loading, setLoading] = useState(true);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [treeName, setTreeName] = useState("");

  useEffect(()=>{
    const getTree=async()=>{
      const res=await fetchTree();
      console.log(res)
      setNodes(res.data.tree.nodes.map(node=>({...node,id:node._id})));
      setEdges(res.data.tree.edges);
      setTreeName(res.data.tree.treeName)
      setLoading(false)
    }
    getTree();
  },[])

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => {
      const newNodes = applyNodeChanges(changes, nds);
      return newNodes;
    });
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => {
      const newEdges = applyEdgeChanges(changes, eds);
      return newEdges;
    });
  }, []);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => {
      const newEdges = addEdge(connection, eds);
      return newEdges;
    });
  },[]);
  const onNodeDragStop = useCallback((event, node) => {
    setNodes((nds) => {
      console.log("Hi")
      return nds.map((n) => {
        if (n.id === node.id) {
          return { ...n, position: node.position };
        }
        return n;
      });
    });
    
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen text-black bg-black relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={{ custom: NodeComponent }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <TitleBar treeName={treeName} />
      <Tools/>
    </div>
  );
}

export default Flow;