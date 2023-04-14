import ELK, { type ElkPort } from 'elkjs/lib/elk.bundled.js'
import { type Edge, type Node } from 'reactflow'

import { type Definition, getDefinitionData, type DefinitionData, type EnumData, type ModelData } from './prisma'

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

  const edges = [...getEnumEdges(nodesByIds), ...getModelEdges(nodesByIds)]

  return { edges, nodes: [...nodesByIds.values()] }
}

export async function getPositionedNodes(nodes: Node<DefinitionData>[], edges: Edge[]): Promise<Node[]> {
  const elk = new ELK()

  const layout = await elk.layout({
    children: nodes.map((node) => {
      const ports: ElkPort[] = [
        {
          id: node.id,
          layoutOptions: {
            'elk.port.side': 'SOUTH',
          },
        },
      ]

      if (isModelNode(node)) {
        for (const property of Object.values(node.data.properties)) {
          ports.push({
            id: `${node.data.name}-${property.name}`,
            layoutOptions: {
              'elk.port.side': 'EAST',
            },
          })
        }
      }

      return {
        height: node.height ?? 0,
        id: node.id,
        layoutOptions: {
          'elk.portConstraints': 'FIXED_SIDE',
        },
        ports,
        width: node.width ?? 0,
      }
    }),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.sourceHandle ?? edge.source],
      targets: [edge.targetHandle ?? edge.target],
    })),
    id: 'schema',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'RIGHT',
      'elk.layered.spacing.baseValue': '60',
    },
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
      const enumNode = enumNodes.find((enumNode) => enumNode.data.name === property.type.raw)

      if (!enumNode) {
        continue
      }

      nodesByIds.set(enumNode.id, {
        ...enumNode,
        data: {
          ...enumNode.data,
          isSource: true,
        },
      })

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
      })
    }
  }

  return edges
}

function getModelEdges(nodesByIds: NodesByIds) {
  const edges: Edge[] = []

  const modelNodes = [...nodesByIds.values()].filter(isModelNode)

  for (const node of nodesByIds.values()) {
    if (node.data.type === 'enum') {
      continue
    }

    for (const property of Object.values(node.data.properties)) {
      const sourceNodeId = modelNodes.find((node) => node.id === property.type.raw)?.id
      const sourceNode = nodesByIds.get(sourceNodeId ?? '')
      const currentNode = nodesByIds.get(node.id)

      if (!sourceNode || !currentNode || !isModelNode(currentNode)) {
        continue
      }

      nodesByIds.set(sourceNode.id, {
        ...sourceNode,
        data: {
          ...sourceNode.data,
          isSource: true,
        },
      })

      nodesByIds.set(node.id, {
        ...currentNode,
        data: {
          ...currentNode.data,
          properties: {
            ...currentNode.data.properties,
            [property.name]: {
              ...property,
              isTarget: true,
            },
          },
        },
      })

      edges.push({
        id: `edge-relation-${node.id}-${property.name}-${sourceNode.id}`,
        source: sourceNode.id,
        target: node.id,
        targetHandle: `${node.data.name}-${property.name}`,
      })
    }
  }

  return edges
}

function isEnumNode(node: Node): node is Node<EnumData> {
  return node.type === 'enum'
}

function isModelNode(node: Node): node is Node<ModelData> {
  return node.type === 'model'
}

type NodesByIds = Map<Node<DefinitionData>['id'], Node<DefinitionData>>
