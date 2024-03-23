"use client"

import Link from 'next/link';
import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

type NodeData = {
  name: string;
  assigne: number;
  assigneName: string;
  endDate: Date;
};

const CustomNode = ({ id, data }: NodeProps<NodeData>) => {
  return (
    <>
      <Link href={`/task/${id}`}>
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
          <div className="flex">
            <div className="ml-2">
              <div className="text-lg font-bold">{data.name}</div>
              <div className="text-gray-500">{data.assigne}</div>
            </div>
          </div>
        </div>
      </Link>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </>
  );
};

export default memo(CustomNode);
