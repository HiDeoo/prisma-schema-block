import { type NodeProps } from 'reactflow'

import { type EnumData } from '../libs/prisma'

export function Enum({ data }: NodeProps<EnumData>) {
  return <div>{JSON.stringify(data.values)}</div>
}
