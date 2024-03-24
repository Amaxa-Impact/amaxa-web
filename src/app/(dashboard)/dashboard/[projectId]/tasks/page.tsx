import { api } from "@/trpc/server"
import Flow from "./flow"
import { Node } from "reactflow"

type NodeType = Node<{
  name: string,
  assigne: string,
  assigneName: string,
  endDate: Date,
}>


export default async function Page({
  params
}: {
  params: {
    projectId: string
  }
}) {
  const projectId = parseInt(params.projectId, 10)

  const {
    nodes,
    edges
  } = await api.tasks.byProjectId.query({
    id: projectId
  })

  if (nodes.length === 0 && edges.length === 0) {

    const initNodes: NodeType[] = [
      {
        id: '1',
        type: 'custom',
        data: { name: 'Task 1', assigne: "", endDate: new Date(), assigneName: "John Doe" },
        position: { x: 0, y: 50 },
      },
      {
        id: '2',
        type: 'custom',
        data: { name: 'Task 2', assigne: "", endDate: new Date(), assigneName: "John Doe" },
        position: { x: -200, y: 200 },
      },
      {
        id: '3',
        type: 'custom',
        data: { name: 'Task 3', assigne: "", endDate: new Date(), assigneName: "John Doe" },
        position: { x: 200, y: 200 },
      },
    ];

    const initEdges = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
      },
      {
        id: 'e1-3',
        source: '1',
        target: '3',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col">
        <Flow initNodes={initNodes} initEdges={initEdges} projectId={projectId} />
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Flow initNodes={nodes} initEdges={edges} projectId={projectId} />
    </div>
  )

}
