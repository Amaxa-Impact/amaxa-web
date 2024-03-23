"use client"
import { useState, useEffect, useRef } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import DragIcon from './DragIcon';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export type NodeData = {
  name: string,
  assigne: number,
  assigneName: string,
  endDate: Date,
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const [label, setLabel] = useState(data.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 1);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${label.length * 8}px`;
    }
  }, [label]);

  const handleLabelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
    // Here you would update the label in the parent component or via another method
    // But since we're avoiding external state management, the logic is kept simple
  };

  return (
    <>

      <div className="flex h-5 z-10 relative pointer-events-none">
        <div className="bg-transparent w-3.5 h-full mr-1 flex items-center pointer-events-auto">
          <DragIcon />
        </div>
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          className="border-none p-[2px] rounded-sm font-bold bg-transparent h-full text-gray-800 pointer-events-none focus:border-none focus:outline-none focus:bg-white focus:bg-opacity-25 pointer-events-auto"
          ref={inputRef}
        />
        <div className="bg-transparent w-3.5 h-full ml-1 flex items-center pointer-events-auto">
          <Link href={`/task/${id}`}>
            <LinkIcon />
          </Link>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
