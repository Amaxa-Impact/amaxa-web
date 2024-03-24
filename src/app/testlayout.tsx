"use client"
import React from "react"
import ReactFlow, { ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

export function Flow(props: any) {
  // you can access the internal state here
  const reactFlowInstance = useReactFlow();

  return <ReactFlow {...props} />;
}

// wrapping with ReactFlowProvider is done outside of the component
function FlowProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactFlowProvider>
      {children}
    </ReactFlowProvider>
  );
}

export default FlowProvider;

