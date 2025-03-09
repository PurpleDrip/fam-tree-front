"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import {
    ReactFlow,
    Controls,
    Background,
  } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSelector } from 'react-redux';
import NodeComponent from "@/components/local/CustomNode";
import {formatNodes} from "@/lib/formatNode"
import {getTreeByName} from "@/api/tree"

const ViewTree = () => {
    const params=useParams();
    const treeName=params.treeName;

    const [error, setError] = useState("");

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const storeNodes = useSelector(state => state.nodes);
    const storeEdges = useSelector(state => state.edges);

    useEffect(() => {
        const fetchTree=async()=>{
            try{
                const res=await getTreeByName(treeName);
                const tree=res?.data.data;

                const formatedNodes=formatNodes(tree.nodes)

                const updatedNodes = formatedNodes.map(node => ({
                    ...node,
                    data: { ...node.data, mode: "view" }
                }));
        
                // ✅ Disable edge dragging
                const updatedEdges = tree.edges.map(edge => ({
                    ...edge,
                    updatable: false, 
                    interactionWidth: 0, 
                }))

                setNodes(updatedNodes);
                setEdges(updatedEdges);

            }catch(err){
                console.log(err)
                setError(err?.response?.data.message);
            }
        }

        fetchTree();
    }, [treeName]);

    useEffect(() => {
        console.log(nodes);
        console.log(edges);
    }, [nodes, edges]);
    

    return (
        error ? 
        (<h1>{error}</h1>) :
        <div className='h-screen bg-black text-black'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={{ custom: NodeComponent }}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default ViewTree;
