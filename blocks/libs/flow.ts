import dagre from 'dagre'
import { type Node } from 'reactflow'

import { type Definition, getDefinitionData } from './prisma'

export function getDefinitionNodes(definitions: Definition[]): Node[] {
  return definitions.map((definition) => ({
    data: getDefinitionData(definition),
    id: definition.name,
    position: { x: 0, y: 0 },
    type: definition.type,
  }))
}

export function getPositionedNodes(nodes: Node[]): Node[] {
  const graph = new dagre.graphlib.Graph()
  graph.setGraph({ rankdir: 'TB' })

  for (const node of nodes) {
    graph.setNode(node.id, { width: node.width, height: node.height })
  }

  dagre.layout(graph)

  return nodes.map((node) => {
    const positionedNode = graph.node(node.id)

    return {
      ...node,
      position: {
        x: positionedNode.x - (node.width ? node.width / 2 : 0),
        y: positionedNode.y - (node.height ? node.height / 2 : 0),
      },
    }
  })
}
