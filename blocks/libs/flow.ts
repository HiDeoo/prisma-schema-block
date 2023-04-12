import dagre from 'dagre'
import { type Edge, type Node } from 'reactflow'

import { type Definition, getDefinitionData, type DefinitionData } from './prisma'

export function getDefinitionsSchema(definitions: Definition[]) {
  const nodes = definitions.map((definition) => ({
    data: getDefinitionData(definition),
    id: definition.name,
    position: { x: 0, y: 0 },
    type: definition.type,
  }))

  return { edges: getEnumEdges(nodes), nodes }
}

// TODO(HiDeoo) handle edges
export function getPositionedSchema(nodes: Node[]): Node[] {
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

function getEnumEdges(nodes: Node<DefinitionData>[]) {
  const edges: Edge[] = []

  const enumNodes = nodes.filter((node) => node.type === 'enum')

  for (const node of nodes) {
    if (node.data.type === 'enum') {
      continue
    }

    for (const [name, type] of node.data.columns) {
      const enumNode = enumNodes.find((enumNode) => enumNode.data.name === type)

      if (enumNode) {
        edges.push({
          id: `edge-enum-${enumNode.data.name}-${node.data.name}-${name}`,
          source: enumNode.id,
          target: node.id,
          targetHandle: `${node.data.name}-${name}`,
        })
      }
    }
  }

  return edges
}
