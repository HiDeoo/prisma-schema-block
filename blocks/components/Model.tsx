import { type NodeProps } from 'reactflow'

import { type ModelData } from '../libs/prisma'

export function Model({ data }: NodeProps<ModelData>) {
  return <div>{JSON.stringify(data.values)}</div>
}
