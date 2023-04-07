import { useEffect, useMemo } from 'react'
import { ReactFlow, useNodesInitialized, useNodesState, useReactFlow, useStoreApi } from 'reactflow'

import { getDefinitionNodes, getPositionedNodes } from '../libs/flow'
import { type Definition } from '../libs/prisma'

import { Enum } from './Enum'
import { Model } from './Model'

const schemaNodeTypes = {
  enum: Enum,
  model: Model,
}

export function Schema({ definitions }: SchemaProps) {
  const rawNodes = useMemo(() => getDefinitionNodes(definitions), [definitions])

  const store = useStoreApi()
  const reactFlowInstance = useReactFlow()
  const nodesInitialized = useNodesInitialized()
  const [nodes, setNodes] = useNodesState(rawNodes)

  useEffect(() => {
    if (nodesInitialized) {
      const { nodeInternals } = store.getState()

      setNodes(getPositionedNodes([...nodeInternals.values()]))

      // TODO(HiDeoo)
      reactFlowInstance.fitView({ padding: 10 })
    }
  }, [nodesInitialized, reactFlowInstance, setNodes, store])

  return <ReactFlow edges={[]} nodes={nodes} nodeTypes={schemaNodeTypes} />
}

interface SchemaProps {
  definitions: Definition[]
}
