import { useEffect, useMemo } from 'react'
import { ReactFlow, useNodesInitialized, useNodesState, useStoreApi } from 'reactflow'

import { getDefinitionNodes, getPositionedNodes } from '../libs/flow'
import { type Definition } from '../libs/prisma'

export function Schema({ definitions }: SchemaProps) {
  const rawNodes = useMemo(() => getDefinitionNodes(definitions), [definitions])

  const store = useStoreApi()
  const nodesInitialized = useNodesInitialized()
  const [nodes, setNodes] = useNodesState(rawNodes)

  useEffect(() => {
    if (nodesInitialized) {
      const { nodeInternals } = store.getState()

      setNodes(getPositionedNodes([...nodeInternals.values()]))
    }
  }, [nodesInitialized, setNodes, store])

  return <ReactFlow nodes={nodes} edges={[]} />
}

interface SchemaProps {
  definitions: Definition[]
}
