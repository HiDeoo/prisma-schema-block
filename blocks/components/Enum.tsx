import { useMemo } from 'react'
import { type NodeProps } from 'reactflow'

import { type EnumData } from '../libs/prisma'

import { DefinitionTable } from './DefinitionTable'

// TODO(HiDeoo) nis no values
export function Enum({ data }: NodeProps<EnumData>) {
  const content = useMemo(() => {
    return data.values.map((value) => [value])
  }, [data.values])

  return <DefinitionTable content={content} name={data.name} type="enum" />
}
