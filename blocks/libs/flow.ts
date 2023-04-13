import ELK from 'elkjs/lib/elk.bundled.js'
import { type Edge, type Node } from 'reactflow'

import { type Definition, getDefinitionData, type DefinitionData, type EnumData } from './prisma'

export function getDefinitionsSchema(definitions: Definition[]) {
  const nodesByIds: NodesByIds = new Map()

  for (const definition of definitions) {
    nodesByIds.set(definition.name, {
      data: getDefinitionData(definition),
      id: definition.name,
      position: { x: 0, y: 0 },
      type: definition.type,
    })
  }

  const edges = getEnumEdges(nodesByIds)

  return { edges, nodes: [...nodesByIds.values()] }
}

export async function getPositionedNodes(nodes: Node[], edges: Edge[]): Promise<Node[]> {
  const elk = new ELK()

  const layout = await elk.layout({
    children: nodes.map((node) => ({
      height: node.height ?? 0,
      id: node.id,
      width: node.width ?? 0,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
    id: 'schema',
    layoutOptions: { 'elk.algorithm': 'layered' },
  })

  return nodes.map((node) => {
    const positionedNode = layout.children?.find((positionedNode) => positionedNode.id === node.id)

    if (!positionedNode) {
      return node
    }

    return {
      ...node,
      height: positionedNode.height ?? node.height ?? 0,
      position: {
        x: positionedNode.x ?? 0,
        y: positionedNode.y ?? 0,
      },
      width: positionedNode.width ?? node.width ?? 0,
    }
  })
}

function getEnumEdges(nodesByIds: NodesByIds) {
  const edges: Edge[] = []

  const enumNodes = [...nodesByIds.values()].filter(isEnumNode)

  for (const node of nodesByIds.values()) {
    if (node.data.type === 'enum') {
      continue
    }

    for (const property of Object.values(node.data.properties)) {
      const enumNode = enumNodes.find((enumNode) => enumNode.data.name === property.type)

      if (enumNode) {
        nodesByIds.set(enumNode.id, { ...enumNode, data: { ...enumNode.data, isSource: true } })
        nodesByIds.set(node.id, {
          ...node,
          data: {
            ...node.data,
            properties: {
              ...node.data.properties,
              [property.name]: {
                ...property,
                isTarget: true,
              },
            },
          },
        })

        edges.push({
          id: `edge-enum-${enumNode.data.name}-${node.data.name}-${property.name}`,
          source: enumNode.id,
          target: node.id,
          targetHandle: `${node.data.name}-${property.name}`,
          type: 'smoothstep',
        })
      }
    }
  }

  return edges
}

function isEnumNode(node: Node): node is Node<EnumData> {
  return node.type === 'enum'
}

type NodesByIds = Map<string, Node<DefinitionData>>
