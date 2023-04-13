import { Handle, type NodeProps, Position } from 'reactflow'

import { type EnumData } from '../libs/prisma'

import { TableNode } from './TableNode'

// TODO(HiDeoo) nis no values
export function Enum({ data }: NodeProps<EnumData>) {
  return (
    <>
      <TableNode className="enum" columnCount={1} name={data.name} rowRenderer={rowRenderer} rows={data.values} />
      {data.isSource ? <Handle position={Position.Bottom} type="source" /> : null}
    </>
  )
}

function rowRenderer(value: EnumData['values'][number]) {
  return (
    <tr key={value}>
      <td>{value}</td>
    </tr>
  )
}
