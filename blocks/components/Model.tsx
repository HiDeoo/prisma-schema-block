import { useCallback, useMemo } from 'react'
import { type NodeProps } from 'reactflow'

import { type ModelPropertyData, type ModelData } from '../libs/prisma'

import { Handle, Position } from './Handle'
import { TableNode } from './TableNode'

export function Model({ data }: NodeProps<ModelData>) {
  const properties = useMemo(() => Object.values(data.properties), [data.properties])

  const rowRenderer = useCallback(
    (property: ModelPropertyData) => {
      return (
        <tr key={property.name}>
          <td>{property.name}</td>
          <td>{property.type.computed}</td>
          <td>
            {property.defaultValue}
            {property.isTarget ? (
              <Handle
                id={`${data.name}-${property.name}`}
                isConnectable={false}
                position={Position.Right}
                type="target"
              />
            ) : null}
          </td>
        </tr>
      )
    },
    [data.name]
  )

  return (
    <TableNode
      color={data.color}
      cols={3}
      isSource={data.isSource}
      name={data.name}
      rowRenderer={rowRenderer}
      rows={properties}
    />
  )
}
