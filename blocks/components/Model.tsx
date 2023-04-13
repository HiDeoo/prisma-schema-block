import { useCallback, useMemo } from 'react'
import { Handle, type NodeProps, Position } from 'reactflow'

import { type ModelColumnData, type ModelData } from '../libs/prisma'

import { TableNode } from './TableNode'

// TODO(HiDeoo) nis no rows?
export function Model({ data }: NodeProps<ModelData>) {
  const columns = useMemo(() => {
    return Object.values(data.columns)
  }, [data.columns])

  const rowRenderer = useCallback(
    (column: ModelColumnData) => {
      return (
        <tr key={column.name}>
          <td>
            {column.isTarget ? (
              <Handle id={`${data.name}-${column.name}`} position={Position.Left} type="target" />
            ) : null}
            {column.name}
          </td>
          <td>{column.type}</td>
        </tr>
      )
    },
    [data.name]
  )

  return <TableNode className="model" columnCount={2} rowRenderer={rowRenderer} rows={columns} name={data.name} />
}
