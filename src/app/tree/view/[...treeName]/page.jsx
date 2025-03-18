"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import {
    ReactFlow,
    Controls,
    Background,
  } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "@/components/local/CustomNode";
import {getTreeByName} from "@/api/tree"
import TitleBarView from "@/components/local/TitleBarView"

const ViewTree = () => {
    const params=useParams();
    const treeName=params.treeName;

    const [error, setError] = useState("");

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);


    useEffect(() => {
        const fetchTree=async()=>{
            try{
                const res=await getTreeByName(treeName);

                const tree=res?.data.data;
                console.log(tree)
                const updatedNodes = tree.nodes.map(node => ({
                    ...node,
                    data: { ...node.data, mode: "view" }
                }));
        
                const updatedEdges = tree.edges.map(edge => ({
                    ...edge,
                    updatable: false, 
                    interactionWidth: 0, 
                })) 

                console.log(updatedNodes)
                console.log(updatedEdges)

                setNodes(updatedNodes.map(node=>({...node,id:node._id.toString()})));
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
            <TitleBarView treeName={treeName}/>
        </div>
    );
};

export default ViewTree;
