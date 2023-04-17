import { type NodeProps } from 'reactflow'

import { type EnumData } from '../libs/prisma'

import { TableNode } from './TableNode'

export function Enum({ data }: NodeProps<EnumData>) {
  return (
    <TableNode
      color={data.color}
      cols={1}
      isSource={data.isSource}
      name={data.name}
      rowRenderer={rowRenderer}
      rows={data.values}
    />
  )
}

function rowRenderer(value: EnumData['values'][number]) {
  return (
    <tr key={value}>
      <td>{value}</td>
    </tr>
  )
}
