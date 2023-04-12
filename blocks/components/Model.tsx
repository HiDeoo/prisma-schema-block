import { type NodeProps } from 'reactflow'

import { type ModelData } from '../libs/prisma'

import { DefinitionTable } from './DefinitionTable'

// TODO(HiDeoo) nis no rows?
export function Model({ data }: NodeProps<ModelData>) {
  return <DefinitionTable rows={data.columns} name={data.name} type="model" />
}
