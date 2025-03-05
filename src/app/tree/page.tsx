"use client"

import Node from '@/components/local/Node';
import { UserState } from '@/redux/userSlice';
import INode from '@/types/node';
import { ReactFlow, Controls, Background , applyNodeChanges,applyEdgeChanges,addEdge} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
 


function Flow() {
  const nodeTypes = {
    custom: Node, 
  };

  const initialNodes = useSelector((state:UserState) => state.nodes);
  const initialEdges = useSelector((state:UserState) => state.edges);

  const [nodes, setNodes] = useState<INode[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes :any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  return (
    <div className='h-screen text-black bg-black'>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
 
export default Flow;