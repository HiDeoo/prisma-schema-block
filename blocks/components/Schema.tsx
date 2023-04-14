import { useEffect, useMemo } from 'react'
import { ReactFlow, useNodesInitialized, useNodesState, useReactFlow, useStoreApi } from 'reactflow'

import { getDefinitionsSchema, getPositionedNodes } from '../libs/flow'
import { type Definition } from '../libs/prisma'

import { Enum } from './Enum'
import { Model } from './Model'
import styles from './Schema.module.css'

const schemaNodeTypes = {
  enum: Enum,
  model: Model,
}

const defaultEdgeOptions = {
  animated: true,
  pathOptions: {
    curvature: 0.3,
  },
}

export function Schema({ definitions }: SchemaProps) {
  const schema = useMemo(() => getDefinitionsSchema(definitions), [definitions])

  const store = useStoreApi()
  const reactFlowInstance = useReactFlow()
  const nodesInitialized = useNodesInitialized()
  const [nodes, setNodes] = useNodesState(schema.nodes)

  useEffect(() => {
    async function positionNodes() {
      const { nodeInternals } = store.getState()

      setNodes(await getPositionedNodes([...nodeInternals.values()], schema.edges))

      // TODO(HiDeoo)
      reactFlowInstance.fitView({ padding: 10 })
    }

    if (nodesInitialized) {
      positionNodes()
    }
  }, [nodesInitialized, reactFlowInstance, schema.edges, setNodes, store])

  return (
    <ReactFlow
      className={styles.schema}
      defaultEdgeOptions={defaultEdgeOptions}
      edges={schema.edges}
      nodes={nodes}
      nodesConnectable={false}
      nodeTypes={schemaNodeTypes}
    />
  )
}

interface SchemaProps {
  definitions: Definition[]
}
