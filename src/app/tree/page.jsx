"use client";

import AddNode from "@/components/local/AddNode";
import NodeComponent from "@/components/local/CustomNode";
import TitleBar from "@/components/local/TitleBar";
import { useSelector } from "react-redux";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";

function Flow() {
  // ✅ Fetch nodes and edges from Redux store at the top level
  const reduxNodes = useSelector((state) => state.nodes) || [];
  const reduxEdges = useSelector((state) => state.edges) || [];
  const treeName=useSelector(state=>state.treeName) || "";

  console.log("Redux Nodes:", reduxNodes);
  console.log("Redux Edges:", reduxEdges);

  // ✅ Initialize state as empty, will update via useEffect
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // ✅ Change handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // ✅ Update nodes & edges whenever Redux store updates
  useEffect(() => {
    console.log("Updating state from Redux...");
    setNodes(reduxNodes);
    setEdges(reduxEdges);
  }, [reduxNodes, reduxEdges]); // ✅ Dependencies ensure this runs when Redux store updates

  return (
    <div className="h-screen text-black bg-black relative">
      <ReactFlow
        nodes={nodes}
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
      <TitleBar treeName={treeName}/>
      <AddNode />
    </div>
  );
}

export default Flow;
