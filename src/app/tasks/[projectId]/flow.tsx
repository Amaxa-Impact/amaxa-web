"use client"

import React, { useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, useReactFlow, Node, addEdge, MiniMap, Controls, OnConnectStart, OnConnectEnd } from 'reactflow';
import { nanoid } from 'nanoid';

import 'reactflow/dist/base.css';

import CustomNode from './CustomNode';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { handleError } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NodeType = Node<{
  name: string,
  assigne: number,
  assigneName: string,
  endDate: Date,
}>

const nodeTypes = {
  custom: CustomNode,
};

//TODO: Breaks at scale
const Flow = ({
  initNodes,
  initEdges,
  projectId
}: {
  initNodes: NodeType[],
  initEdges: {
    id: string,
    source: string,
    target: string
  }[],
  projectId: number
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { project } = useReactFlow();
  const connectingNodeId = useRef<string | null>(null);

  const { mutate: save } = api.tasks.createTask.useMutation({
    onSuccess() {
      toast.success("Saved Succesfuly")
    },
    onError(error) {
      handleError(error)
    },

  })
  const onSubmit = () => {
    const formattedNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type!,
      parentId: node.parentNode,
      position: {
        x: node.position.x,
        y: node.position.y,
      },
      data: {
        name: node.data.name,
        assigne: node.data.assigne,
        assigneName: node.data.assigneName,
        endDate: new Date(node.data.endDate),
      },
      projectId: projectId, // Replace with the actual project ID
    }));

    const formatedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      projectId: projectId
    }))

    save({
      tasks: formattedNodes,
      edges: formatedEdges
    });
  };

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const getChildNodePosition = (event: any, parentNode: any) => {
    if (!parentNode?.positionAbsolute || !parentNode?.width || !parentNode?.height) {
      return;
    }

    const panePosition = project({
      x: event.clientX,
      y: event.clientY,
    });

    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
    };
  };

  const onConnectEnd: OnConnectEnd = useCallback((event) => {
    const targetIsPane = (event.target as Element).classList.contains(
      'react-flow__pane',
    );

    if (targetIsPane && connectingNodeId.current) {
      const parentNode = nodes.find((node) => node.id === connectingNodeId.current);
      const childNodePosition = getChildNodePosition(event, parentNode);

      if (parentNode && childNodePosition) {
        addChildNode(parentNode, childNodePosition);
      }
    }
  }, [nodes]);

  const addChildNode = (parentNode: any, position: any) => {
    const newNode = {
      id: nanoid(),
      type: 'custom',
      data: { name: 'New Task', assigne: 0, endDate: new Date(), assigneName: "" },
      position,
      parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    setNodes((nodes) => [...nodes, newNode]);
    setEdges((edges) => [...edges, newEdge]);
  };


  return (
      <div className="w-full h-full flex flex-col">
      <Button onClick={onSubmit}>
        Save
      </Button>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeTypes={nodeTypes}
      fitView
      className="bg-background"
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
    </div>
  );
};

export default Flow;
