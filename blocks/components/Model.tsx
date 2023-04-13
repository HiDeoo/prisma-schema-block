import { useCallback, useMemo } from 'react'
import { Handle, type NodeProps, Position } from 'reactflow'

import { type ModelPropertyData, type ModelData } from '../libs/prisma'

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
              <Handle id={`${data.name}-${property.name}`} position={Position.Left} type="target" />
            ) : null}
            {property.name}
          </td>
          <td>{property.type}</td>
        </tr>
      )
    },
    [data.name]
  )

  return <TableNode className="model" cols={2} rowRenderer={rowRenderer} rows={properties} name={data.name} />
}
