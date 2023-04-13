import { useMemo } from 'react'
import { Handle, type NodeProps, Position } from 'reactflow'

import { type EnumData } from '../libs/prisma'

import { DefinitionTable } from './DefinitionTable'

// TODO(HiDeoo) nis no values
export function Enum({ data }: NodeProps<EnumData>) {
  const content = useMemo(() => {
    return data.values.map((value) => [value])
  }, [data.values])

  return (
    <>
      <DefinitionTable rows={content} name={data.name} type="enum" />
      {data.isSource ? <Handle position={Position.Bottom} type="source" /> : null}
    </>
  )
}
