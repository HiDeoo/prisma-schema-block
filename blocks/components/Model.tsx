import { useCallback, useMemo } from 'react'
import { type NodeProps } from 'reactflow'

import { type ModelPropertyData, type ModelData } from '../libs/prisma'

import { Handle, Position } from './Handle'
import { TableNode } from './TableNode'

// TODO(HiDeoo) nis no rows?
export function Model({ data }: NodeProps<ModelData>) {
  const properties = useMemo(() => Object.values(data.properties), [data.properties])

  const rowRenderer = useCallback(
    (property: ModelPropertyData) => {
      return (
        <tr key={property.name}>
          <td>
            {property.isTarget ? (
              <Handle
                id={`${data.name}-${property.name}`}
                isConnectable={false}
                position={Position.Left}
                type="target"
              />
            ) : null}
            {property.name}
          </td>
          <td>{property.type.computed}</td>
          <td>{property.defaultValue}</td>
        </tr>
      )
    },
    [data.name]
  )

  return (
    <TableNode
      className="model"
      cols={3}
      isSource={data.isSource}
      name={data.name}
      rowRenderer={rowRenderer}
      rows={properties}
    />
  )
}
