import { useMemo } from 'react'
import { type NodeProps } from 'reactflow'

import { type ModelData } from '../libs/prisma'

import { DefinitionTable } from './DefinitionTable'

// TODO(HiDeoo) nis no rows?
export function Model({ data }: NodeProps<ModelData>) {
  // TODO(HiDeoo) types
  const content = useMemo(() => {
    return data.values.map((value) => [value])
  }, [data.values])

  return <DefinitionTable content={content} name={data.name} type="model" />
}
