import { useEffect, useMemo } from 'react'
import { ReactFlow, useNodesInitialized, useNodesState, useReactFlow, useStoreApi } from 'reactflow'

import { getDefinitionsSchema, getPositionedSchema } from '../libs/flow'
import { type Definition } from '../libs/prisma'

import { Enum } from './Enum'
import { Model } from './Model'

const schemaNodeTypes = {
  enum: Enum,
  model: Model,
}

export function Schema({ definitions }: SchemaProps) {
  const schema = useMemo(() => getDefinitionsSchema(definitions), [definitions])

  const store = useStoreApi()
  const reactFlowInstance = useReactFlow()
  const nodesInitialized = useNodesInitialized()
  const [nodes, setNodes] = useNodesState(schema.nodes)

  useEffect(() => {
    if (nodesInitialized) {
      const { nodeInternals } = store.getState()

      setNodes(getPositionedSchema([...nodeInternals.values()]))

      // TODO(HiDeoo)
      reactFlowInstance.fitView({ padding: 10 })
    }
  }, [nodesInitialized, reactFlowInstance, setNodes, store])

  return <ReactFlow edges={schema.edges} nodes={nodes} nodeTypes={schemaNodeTypes} />
}

interface SchemaProps {
  definitions: Definition[]
}
