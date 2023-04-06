import dagre from 'dagre'
import { type Node } from 'reactflow'

import { type Definition } from './prisma'

export function getDefinitionNodes(definitions: Definition[]): Node[] {
  return definitions.map((definition) => ({
    id: definition.name,
    data: { label: definition.name },
    position: { x: 0, y: 0 },
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

    node.position = {
      x: positionedNode.x - (node.width ? node.width / 2 : 0),
      y: positionedNode.y - (node.height ? node.height / 2 : 0),
    }

    return node
  })
}
